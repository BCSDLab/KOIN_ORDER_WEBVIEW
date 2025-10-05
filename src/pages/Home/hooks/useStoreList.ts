import { useSuspenseQuery } from '@tanstack/react-query';
import { StoreListParams } from '@/api/shop/entity';
import { getStoreList } from '@/api/shop/index';

interface UseStoreListParams extends StoreListParams {
  category?: number | null;
}

export const useStoreList = (params: UseStoreListParams = {}) => {
  const { category, ...apiParams } = params;

  const { data: rawData } = useSuspenseQuery({
    queryKey: ['nearbyShops', apiParams],
    queryFn: () => getStoreList(apiParams),
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
