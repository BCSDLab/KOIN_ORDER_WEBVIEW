import { useSuspenseQuery } from '@tanstack/react-query';
import type { UnorderableShopReviewsResponse } from '@/api/shop/entity';
import type { ReviewSorter } from '@/api/shop/entity';
import { getShopTotalReview } from '@/api/shop';

interface UseShopReviewProps {
  shopId: string;
  page?: number;
  limit?: number;
  sort?: ReviewSorter;
}
export const useShopReview = ({ shopId, page = 1, limit = 50, sort = 'LATEST' }: UseShopReviewProps) => {
  const query = useSuspenseQuery<UnorderableShopReviewsResponse>({
    queryKey: ['shopTotalReview', shopId, page, limit, sort],
    queryFn: () =>
      getShopTotalReview({
        shopId,
        page,
        limit,
        sorter: sort,
      }),
  });
  return query;
};
