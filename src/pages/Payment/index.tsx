import { useEffect, useState } from 'react';
import { TossPaymentsWidgets } from '@tosspayments/tosspayments-sdk';
import clsx from 'clsx';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Agreement from './components/Agreement';
import ContactModal from './components/ContactModal';
import DeliveryAddressSection from './components/DeliveryAddressSection';
import PaymentAmount from './components/PaymentAmount';
import PaymentFailModal from './components/PaymentFailModal';
import RiderRequestModal from './components/RiderRequestModal';
import ShopLocationMap from './components/ShopLocationMap';
import StoreRequestModal from './components/StoreRequestModal';
import TossWidget from './components/TossWidget';
import useCart from './hooks/useCart';
import useStudentInfo from './hooks/useStudentInfo';
import useTemporaryDelivery from './hooks/useTemporaryDelivery';
import useTemporaryTakeout from './hooks/useTemporaryTakeout';
import PickupIcon from '@/assets/Delivery/bucket.svg';
import Bike from '@/assets/Main/agriculture.svg';
import RightArrow from '@/assets/Payment/arrow-go-icon.svg';
import Badge from '@/components/UI/Badge';
import Button from '@/components/UI/Button';
import { useOrderStore } from '@/stores/useOrderStore';
import useBooleanState from '@/util/hooks/useBooleanState';
import { useToast } from '@/util/hooks/useToast';
import formatPhoneNumber from '@/util/ts/formatPhoneNumber';

export default function Payment() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [searchParams] = useSearchParams();
  const [isContactModalOpen, openContactModal, closeContactModal] = useBooleanState(false);
  const [isStoreRequestModalOpen, openStoreRequestModal, closeStoreRequestModal] = useBooleanState(false);
  const [isRiderRequestModalOpen, openRiderRequestModal, closeRiderRequestModal] = useBooleanState(false);
  const [isPaymentFailModalOpen, openPaymentFailModal, closePaymentFailModal] = useBooleanState(false);

  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null);
  const {
    userPhoneNumber,
    deliveryType,
    outsideAddress,
    campusAddress,
    deliveryRequest,
    ownerRequest,
    isCutleryDeclined,
    setDeliveryRequest,
    setOwnerRequest,
    setIsCutleryDeclined,
    setUserPhoneNumber,
  } = useOrderStore();

  const orderType = searchParams.get('orderType');
  const message = searchParams.get('message');
  const isDelivery = orderType === 'DELIVERY';

  const { data: studentInfo } = useStudentInfo();

  const { data: cart } = useCart(orderType as 'DELIVERY' | 'TAKE_OUT');
  const { mutateAsync: temporaryDelivery } = useTemporaryDelivery();
  const { mutateAsync: temporaryTakeout } = useTemporaryTakeout();

  const orderName =
    cart.items.length === 1 ? cart.items[0].name : `${cart.items[0].name} 외 ${cart.items.length - 1}건`;

  const address = deliveryType === 'CAMPUS' ? campusAddress?.full_address : outsideAddress?.full_address;

  const pay = async () => {
    if (!userPhoneNumber) {
      showToast('연락처를 입력해주세요');
      return;
    }

    if (isDelivery && !address) {
      showToast('배달 주소를 선택해주세요');
      return;
    }

    let order;
    if (isDelivery) {
      order = await temporaryDelivery({
        address: address!,
        phone_number: userPhoneNumber,
        to_owner: ownerRequest,
        to_rider: deliveryRequest,
        total_menu_price: cart.items_amount,
        delivery_tip: cart.delivery_fee,
        total_amount: cart.total_amount,
      });
    } else {
      order = await temporaryTakeout({
        phone_number: userPhoneNumber,
        to_owner: ownerRequest,
        total_menu_price: cart.items_amount,
        total_amount: cart.total_amount,
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

  const handleCloseFailModal = () => {
    closePaymentFailModal();
    searchParams.delete('message');
    navigate(
      {
        pathname: window.location.pathname,
        search: searchParams.toString(),
      },
      { replace: true },
    );
  };

  const handleSubmitOwnerRequest = (newRequest: string, newNoCutlery: boolean) => {
    setOwnerRequest(newRequest);
    setIsCutleryDeclined(newNoCutlery);
    closeStoreRequestModal();
  };

  useEffect(() => {
    if (studentInfo?.phone_number && !userPhoneNumber) {
      setUserPhoneNumber(studentInfo.phone_number);
    }

    if (message) {
      openPaymentFailModal();
    }
  }, [message]);

  return (
    <div className="mx-6 mt-4 mb-6">
      <div className="flex items-center gap-3 text-xl font-semibold">
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
              <p className={clsx('text-sm font-normal', userPhoneNumber ? 'text-neutral-600' : 'text-neutral-300')}>
                {formatPhoneNumber(userPhoneNumber) || '연락처를 입력하세요'}
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
                <p className="text-start text-sm font-normal text-neutral-600">
                  {!!ownerRequest ? ownerRequest : '요청사항 없음'}
                </p>
                <RightArrow />
              </div>
              <p className="text-start text-sm font-medium text-[#3a903e]">
                {isCutleryDeclined ? '수저 · 포크 안받기' : '수저 · 포크 받기'}
              </p>
            </div>
          </Button>
        </div>
        {isDelivery && (
          <div>
            <p className="text-primary-500 text-lg font-semibold">배달기사님에게</p>
            <Button onClick={openRiderRequestModal} color="gray" fullWidth className="mt-2 border-0 py-4 pr-3 pl-6">
              <div className="flex w-full items-center justify-between">
                <p className="text-start text-sm font-normal text-neutral-600">
                  {!!deliveryRequest ? deliveryRequest : '요청사항 없음'}
                </p>
                <RightArrow />
              </div>
            </Button>
          </div>
        )}

        <TossWidget
          widgets={widgets}
          setWidgets={setWidgets}
          setReady={setReady}
          amount={{
            currency: 'KRW',
            value: cart.total_amount,
          }}
        />
        <Agreement />
        <PaymentAmount
          totalAmount={cart.total_amount}
          deliveryAmount={isDelivery ? cart.delivery_fee : null}
          menuAmount={cart.items_amount}
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
        {cart.total_amount.toLocaleString()}원 결제하기
      </Button>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={closeContactModal}
        currentContact={userPhoneNumber}
        onSubmit={(newContact) => setUserPhoneNumber(newContact)}
      />

      <StoreRequestModal
        isOpen={isStoreRequestModalOpen}
        onClose={closeStoreRequestModal}
        currentRequest={ownerRequest}
        currentNoCutlery={isCutleryDeclined}
        onSubmit={(newRequest, newNoCutlery) => {
          handleSubmitOwnerRequest(newRequest, newNoCutlery);
        }}
      />

      <RiderRequestModal
        isOpen={isRiderRequestModalOpen}
        onClose={closeRiderRequestModal}
        initialValue={deliveryRequest}
        onSubmit={(value) => setDeliveryRequest(value)}
      />

      <PaymentFailModal
        isOpen={isPaymentFailModalOpen}
        onClose={handleCloseFailModal}
        errorMessage={message || '알 수 없는 오류가 발생했습니다.'}
      />
    </div>
  );
}
