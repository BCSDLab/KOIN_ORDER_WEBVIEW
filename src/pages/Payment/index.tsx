import { useEffect, useState } from 'react';
import { TossPaymentsWidgets } from '@tosspayments/tosspayments-sdk';
import clsx from 'clsx';
import { useSearchParams } from 'react-router-dom';
import Agreement from './components/Agreement';
import ContactModal from './components/ContactModal';
import DeliveryAddressSection from './components/DeliveryAddressSection';
import PaymentAmount from './components/PaymentAmount';
import PaymentFailModal from './components/PaymentFailModal';
import ShopLocationMap from './components/ShopLocationMap';
import StoreRequestModal from './components/StoreRequestModal';
import TossWidget from './components/TossWidget';
import useCart from './hooks/useCart';
import useTemporaryDelivery from './hooks/useTemporaryDelivery';
import useTemporaryTakeout from './hooks/useTemporaryTakeout';
import PickupIcon from '@/assets/Delivery/bucket.svg';
import Bike from '@/assets/Main/agriculture.svg';
import RightArrow from '@/assets/Payment/arrow-go-icon.svg';
import Badge from '@/components/UI/Badge';
import Button from '@/components/UI/Button';
import useBooleanState from '@/util/hooks/useBooleanState';

export default function Payment() {
  const [searchParams] = useSearchParams();
  const [isContactModalOpen, openContactModal, closeContactModal] = useBooleanState(false);
  const [isStoreRequestModalOpen, openStoreRequestModal, closeStoreRequestModal] = useBooleanState(false);
  const [isPaymentFailModalOpen, openPaymentFailModal, closePaymentFailModal] = useBooleanState(false);

  const [contact, setContact] = useState('');
  const [request, setRequest] = useState('요청사항 없음');
  const [noCutlery, setNoCutlery] = useState(true);

  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null);

  const orderType = searchParams.get('orderType');
  const message = searchParams.get('message');
  const isDelivery = orderType === 'delivery';

  const { data: cart } = useCart(isDelivery ? 'DELIVERY' : 'TAKE_OUT');
  const { mutateAsync: temporaryDelivery } = useTemporaryDelivery();
  const { mutateAsync: temporaryTakeout } = useTemporaryTakeout();

  const orderName =
    cart!.items.length === 1 ? cart!.items[0].name : `${cart!.items[0].name} 외 ${cart!.items.length - 1}건`;

  const pay = async () => {
    let order;
    if (isDelivery) {
      order = await temporaryDelivery({
        address: '추후 추가해야 함',
        phone_number: contact,
        to_owner: request,
        to_rider: '추후 추가해야 함',
        total_menu_price: cart!.items_amount,
        delivery_tip: cart!.delivery_fee,
        total_amount: cart!.total_amount,
      });
    } else {
      order = await temporaryTakeout({
        phoneNumber: contact,
        toOwner: request,
        totalMenuPrice: cart!.items_amount,
        totalAmount: cart!.total_amount,
      });
    }

    try {
      await widgets!.requestPayment({
        orderId: order.order_id,
        orderName: orderName,
        successUrl: window.location.origin + `/result?orderType=${orderType}&entryPoint=payment`,
        failUrl: window.location.origin + `/payment?orderType=${orderType}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (message) {
      openPaymentFailModal();
    }
  }, [message]);

  return (
    <div className="mx-6 mt-4">
      <div className="flex items-center gap-3 text-xl font-bold">
        <Badge
          variant="outlined"
          color="primaryLight"
          className="px-3 py-2 leading-[16px]"
          startIcon={isDelivery ? <Bike /> : <PickupIcon />}
          label={isDelivery ? '배달' : '포장'}
        />
        {cart.shop_name}
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {isDelivery ? (
          <DeliveryAddressSection orderableShopId={cart.orderable_shop_id} />
        ) : (
          <ShopLocationMap orderableShopId={cart.orderable_shop_id} />
        )}

        <div>
          <p className="text-primary-500 text-lg font-semibold">연락처</p>
          <Button onClick={openContactModal} color="gray" fullWidth className="mt-2 border-0 py-4 pr-3 pl-6">
            <div className="flex w-full items-center justify-between">
              <p className={clsx('text-sm font-normal', contact ? 'text-neutral-600' : 'text-neutral-300')}>
                {contact || '연락처를 입력하세요'}
              </p>
              <RightArrow />
            </div>
          </Button>
        </div>

        <div>
          <p className="text-primary-500 text-lg font-semibold">사장님에게</p>
          <Button onClick={openStoreRequestModal} color="gray" fullWidth className="mt-2 border-0 py-4 pr-3 pl-6">
            <div className="flex w-full flex-col gap-1">
              <div className="flex w-full items-center justify-between">
                <p className="text-sm font-normal text-neutral-600">{request}</p>
                <RightArrow />
              </div>
              <p className="text-start text-sm font-medium text-[#3a903e]">
                {noCutlery ? '수저 · 포크 안받기' : '수저 · 포크 받기'}
              </p>
            </div>
          </Button>
        </div>
        <TossWidget
          widgets={widgets}
          setWidgets={setWidgets}
          setReady={setReady}
          amount={{
            currency: 'KRW',
            value: cart!.total_amount,
          }}
        />
        <Agreement />
        <PaymentAmount
          totalAmount={cart!.total_amount}
          deliveryAmount={isDelivery ? cart!.delivery_fee : null}
          menuAmount={cart!.items_amount}
        />
        <div className="text-center align-middle text-[12px] text-neutral-600">
          위 내용을 확인하였으며 결제에 동의합니다.
        </div>
      </div>
      <Button
        className="mt-2 py-[10px] text-[18px]"
        fullWidth
        state={ready ? 'default' : 'disabled'}
        onClick={() => void pay()}
      >
        {cart!.total_amount.toLocaleString()}원 결제하기
      </Button>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={closeContactModal}
        currentContact={contact}
        onSubmit={(newContact) => setContact(newContact)}
      />

      <StoreRequestModal
        isOpen={isStoreRequestModalOpen}
        onClose={closeStoreRequestModal}
        currentRequest={request}
        currentNoCutlery={noCutlery}
        onSubmit={(newRequest, newNoCutlery) => {
          setRequest(newRequest);
          setNoCutlery(newNoCutlery);
        }}
      />

      <PaymentFailModal
        isOpen={isPaymentFailModalOpen}
        onClose={closePaymentFailModal}
        errorMessage={message || '알 수 없는 오류가 발생했습니다.'}
      />
    </div>
  );
}
