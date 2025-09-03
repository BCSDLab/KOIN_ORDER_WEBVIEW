import { useEffect } from 'react';
import Lottie from 'lottie-react';
import { useSearchParams } from 'react-router-dom';
import useConfirmPayments from '../Payment/hooks/useConfirmPayments';
import Paying from '@/assets/Payment/paying.json';

export default function PaymentConfirm() {
  const [searchParams] = useSearchParams();
  const orderType = searchParams.get('orderType');
  const orderId = searchParams.get('orderId');
  const paymentKey = searchParams.get('paymentKey');
  const amount = searchParams.get('amount');

  if (!orderType || !orderId || !paymentKey || !amount) {
    // 예상 상황 : 토스 결제 성공한 상황, 그러나 토스 측에서 정보를 주지 않았거나 FE에서 url 파라미터를 잘못 전달
    // TODO : 결제 취소 로직 구현 혹은 별도의 에러 페이지 렌더링 (다음 스프린트 진행 시 논의 후)
    return <div>결제 정보가 부족합니다.</div>;
  }

  const { mutateAsync: confirmPayments, isPending } = useConfirmPayments({
    orderType: orderType,
    paymentKey: paymentKey,
  });

  useEffect(() => {
    const ready = orderId && paymentKey && amount;
    if (!ready) return;

    confirmPayments({
      order_id: orderId,
      payment_key: paymentKey,
      amount: Number(amount),
    });
  }, [orderId, paymentKey, amount, confirmPayments]);

  if (isPending) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="text-[32px] leading-[160%] font-bold">결제 중</div>
        <div className="leading-[160%] font-medium">잠시만 기다려주세요!</div>
        <Lottie animationData={Paying} style={{ width: 390, height: 400 }} />
      </div>
    );
  }

  return <div>오류 테스트</div>;
}
