import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { confirmPayments } from '@/api/payments';
import { ConfirmPaymentsRequest } from '@/api/payments/entity';
import { useOrderStore } from '@/stores/useOrderStore';

interface UseConfirmPaymentsProps {
  orderType: string;
  paymentKey: string;
}

export default function useConfirmPayments({ orderType, paymentKey }: UseConfirmPaymentsProps) {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (body: ConfirmPaymentsRequest) => confirmPayments(body),
    onSuccess: (response) => {
      useOrderStore.persist.clearStorage();
      navigate(`/result/${response.id}?paymentKey=${paymentKey}`, { replace: true });
    },

    onError: (error) => {
      const errorMessage = JSON.parse(error.message);

      if (errorMessage.code === 'PROVIDER_ERROR') return;
      navigate(`/payment?orderType=${orderType}&message=${errorMessage.message}`, { replace: true });
    },
  });
}
