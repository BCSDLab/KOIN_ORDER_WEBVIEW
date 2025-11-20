import { useSuspenseQuery } from '@tanstack/react-query';
import { getShopReviewDetail } from '@/api/shop/index';

export const useGetShopReviewDetail = (shopId: number, reviewId: number) => {
  return useSuspenseQuery({
    queryKey: ['ShopReviewDetail', shopId, reviewId],
    queryFn: () => getShopReviewDetail(shopId, reviewId),
  });
};
