import { useMutation } from '@tanstack/react-query';
import { cancelPayment } from '@/api/payments';
import { CancelPaymentRequest } from '@/api/payments/entity';
import { backButtonTapped } from '@/util/ts/bridge';

export default function useCancelPayment(paymentId: number) {
  return useMutation({
    mutationFn: (body: CancelPaymentRequest) => cancelPayment(paymentId, body),
    onSuccess: () => {
      backButtonTapped();
    },
  });
}
