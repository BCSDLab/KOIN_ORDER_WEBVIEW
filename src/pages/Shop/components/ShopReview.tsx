import { useSuspenseQuery } from '@tanstack/react-query';
import { mapSortTypeToServer } from './reviewSorterMapper';
import type { SortType } from '@/pages/Shop/components/SortModal';
import { UnorderableShopReviewsResponse } from '@/api/shop/entity';
import { getShopTotalReview } from '@/api/shop/index';

export const ShopTotalReview = (shopId: string, sort: SortType = 'LATEST') => {
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
