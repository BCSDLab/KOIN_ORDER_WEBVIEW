import { useSuspenseQuery } from '@tanstack/react-query';
import { getShopDetailInfo } from '@/api/shop';

export const useGetShopDetail = (orderableShopId: number) => {
  return useSuspenseQuery({
    queryKey: ['shopDetail', orderableShopId],
    queryFn: () => getShopDetailInfo({ orderableShopId }),
  });
};
