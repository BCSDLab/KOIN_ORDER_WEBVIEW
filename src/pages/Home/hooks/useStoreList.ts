import { useSuspenseQuery } from '@tanstack/react-query';
import { StoreListParams } from '@/api/shop/entity';
import { getStoreList } from '@/api/shop/index';

export const useStoreList = (params: StoreListParams = {}) => {
  const { data } = useSuspenseQuery({
    queryKey: ['nearbyShops', params],
    queryFn: () => getStoreList(params),
  });
  return { data };
};
