import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { cancelPayment } from '@/api/payments';
import { CancelPaymentRequest } from '@/api/payments/entity';

export default function useCancelPayment(paymentKey: string) {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (body: CancelPaymentRequest) => cancelPayment(paymentKey, body),
    onSuccess: () => {
      navigate('/메인 페이지로 이동'); // 명세 바뀔 수도 있음
      // 추기로 '주문이 취소되었습니다' 토스트 띄워야 됨
    },
  });
}
