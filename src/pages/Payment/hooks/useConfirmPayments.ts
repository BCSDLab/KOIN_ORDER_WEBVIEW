import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { confirmPayments } from '@/api/payments';
import { ConfirmPaymentsRequest } from '@/api/payments/entity';

export default function useConfirmPayments(orderType: string) {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (body: ConfirmPaymentsRequest) => confirmPayments(body),
    onError: (error) => {
      const errorMessage = JSON.parse(error.message);

      if (errorMessage.code === 'PROVIDER_ERROR') return;
      navigate(`/payment?orderType=${orderType}&message=${errorMessage.message}`);
    },
  });
}
