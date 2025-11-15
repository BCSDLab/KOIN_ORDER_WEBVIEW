import { useSuspenseQuery } from '@tanstack/react-query';
import type { UnorderableShopReviewsResponse } from '@/api/shop/entity';
import type { SortType } from '@/pages/Shop/components/SortModal';
import { getShopTotalReview } from '@/api/shop';
import { mapSortTypeToServer } from '@/util/ts/ReviewSorterMapper';

interface UseShopTotalReviewOptions {
  page?: number;
  limit?: number;
  sort?: SortType;
}

export const useShopTotalReview = (shopId: string, options?: UseShopTotalReviewOptions) => {
  const page = options?.page ?? 1;
  const limit = options?.limit ?? 10;
  const sort = options?.sort ?? 'LATEST';

  const serverSorter = mapSortTypeToServer(sort);

  return useSuspenseQuery<UnorderableShopReviewsResponse>({
    queryKey: ['shopTotalReview', shopId, page, limit, serverSorter],
    queryFn: () =>
      getShopTotalReview({
        shopId,
        page,
        limit,
        sorter: serverSorter,
      }),
  });
};
