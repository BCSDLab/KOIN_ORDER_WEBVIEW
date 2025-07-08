import { useState } from 'react';
import { ShopMenuDetailResponse } from '@/api/shop/entity';

export const useMenuSelection = (menuInfo: ShopMenuDetailResponse) => {
  const [menuSelection, setMenuSelection] = useState({
    id: menuInfo.id,
    count: 1,
  });

  const increaseCount = () => {
    setMenuSelection((prev) => ({ ...prev, count: prev.count + 1 }));
  };
  const decreaseCount = () => {
    setMenuSelection((prev) => ({
      ...prev,
      count: prev.count > 0 ? prev.count - 1 : 0,
    }));
  };

  return { count: menuSelection.count, increaseCount, decreaseCount };
};
