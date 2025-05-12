import { useState } from 'react';
import { TossPaymentsWidgets } from '@tosspayments/tosspayments-sdk';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import Agreement from './components/Agreement';
import ContactModal from './components/ContactModal/ContactModal';
import PaymentAmount from './components/PaymentAmount';
import StoreRequestModal from './components/StoreRequestModal/StoreRequestModal';
import TossWidget from './components/TossWidget';
import Bike from '@/assets/Main/agriculture.svg';
import Home from '@/assets/Main/home-icon.svg';
import University from '@/assets/Main/university-icon.svg';
import RightArrow from '@/assets/Payment/arrow-go-icon.svg';
import Badge from '@/components/UI/Badge';
import Button from '@/components/UI/Button';

// 샘플 데이터. 결제 api 연동 시 삭제 예정
const AMOUNT = {
  currency: 'KRW',
  value: 50_000,
};

export default function Payment() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isStoreRequestModalOpen, setIsStoreRequestModalOpen] = useState(false);

  const [contact, setContact] = useState('');
  const [request, setRequest] = useState('');
  const [noCutlery, setNoCutlery] = useState(true);

  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null);

  const navigate = useNavigate();

  const pay = async () => {
    try {
      // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
      // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
      // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
      await widgets!.requestPayment({
        orderId: 'ttA8lVEqE8lDPSKBQwBM7',
        orderName: '토스 티셔츠 외 2건',
        successUrl: window.location.origin + '/success',
        failUrl: window.location.origin + '/fail',
        customerEmail: 'customer123@gmail.com',
        customerName: '김토스',
        customerMobilePhone: '01012341234',
      });
    } catch (error) {
      // 에러 처리하기
      console.error(error);
    }
  };

  return (
    <div className="mx-6 mt-4">
      <div className="flex items-center gap-3 text-xl font-bold">
        <Badge variant="outlined" size="md" color="primaryLight" startIcon={<Bike />} label="배달" />
        맛있는 족발 - 병천점
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <div>
          <p className="text-primary-500 text-lg font-semibold">배달주소</p>
          <p className="text-xs text-neutral-600">배달 받을 위치를 선택해주세요.</p>
          <div className="shadow-1 mt-2 rounded-xl bg-white px-6 py-3">
            <div className="text-primary-500 text-sm font-semibold">어디로 배달할까요?</div>
            <div className="flex items-center justify-between py-4">
              <Button color="primary" size="md" endIcon={<University />} className="text-xs">
                <div>
                  <div>학교에서</div>
                  <div>받을게요!</div>
                </div>
              </Button>
              <Button
                color="neutral"
                size="md"
                endIcon={<Home />}
                className="text-xs"
                onClick={() => void navigate('delivery/outside')}
              >
                <div>
                  <div>밖에서</div>
                  <div>받을게요!</div>
                </div>
              </Button>
            </div>
          </div>
        </div>

        <div>
          <p className="text-primary-500 text-lg font-semibold">연락처</p>
          <Button
            color="gray"
            fullWidth
            onClick={() => setIsContactModalOpen(true)}
            className="mt-2 justify-normal border-0 py-4 pr-3 pl-6"
          >
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
          <Button
            color="gray"
            fullWidth
            onClick={() => setIsStoreRequestModalOpen(true)}
            className="mt-2 justify-normal border-0 py-4 pr-3 pl-6"
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex w-full items-center justify-between">
                <p className="text-sm font-normal text-neutral-600">{request || '요청사항 없음'}</p>
                <RightArrow />
              </div>
              <p className="text-start text-sm font-medium text-[#3a903e]">
                {noCutlery ? '수저 · 포크 안받기' : '수저 · 포크 받기'}
              </p>
            </div>
          </Button>
        </div>
        <TossWidget widgets={widgets} setWidgets={setWidgets} setReady={setReady} amount={AMOUNT} />
        <Agreement />
        <PaymentAmount />
        <div className="text-center align-middle text-[12px] text-neutral-600">
          위 내용을 확인하였으며 결제에 동의합니다.
        </div>
      </div>
      {/* 결제하기 버튼 */}
      <Button
        className="mt-2 py-[10px] text-[18px]"
        fullWidth
        state={ready ? 'default' : 'disabled'}
        onClick={() => void pay()}
      >
        {AMOUNT.value.toLocaleString()}원 결제하기
      </Button>
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        currentContact={contact}
        onSubmit={(newContact) => setContact(newContact)}
      />
      <StoreRequestModal
        isOpen={isStoreRequestModalOpen}
        onClose={() => setIsStoreRequestModalOpen(false)}
        currentRequest={request}
        currentNoCutlery={noCutlery}
        onSubmit={(newRequest, newNoCutlery) => {
          setRequest(newRequest);
          setNoCutlery(newNoCutlery);
        }}
      />
    </div>
  );
}
