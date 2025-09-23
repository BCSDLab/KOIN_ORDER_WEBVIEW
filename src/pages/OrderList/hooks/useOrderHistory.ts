import { useInfiniteQuery } from '@tanstack/react-query';
import type { Order, OrderParams, OrderResponse } from '@/api/order/entity';
import { getOrder } from '@/api/order';

type OrderHistoryKey = ['orderHistory', OrderParams];

export const useOrderHistory = (params: OrderParams) => {
  return useInfiniteQuery<OrderResponse, Error, Order[], OrderHistoryKey, number>({
    queryKey: ['orderHistory', params] as OrderHistoryKey,
    queryFn: ({ pageParam = 1 }) => getOrder({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.current_page < lastPage.total_page ? lastPage.current_page + 1 : undefined,
    select: (data) => data.pages.flatMap((page) => page.orders),
  });
};
