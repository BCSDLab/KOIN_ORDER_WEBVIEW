import { useMutation } from '@tanstack/react-query';
import { confirmPayments } from '@/api/payments';
import { ConfirmPaymentsRequest } from '@/types/api/payments';

export default function useConfirmPayments() {
  return useMutation({
    mutationFn: (body: ConfirmPaymentsRequest) => confirmPayments(body),
  });
}
