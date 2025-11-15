import { useSuspenseQuery } from '@tanstack/react-query';
import type { UnorderableShopReviewsResponse } from '@/api/shop/entity';
import type { ReviewSorter } from '@/api/shop/entity';
import { getMyShopReviews } from '@/api/shop';

interface UseGetMyShopReviewParams {
  shopId: string;
  sort?: ReviewSorter;
}

export const useGetMyShopReview = ({ shopId, sort = 'LATEST' }: UseGetMyShopReviewParams) => {
  const { data } = useSuspenseQuery<UnorderableShopReviewsResponse>({
    queryKey: ['shopMyReview', shopId, sort],
    queryFn: () =>
      getMyShopReviews({
        shopId,
        params: { sorter: sort },
      }),
  });

  return { data };
};
