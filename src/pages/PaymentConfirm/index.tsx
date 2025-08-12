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

  const { mutateAsync: confirmPayments, isPending } = useConfirmPayments({
    orderType: orderType!,
    paymentKey: paymentKey!,
  });

  useEffect(() => {
    const ready = orderId && paymentKey && amount;
    if (!ready) return;

    confirmPayments({
      order_id: orderId!,
      payment_key: paymentKey!,
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

  return null;
}
