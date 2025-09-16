import { useState } from 'react';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';
import OrderMap from './components/OrderMap';
import ReceiptModal from './components/ReceiptModal';
import usePaymentInfo from './hooks/usePaymentInfo';
import CloseIcon from '@/assets/Main/close-icon.svg';
import CallIcon from '@/assets/OrderFinish/call-icon.svg';
import Motorcycle from '@/assets/OrderFinish/motorcycle-icon.svg';
import PackageIcon from '@/assets/OrderFinish/package.svg';
import Receipt from '@/assets/OrderFinish/receipt-icon.svg';
import ShoppingCart from '@/assets/OrderFinish/shopping-cart-icon.svg';
import Skillet from '@/assets/OrderFinish/skillet-icon.svg';
import ArrowGo from '@/assets/Payment/arrow-go-icon.svg';
import BottomModal, {
  BottomModalHeader,
  BottomModalContent,
  BottomModalFooter,
} from '@/components/UI/BottomModal/BottomModal';
import Button from '@/components/UI/Button';
import { isNative } from '@/util/bridge/bridge';
import { backButtonTapped, goToShopDetail } from '@/util/bridge/nativeAction';
import useBooleanState from '@/util/hooks/useBooleanState';

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

const formatKRW = (number: number) => `${number.toLocaleString()}원`;

export default function OrderFinish() {
  const navigate = useNavigate();
  const { paymentId } = useParams();

  if (!paymentId) {
    // 잘못된 경로로 접근 시 메인 화면으로 이동(임시 처리)
    backButtonTapped();
  }

  const { data: paymentInfo } = usePaymentInfo(Number(paymentId));

  // TODO: paymentInfo가 없을 경우 처리
  if (!paymentInfo) return <div>주문 정보가 없습니다.</div>;

  const isDelivery = paymentInfo.order_type === 'DELIVERY';

  const [orderKind] = useState<OrderKind>('order');
  const [isDeliveryBottomModalOpen, , closeDeliveryBottomModal] = useBooleanState(false);
  const [isCallBottomModalOpen, openCallBottomModal, closeCallBottomModal] = useBooleanState(false);
  const [isReceiptOpen, openReceipt, closeReceipt] = useBooleanState(false);

  const approvedTime = dayjs(paymentInfo?.approved_at);
  const deliveryFinishTime = approvedTime.add(1, 'hour').format('A h시 mm분');

  const menusSubtotal = paymentInfo.menus.reduce((sum, menu) => {
    const optionSumPerItem = (menu.options ?? []).reduce((sum, options) => sum + (options.option_price ?? 0), 0);
    return sum + (menu.price + optionSumPerItem) * menu.quantity;
  }, 0);

  const deliveryFee = paymentInfo.amount - menusSubtotal;

  const handleOpenCallBottomModal = () => {
    closeDeliveryBottomModal();
    openCallBottomModal();
  };

  const handleClickOrderCancel = () => {
    navigate(`/orderCancel/${paymentId}`);
  };

  const handleGoToShopDetail = () => () => {
    if (isNative()) {
      return goToShopDetail(paymentInfo.orderable_shop_id);
    }
    navigate(`/shop/true/${paymentInfo.orderable_shop_id}`);
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
            <ShoppingCart fill="white" />
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
        <OrderMap paymentInfo={paymentInfo} />
        <div className="shadow-1 flex flex-col rounded-2xl border border-white bg-white px-6 text-sm leading-[160%] font-semibold">
          <div className="border-b border-neutral-200 py-4">
            {isDelivery ? '배달' : '가게'}주소
            <div className="font-normal text-neutral-500">
              {isDelivery
                ? `${paymentInfo.delivery_address} ${paymentInfo.delivery_address_details}`
                : paymentInfo.shop_address}
            </div>
          </div>
          <div className={clsx('py-4', isDelivery && 'border-b border-neutral-200 pb-4')}>
            사장님에게
            <div className={`font-normal text-neutral-500`}>
              {paymentInfo.provide_cutlery ? '수저 · 포크 받기, ' : '수저 · 포크 안 받기 '}
              {paymentInfo.to_owner}
            </div>
          </div>
          {isDelivery && (
            <div className="py-4">
              배달기사님에게
              <div className="font-normal text-neutral-500">{paymentInfo.to_rider ? paymentInfo.to_rider : '없음'}</div>
            </div>
          )}
        </div>
        <div className="text-primary-500 my-5 text-lg font-semibold">주문내역</div>
        <div className="shadow-1 gap-3 rounded-2xl border border-white bg-white px-6 py-4 text-sm leading-[160%]">
          <div>
            <div className="flex flex-col gap-4">
              {paymentInfo.menus.map((menu, menuIndex) => {
                const optionSumPerItem = (menu.options ?? []).reduce(
                  (sum, option) => sum + (option.option_price ?? 0),
                  0,
                );
                const lineTotal = (menu.price + optionSumPerItem) * menu.quantity;

                return (
                  <div key={menuIndex}>
                    <div className="mb-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <div className="text-sm leading-[160%] font-semibold">{menu.name}</div>
                        <div className="text-sm font-semibold text-neutral-500">{menu.quantity}개</div>
                      </div>
                      <div className="text-[15px] leading-[160%] font-semibold">{formatKRW(lineTotal)}</div>
                    </div>

                    <ul className="ml-4 list-disc">
                      <li>
                        <div className="text-[13px] text-neutral-500">가격 : {formatKRW(menu.price)}</div>
                      </li>

                      {(menu.options ?? []).length > 0 &&
                        menu.options!.map((option, optionIndex) => {
                          const optionPrice = option.option_price ?? 0;
                          return (
                            <li key={optionIndex}>
                              <div className="text-[13px] text-neutral-500">
                                {option.option_group_name} : {option.option_name} (<span>{formatKRW(optionPrice)}</span>
                                )
                              </div>
                            </li>
                          );
                        })}
                    </ul>
                    {menuIndex !== paymentInfo.menus.length - 1 && <div className="mt-4 border-t border-neutral-100" />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="text-primary-500 my-5 text-lg font-semibold">결제정보</div>
        <div className="shadow-1 mb-5 gap-3 rounded-2xl border border-white bg-white px-6 py-4 text-sm leading-[160%]">
          <div className="text-[13px] text-neutral-500">
            <div className="flex justify-between pb-1">
              메뉴 금액<div>{formatKRW(menusSubtotal)}</div>
            </div>
            <div className="flex justify-between">
              배달 금액<div>{formatKRW(deliveryFee)}</div>
            </div>
            <div className="my-4 h-[1px] border-b border-neutral-200" />
          </div>
          <div className="font-semibold">
            <div className="flex justify-between pb-1">
              총 결제 금액 <div className="text-primary-500 text-[15px]">{formatKRW(paymentInfo.amount)}</div>
            </div>
            <div className="flex justify-between">
              결제 수단 <div className="text-[15px]">{paymentInfo.easy_pay_company}</div>
            </div>
          </div>
        </div>
        <div className="text-primary-500 my-5 text-lg font-semibold">주문정보</div>
        <div className="shadow-1 mb-16 flex flex-col gap-4 rounded-2xl bg-white px-6 py-4">
          <button
            className="flex items-center gap-1.5 text-sm leading-[160%] font-semibold"
            onClick={handleGoToShopDetail()}
          >
            <div>{paymentInfo.shop_name}</div>
            <ArrowGo />
          </button>
          <div className="text-[13px] text-neutral-600">
            <div className="flex gap-2">
              주문번호 <div>{paymentInfo.id}</div>
            </div>
            <div className="flex gap-2">
              주문일시 <div>{paymentInfo.requested_at.split(' ')[0]}</div>
            </div>
          </div>
          <div className="h-[1px] border-b border-neutral-200" />
          <Button className="gap-3 self-center px-16 py-2.5" onClick={openReceipt}>
            <Receipt />
            영수증 보기
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
            <Button onClick={closeDeliveryBottomModal} className="rounded-xl py-2.5 text-lg">
              완료
            </Button>
            <Button
              onClick={handleOpenCallBottomModal}
              className="rounded-xl border border-neutral-400 bg-white py-2.5 text-lg text-neutral-600"
            >
              아직 못받았어요
            </Button>
          </BottomModalContent>
          <BottomModalFooter />
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
              className="gap-2.5 rounded-xl py-2.5 text-lg"
              onClick={() => (window.location.href = `tel:010-1234-5678`)} //테스트용 전화번호, api 연동 시 변경
            >
              <CallIcon />
              전화하기
            </Button>
          </BottomModalContent>
          <BottomModalFooter />
        </BottomModal>
        <ReceiptModal isOpen={isReceiptOpen} onClose={closeReceipt} paymentInfo={paymentInfo} />
      </div>
    </div>
  );
}
