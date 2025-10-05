import { useSuspenseQuery } from '@tanstack/react-query';
import { ShopListParams } from '@/api/shop/entity';
import { getShopList } from '@/api/shop/index';

interface UseShopListParams extends ShopListParams {
  category?: number;
}

export const useShopList = (params: UseShopListParams = {}) => {
  const { category, ...apiParams } = params;

  const { data: rawData } = useSuspenseQuery({
    queryKey: ['nearbyShops', apiParams],
    queryFn: () => getShopList(apiParams),
  });

  const filteredData = {
    ...rawData,
    shops: rawData.shops.filter((shop) => {
      if (!category || category === 1) return true;

      return shop.category_ids?.includes(category);
    }),
  };
  return { data: filteredData };
};
