import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import Lottie from 'lottie-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ConfirmPaymentsResponse } from '@/api/payments/entity';
import CloseIcon from '@/assets/Main/close-icon.svg';
import CallIcon from '@/assets/OrderFinish/call-icon.svg';
import Motorcycle from '@/assets/OrderFinish/motorcycle-icon.svg';
import PackageIcon from '@/assets/OrderFinish/package.svg';
import Receipt from '@/assets/OrderFinish/receipt-icon.svg';
import ShoppingCart from '@/assets/OrderFinish/shopping-cart-icon.svg';
import Skillet from '@/assets/OrderFinish/skillet-icon.svg';
import ArrowGo from '@/assets/Payment/arrow-go-icon.svg';
import Paying from '@/assets/Payment/paying.json';
import BottomModal, {
  BottomModalHeader,
  BottomModalContent,
  BottomModalFooter,
} from '@/components/UI/BottomModal/BottomModal';
import Button from '@/components/UI/Button';
import useConfirmPayments from '@/pages/Payment/hooks/useConfirmPayments';
import useBooleanState from '@/util/hooks/useBooleanState';

export default function OrderFinish() {
  type OrderKind = 'order' | 'preparation' | 'delivery';

  const stateTitle = {
    order: '주문 확인중',
    preparation: '준비중',
    delivery: '배달 완료',
  } as const;

  const stateMessage = {
    order: '사장님이 주문을 확인하고 있어요!',
    preparation: '가게에서 열심히 음식을 조리하고있어요!',
    delivery: '배달이 완료되었어요 감사합니다!',
  } as const;

  const [searchParams] = useSearchParams();
  const orderType = searchParams.get('orderType');
  const entryPoint = searchParams.get('entryPoint');
  const orderId = searchParams.get('orderId');
  const paymentKey = searchParams.get('paymentKey');
  const amount = searchParams.get('amount');
  const navigate = useNavigate();

  const { mutateAsync: confirmPayments, isPending } = useConfirmPayments(orderType!);

  const [orderKind, setOrderKind] = useState<OrderKind>('order');
  const [paymentResponse, setPaymentResponse] = useState<ConfirmPaymentsResponse>();

  const [isDeliveryBottomModalOpen, , closeDeliveryBottomModal] = useBooleanState(false);
  const [isCallBottomModalOpen, openCallBottomModal, closeCallBottomModal] = useBooleanState(false);

  const isDelivery = orderType === 'delivery';

  const approvedTime = dayjs(paymentResponse?.approved_at);
  const deliveryFinishTime = approvedTime.add(1, 'hour').format('A h시 mm분');

  useEffect(() => {
    const confirmPayment = async () => {
      const response = await confirmPayments({ order_id: orderId!, payment_key: paymentKey!, amount: Number(amount) });
      setPaymentResponse(response);
    };

    if (entryPoint === 'payment') {
      confirmPayment();
    }
  }, [confirmPayments, orderId, paymentKey]);

  if (isPending) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="text-[32px] leading-[160%] font-bold">결제 중</div>
        <div className="leading-[160%] font-medium">잠시만 기다려주세요!</div>
        <Lottie animationData={Paying} style={{ width: 390, height: 400 }} />
      </div>
    );
  }

  const handleOpenCallBottomModal = () => {
    closeDeliveryBottomModal();
    openCallBottomModal();
    setOrderKind('order'); //lint 에러 떠서 그냥 추가해놓음
  };

  const handleClickOrderCancel = () => {
    navigate(`/orderCancel?paymentKey=${paymentKey}`);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between px-6 py-6">
        <div className="text-primary-500 flex h-auto flex-col justify-center text-xl leading-[160%] font-bold">
          {stateTitle[orderKind]}
          <div className={orderKind === 'preparation' ? 'font-bold text-[#7D08A4]' : 'hidden'}>
            {`${deliveryFinishTime} 도착 예정`}
          </div>
          <div className="text-xs leading-[160%] font-normal text-neutral-500">{stateMessage[orderKind]}</div>
        </div>
        {orderKind === 'order' && (
          <Button
            onClick={handleClickOrderCancel}
            className="h-[1.938rem] w-[4.125rem] self-end rounded-3xl px-2 text-xs leading-[160%] font-semibold"
          >
            취소하기
          </Button>
        )}
      </div>
      <div>
        <div className="flex flex-row justify-between px-6 pt-4 pb-1.5">
          <div className="is-text-purple">주문확인</div>
          <div className={orderKind === 'order' ? 'is-text-gray' : 'is-text-purple'}>준비중</div>
          <div className={orderKind !== 'delivery' ? 'is-text-gray' : 'is-text-purple'}>
            {isDelivery ? '배달' : '수령'}완료
          </div>
        </div>
        <div className="flex flex-row justify-center">
          <div className="is-icon-purple">
            <ShoppingCart />
          </div>
          <div className="bg-primary-300 h-[5px] w-[calc((100vw-184px)/8)] self-center"></div>
          <div
            className={`h-[5px] w-[calc((100vw-184px)/8*3)] self-center ${orderKind === 'order' ? 'bg-neutral-400' : 'bg-primary-300'}`}
          ></div>
          <div className={orderKind === 'order' ? 'is-icon-gray' : 'is-icon-purple'}>
            <Skillet />
          </div>
          <div
            className={`h-[5px] w-[calc((100vw-184px)/8)] self-center ${orderKind === 'order' ? 'bg-neutral-400' : 'bg-primary-300'}`}
          ></div>
          <div
            className={`h-[5px] w-[calc((100vw-184px)/8*3)] self-center ${orderKind !== 'delivery' ? 'bg-neutral-400' : 'bg-primary-300'}`}
          ></div>
          <div className={orderKind !== 'delivery' ? 'is-icon-gray' : 'is-icon-purple'}>
            {isDelivery ? <Motorcycle /> : <PackageIcon />}
          </div>
        </div>
      </div>
      <div className="mt-10 px-6">
        <div className="text-primary-500 mb-5 text-lg font-semibold">{isDelivery ? '배달' : '방문'}정보</div>
        <div className="shadow-1 flex flex-col gap-3 rounded-2xl border border-white bg-white px-6 py-4 text-sm leading-[160%] font-semibold">
          <div>
            {isDelivery ? '배달' : '가게'}주소
            <div className="border-b border-neutral-200 pb-3 font-normal text-neutral-500">
              {isDelivery ? paymentResponse?.delivery_address : paymentResponse?.shop_address}
            </div>
          </div>
          <div>
            사장님에게
            <div className={`${isDelivery && 'border-b border-neutral-200 pb-3'} font-normal text-neutral-500`}>
              {paymentResponse?.to_owner}
            </div>
          </div>
          {isDelivery && (
            <div>
              배달기사님에게<div className="font-normal text-neutral-500">{paymentResponse?.to_rider}</div>
            </div>
          )}
        </div>
        <div className="text-primary-500 my-5 text-lg font-semibold">주문정보</div>
        <div className="shadow-1 mb-16 flex flex-col gap-3 rounded-2xl border border-white bg-white px-6 py-4 text-sm leading-[160%] font-semibold">
          <div className="align-center flex gap-1 border-b border-neutral-200 pt-1 pb-4 pl-1">
            <div>{paymentResponse?.shop_name}</div>
            <ArrowGo />
          </div>
          <div className="border-b border-neutral-200 pb-3 text-[13px] font-normal text-neutral-500">
            {paymentResponse?.menus.map((menu) => (
              <div className="flex gap-2">
                <div>{menu.name}</div>
                <div>{menu.quantity}개</div>
              </div>
            ))}
          </div>
          <div className="flex flex-row justify-between pb-2">
            총 결제 금액 <div>{paymentResponse?.amount.toLocaleString()}원</div>
          </div>
          <Button className="h-[2.75rem] w-[14.75rem] gap-3 self-center">
            <Receipt />
            상세내역 보기
          </Button>
        </div>
      </div>
      <div>
        <BottomModal isOpen={isDeliveryBottomModalOpen} onClose={closeDeliveryBottomModal}>
          <BottomModalHeader>
            <div className="text-primary-500 font-semibold"> 배달이 완료 되었나요?</div>
            <button onClick={closeDeliveryBottomModal}>
              <CloseIcon />
            </button>
          </BottomModalHeader>
          <BottomModalContent>
            <div className="text-neutral-600">음식을 수령하셨다면 완료를 눌러주세요</div>
            <Button onClick={closeDeliveryBottomModal} className="h-[3.063rem] rounded-xl text-lg">
              완료
            </Button>
            <Button
              onClick={handleOpenCallBottomModal}
              className="h-[3.063rem] rounded-xl border border-neutral-400 bg-white text-lg text-neutral-600"
            >
              아직 못받았어요
            </Button>
          </BottomModalContent>
          <BottomModalFooter></BottomModalFooter>
        </BottomModal>

        <BottomModal isOpen={isCallBottomModalOpen} onClose={closeCallBottomModal}>
          <BottomModalHeader>
            아직 못받으셨나요?
            <button onClick={closeCallBottomModal}>
              <CloseIcon />
            </button>
          </BottomModalHeader>
          <BottomModalContent>
            <div>빠른 해결을 위해 매장에 전화해 보시겠어요?</div>
            <Button
              className="h-[3.063rem] gap-3 rounded-xl text-lg"
              onClick={() => (window.location.href = `tel:010-1234-5678`)} //테스트용 전화번호, api 연동 시 변경
            >
              <CallIcon />
              전화하기
            </Button>
          </BottomModalContent>
          <BottomModalFooter></BottomModalFooter>
        </BottomModal>
      </div>
    </div>
  );
}
