import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { confirmPayments } from '@/api/payments';
import { ConfirmPaymentsRequest } from '@/api/payments/entity';

export default function useConfirmPayments() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (body: ConfirmPaymentsRequest) => confirmPayments(body),
    onError: (error) => {
      const errorMessage = JSON.parse(error.message);

      if (errorMessage.code === 'PROVIDER_ERROR') return;
      navigate('/payment', { state: { error: errorMessage.message } });
    },
  });
}
