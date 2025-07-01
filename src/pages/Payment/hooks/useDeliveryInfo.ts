import { useQuery } from '@tanstack/react-query';
import { getShopDeliveryInfo } from '@/api/shop';

export default function useDeliveryInfo(orderableShopId: number) {
  return useQuery({
    queryKey: ['deliveryInfo', orderableShopId],
    queryFn: () => getShopDeliveryInfo({ orderableShopId }),
  });
}
