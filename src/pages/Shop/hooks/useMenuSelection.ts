import { useState } from 'react';
import { ShopMenuDetailResponse } from '@/api/shop/entity';

export interface SelectedOption {
  optionGroupId: number;
  optionId: number;
}

export interface MenuSelectionState {
  priceId: number;
  count: number;
  selectedOptions: SelectedOption[];
}

export function useMenuSelection(menuInfo: ShopMenuDetailResponse) {
  const [state, setState] = useState<MenuSelectionState>({
    priceId: menuInfo.prices[0]?.id ?? 0,
    count: 1,
    selectedOptions: [],
  });

  const selectPrice = (priceId: number) => {
    setState((prev) => ({ ...prev, priceId }));
  };

  const selectOption = (optionGroupId: number, optionId: number, isSingle: boolean) => {
    setState((prev) => {
      let newOptions = prev.selectedOptions.filter((opt) => opt.optionGroupId !== optionGroupId);
      if (!isSingle) {
        newOptions = prev.selectedOptions.filter(
          (opt) => opt.optionGroupId !== optionGroupId || opt.optionId !== optionId,
        );
        const already = prev.selectedOptions.some(
          (opt) => opt.optionGroupId === optionGroupId && opt.optionId === optionId,
        );
        if (!already) {
          newOptions = [...prev.selectedOptions, { optionGroupId, optionId }];
        }
      } else {
        newOptions = [{ optionGroupId, optionId }];
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

  return {
    ...state,
    selectPrice,
    selectOption,
    increaseCount,
    decreaseCount,
    totalPrice,
    selectedPriceObj,
  };
}
