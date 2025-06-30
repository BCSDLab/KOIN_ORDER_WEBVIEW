import { useMutation } from '@tanstack/react-query';
import { getTemporaryDelivery } from '@/api/payments';
import { DeliveryTemporaryRequest } from '@/types/api/payments';

export default function useTemporaryDelivery() {
  return useMutation({
    mutationFn: (body: DeliveryTemporaryRequest) => getTemporaryDelivery(body),
  });
}
