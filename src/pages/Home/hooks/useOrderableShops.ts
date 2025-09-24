import { useSuspenseQuery } from '@tanstack/react-query';
import { OrderableShopsParams } from '@/api/shop/entity';
import { getOrderableShops } from '@/api/shop/index';

export const useOrderableShops = (params: OrderableShopsParams = {}) => {
  const { data } = useSuspenseQuery({
    queryKey: ['orderableShops', params],
    queryFn: () => getOrderableShops(params),
  });
  return { data };
};
