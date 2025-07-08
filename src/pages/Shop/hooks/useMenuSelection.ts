import { useState } from 'react';
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

export function useMenuSelection(shopId: string, menuInfo: ShopMenuDetailResponse) {
  const [state, setState] = useState<MenuSelectionState>({
    priceId: menuInfo.prices[0].id,
    count: 1,
    selectedOptions: [],
  });
  const { showToast } = useToast();

  const selectPrice = (priceId: number) => {
    setState((prev) => ({ ...prev, priceId }));
  };

  const selectOption = (optionGroupId: number, optionId: number, isSingle: boolean, maxSelect: number) => {
    setState((prev) => {
      const groupSelected = prev.selectedOptions.filter((opt) => opt.optionGroupId === optionGroupId);
      const already = groupSelected.some((opt) => opt.optionId === optionId);

      if (!isSingle && !already && groupSelected.length >= maxSelect) {
        showToast(`최대 ${maxSelect}개까지 선택할 수 있습니다.`);
        return prev;
      }

      let newOptions;
      if (isSingle) {
        newOptions = [{ optionGroupId, optionId }];
      } else {
        newOptions = prev.selectedOptions.filter(
          (opt) => opt.optionGroupId !== optionGroupId || opt.optionId !== optionId,
        );
        if (!already) {
          newOptions = [...prev.selectedOptions, { optionGroupId, optionId }];
        }
      }
      return { ...prev, selectedOptions: newOptions };
    });
  };

  const increaseCount = () => setState((prev) => ({ ...prev, count: prev.count + 1 }));
  const decreaseCount = () => setState((prev) => ({ ...prev, count: Math.max(0, prev.count - 1) }));

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
  };
}
