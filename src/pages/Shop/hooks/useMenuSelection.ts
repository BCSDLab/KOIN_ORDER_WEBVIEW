import { useEffect, useState } from 'react';
import { ShopMenuDetailResponse } from '@/api/shop/entity';
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

export function useMenuSelection(shopId: string, menuInfo: ShopMenuDetailResponse | undefined, isEdit: boolean) {
  const { showToast } = useToast();

  const [state, setState] = useState<MenuSelectionState | null>(null);

  useEffect(() => {
    if (!menuInfo) return;

    const initialPriceId = isEdit
      ? (menuInfo.prices.find((p) => p.is_selected)?.id ?? menuInfo.prices[0].id)
      : menuInfo.prices[0].id;

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

    setState({
      priceId: initialPriceId,
      count: 1,
      selectedOptions: initialSelectedOptions,
    });
  }, [shopId, menuInfo, isEdit]);

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
      selectedPriceObj: undefined,
      isAllRequiredOptionsSelected: false,
      addToCartRequest: {},
      updateCartItemOptionsRequest: {},
    };
  }

  const selectPrice = (priceId: number) => setState((prev) => prev && { ...prev, priceId });
  const selectOption = (optionGroupId: number, optionId: number, isSingle: boolean, maxSelect: number) => {
    setState((prev) => {
      if (!prev) return prev;
      const groupSelected = prev.selectedOptions.filter((opt) => opt.optionGroupId === optionGroupId);
      const already = groupSelected.some((opt) => opt.optionId === optionId);

      if (!isSingle && !already && groupSelected.length >= maxSelect) {
        showToast(`최대 ${maxSelect}개까지 선택할 수 있습니다.`);
        return prev;
      }

      let newOptions;
      if (isSingle) {
        const otherGroupOptions = prev.selectedOptions.filter((opt) => opt.optionGroupId !== optionGroupId);
        newOptions = [...otherGroupOptions, { optionGroupId, optionId }];
      } else {
        const isDeselecting = prev.selectedOptions.some(
          (opt) => opt.optionGroupId === optionGroupId && opt.optionId === optionId,
        );

        if (isDeselecting) {
          newOptions = prev.selectedOptions.filter(
            (opt) => !(opt.optionGroupId === optionGroupId && opt.optionId === optionId),
          );
        } else {
          newOptions = [...prev.selectedOptions, { optionGroupId, optionId }];
        }
      }
      return { ...prev, selectedOptions: newOptions };
    });
  };
  const increaseCount = () => setState((prev) => prev && { ...prev, count: prev.count + 1 });
  const decreaseCount = () => setState((prev) => prev && { ...prev, count: Math.max(0, prev.count - 1) });

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

  const addToCartRequest = {
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
