import { useSuspenseQuery } from '@tanstack/react-query';
import { getPaymentInfo } from '@/api/payments';

export default function usePaymentInfo(paymentId: number) {
  return useSuspenseQuery({
    queryKey: ['paymentInfo', paymentId],
    queryFn: () => getPaymentInfo(paymentId),
  });
}
