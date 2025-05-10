import { useState } from 'react';
import clsx from 'clsx';
import ContactModal from './components/ContactModal/ContactModal';
import StoreRequestModal from './components/StoreRequestModal/StoreRequestModal';
import Bike from '@/assets/Main/agriculture.svg';
import Home from '@/assets/Main/home-icon.svg';
import University from '@/assets/Main/university-icon.svg';
import RightArrow from '@/assets/Payment/arrow-go-icon.svg';
import Badge from '@/components/UI/Badge';
import Button from '@/components/UI/Button';

export default function Payment() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isStoreRequestModalOpen, setIsStoreRequestModalOpen] = useState(false);

  const [contact, setContact] = useState('');
  const [request, setRequest] = useState('');
  const [noCutlery, setNoCutlery] = useState(true);

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
              <Button color="neutral" size="md" endIcon={<Home />} className="text-xs">
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
      </div>

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
