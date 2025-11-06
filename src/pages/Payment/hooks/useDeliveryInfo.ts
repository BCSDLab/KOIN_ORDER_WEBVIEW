import { useSuspenseQuery } from '@tanstack/react-query';
import { getShopDeliveryInfo } from '@/api/shop';

export default function useDeliveryInfo(orderableShopId: number) {
  return useSuspenseQuery({
    queryKey: ['deliveryInfo', orderableShopId],
    queryFn: () => getShopDeliveryInfo({ orderableShopId }),
  });
}
