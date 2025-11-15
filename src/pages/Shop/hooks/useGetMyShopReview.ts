import { useSuspenseQuery } from '@tanstack/react-query';
import type { UnorderableShopReviewsResponse } from '@/api/shop/entity';
import type { SortType } from '@/pages/Shop/components/SortModal';
import { getMyShopReviews } from '@/api/shop';
import { mapSortTypeToServer } from '@/util/ts/ReviewSorterMapper';

export const useGetMyShopReview = (shopId: string, sort: SortType = 'LATEST') => {
  const serverSorter = mapSortTypeToServer(sort);

  const { data } = useSuspenseQuery<UnorderableShopReviewsResponse>({
    queryKey: ['shopMyReview', shopId, serverSorter],
    queryFn: () =>
      getMyShopReviews({
        shopId,
        sorter: serverSorter,
      }),
  });

  return { data };
};
