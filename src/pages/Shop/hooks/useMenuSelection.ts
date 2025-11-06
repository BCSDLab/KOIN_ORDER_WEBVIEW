import { useEffect, useReducer } from 'react';
import type { AddCartRequest, UpdateCartItemRequest } from '@/api/cart/entity';
import type { ShopMenuDetailResponse } from '@/api/shop/entity';
import { useToast } from '@/util/hooks/useToast';

export interface SelectedOption {
  optionGroupId: number;
  optionId: number;
}

export interface MenuSelectionState {
  priceId: number;
  count: number;
  selectedOptions: SelectedOption[];
}

type Action =
  | { type: 'INIT'; payload: { menuInfo: ShopMenuDetailResponse; isEdit: boolean } }
  | { type: 'SELECT_PRICE'; priceId: number }
  | { type: 'SELECT_OPTION'; optionGroupId: number; optionId: number; isSingle: boolean }
  | { type: 'INCREASE' }
  | { type: 'DECREASE' };

function reducer(state: MenuSelectionState | null, action: Action): MenuSelectionState | null {
  switch (action.type) {
    case 'INIT': {
      const { menuInfo, isEdit } = action.payload;

      const initialPriceId = isEdit
        ? (menuInfo.prices.find((p) => p.is_selected)?.id ?? menuInfo.prices[0].id)
        : menuInfo.prices[0].id;

      const initialCount = isEdit ? menuInfo.quantity : 1;

      const initialSelectedOptions: SelectedOption[] = isEdit
        ? menuInfo.option_groups.flatMap((group) =>
            group.options
              .filter((opt) => opt.is_selected)
              .map((opt) => ({
                optionGroupId: group.id,
                optionId: opt.id,
              })),
          )
        : [];

      return {
        priceId: initialPriceId,
        count: initialCount,
        selectedOptions: initialSelectedOptions,
      };
    }

    case 'SELECT_PRICE':
      return state ? { ...state, priceId: action.priceId } : state;

    case 'SELECT_OPTION': {
      if (!state) return state;

      const { optionGroupId, optionId, isSingle } = action;

      let newOptions: SelectedOption[];
      if (isSingle) {
        const other = state.selectedOptions.filter((opt) => opt.optionGroupId !== optionGroupId);
        newOptions = [...other, { optionGroupId, optionId }];
      } else {
        const isDeselecting = state.selectedOptions.some(
          (opt) => opt.optionGroupId === optionGroupId && opt.optionId === optionId,
        );
        newOptions = isDeselecting
          ? state.selectedOptions.filter((opt) => !(opt.optionGroupId === optionGroupId && opt.optionId === optionId))
          : [...state.selectedOptions, { optionGroupId, optionId }];
      }

      return { ...state, selectedOptions: newOptions };
    }

    case 'INCREASE':
      return state ? { ...state, count: state.count + 1 } : state;

    case 'DECREASE':
      return state ? { ...state, count: Math.max(1, state.count - 1) } : state;

    default:
      return state;
  }
}

export function useMenuSelection(shopId: string, menuInfo: ShopMenuDetailResponse | undefined, isEdit: boolean) {
  const { showToast } = useToast();
  const [state, dispatch] = useReducer(reducer, null as MenuSelectionState | null);

  useEffect(() => {
    if (!menuInfo) return;
    dispatch({ type: 'INIT', payload: { menuInfo, isEdit } });
  }, [shopId, menuInfo, isEdit]);

  const selectPrice = (priceId: number) => dispatch({ type: 'SELECT_PRICE', priceId });

  const selectOption = (optionGroupId: number, optionId: number, isSingle: boolean, maxSelect: number) => {
    if (!state) return;

    if (!isSingle) {
      const groupSelected = state.selectedOptions.filter((opt) => opt.optionGroupId === optionGroupId);
      const already = groupSelected.some((opt) => opt.optionId === optionId);
      if (!already && groupSelected.length >= maxSelect) {
        showToast(`최대 ${maxSelect}개까지 선택할 수 있습니다.`);
        return;
      }
    }

    dispatch({ type: 'SELECT_OPTION', optionGroupId, optionId, isSingle });
  };

  const increaseCount = () => dispatch({ type: 'INCREASE' });
  const decreaseCount = () => dispatch({ type: 'DECREASE' });

  if (!menuInfo || !state) {
    return {
      priceId: 0,
      count: 1,
      selectedOptions: [],
      selectPrice: () => {},
      selectOption: () => {},
      increaseCount: () => {},
      decreaseCount: () => {},
      totalPrice: 0,
      selectedPriceObj: undefined as ShopMenuDetailResponse['prices'][number] | undefined,
      isAllRequiredOptionsSelected: false,
      addToCartRequest: null as AddCartRequest | null,
      updateCartItemOptionsRequest: null as UpdateCartItemRequest | null,
    };
  }

  const selectedPriceObj = menuInfo.prices.find((p) => p.id === state.priceId);
  const selectedPrice = selectedPriceObj?.price ?? 0;

  const optionTotal = state.selectedOptions
    .map((sel) => {
      const group = menuInfo.option_groups.find((g) => g.id === sel.optionGroupId);
      const option = group?.options.find((o) => o.id === sel.optionId);
      return option?.price ?? 0;
    })
    .reduce((sum, price) => sum + price, 0);

  const totalPrice = (selectedPrice + optionTotal) * state.count;

  const isAllRequiredOptionsSelected = menuInfo.option_groups
    .filter((group) => group.min_select > 0)
    .every((group) => {
      const selectedCount = state.selectedOptions.filter((opt) => opt.optionGroupId === group.id).length;
      return selectedCount >= group.min_select;
    });

  const orderable_shop_menu_option_ids = state.selectedOptions.map((sel) => ({
    option_group_id: sel.optionGroupId,
    option_id: sel.optionId,
  }));

  const addToCartRequest: AddCartRequest = {
    menuInfo: {
      orderable_shop_id: Number(shopId),
      orderable_shop_menu_id: menuInfo.id,
      orderable_shop_menu_price_id: state.priceId,
      orderable_shop_menu_option_ids,
      quantity: state.count,
    },
  };

  const updateCartItemOptionsRequest = {
    orderable_shop_menu_price_id: state.priceId,
    quantity: state.count,
    options: state.selectedOptions.map((sel) => ({
      option_group_id: sel.optionGroupId,
      option_id: sel.optionId,
    })),
  };

  return {
    ...state,
    selectPrice,
    selectOption,
    increaseCount,
    decreaseCount,
    totalPrice,
    selectedPriceObj,
    isAllRequiredOptionsSelected,
    addToCartRequest,
    updateCartItemOptionsRequest,
  };
}
