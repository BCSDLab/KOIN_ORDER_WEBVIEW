import { useSuspenseQuery } from '@tanstack/react-query';
import { UnorderableShopReviewsResponse } from '@/api/shop/entity';
import { getShopTotalReview } from '@/api/shop/index';

export const useShopTotalReview = (shopId: string) => {
  const { data } = useSuspenseQuery<UnorderableShopReviewsResponse>({
    queryKey: ['shopTotalReview', shopId],
    queryFn: () => getShopTotalReview(shopId),
  });
  return { data };
};
