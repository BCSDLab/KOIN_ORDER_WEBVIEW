import { useSuspenseQuery } from '@tanstack/react-query';
import type { ShopEventsResponse } from '@/api/shop/entity';
import { getShopEvent } from '@/api/shop';

export const useGetShopEvents = (shopId: number) => {
  const { data } = useSuspenseQuery<ShopEventsResponse>({
    queryKey: ['shopEvents', shopId],
    queryFn: () => getShopEvent(shopId),
  });

  return { data };
};
