import { useSuspenseQuery } from '@tanstack/react-query';
import { getCartSummary } from '@/api/cart';

export const useGetCartSummary = (orderableShopId: number) => {
  return useSuspenseQuery({
    queryKey: ['cartSummary', orderableShopId],
    queryFn: () => getCartSummary({ orderableShopId: orderableShopId }),
  });
};
