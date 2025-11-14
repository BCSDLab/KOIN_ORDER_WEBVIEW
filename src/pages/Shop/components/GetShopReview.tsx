import { useSuspenseQuery } from '@tanstack/react-query';
import type { SortType } from '@/pages/Shop/components/SortModal';
import { UnorderableShopReviewsResponse } from '@/api/shop/entity';
import { getShopTotalReview } from '@/api/shop/index';
import { mapSortTypeToServer } from '@/pages/Shop/components/reviewSorterMapper';

export const GetShopReview = (shopId: string, sort: SortType = 'LATEST') => {
  const serverSorter = mapSortTypeToServer(sort);

  const { data } = useSuspenseQuery<UnorderableShopReviewsResponse>({
    queryKey: ['shopTotalReview', shopId, serverSorter],
    queryFn: () =>
      getShopTotalReview({
        shopId,
        sorter: serverSorter,
      }),
  });

  return { data };
};
