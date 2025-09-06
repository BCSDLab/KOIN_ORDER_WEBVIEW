import { useState } from 'react';
import clsx from 'clsx';
import { Link, useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import useDeliveryInfo from '../hooks/useDeliveryInfo';
import AddressModal from './AddressModal';
import Home from '@/assets/Main/home-icon.svg';
import University from '@/assets/Main/university-icon.svg';
import RightArrow from '@/assets/Payment/arrow-go-icon.svg';
import Badge from '@/components/UI/Badge';
import Button from '@/components/UI/Button';
import { useOrderStore } from '@/stores/useOrderStore';
import useBooleanState from '@/util/hooks/useBooleanState';

interface DeliveryAddressSectionProps {
  orderableShopId: number;
}

export default function DeliveryAddressSection({ orderableShopId }: DeliveryAddressSectionProps) {
  const navigate = useNavigate();
  const { data: deliveryInfo } = useDeliveryInfo(orderableShopId);

  const [isAddressModalOpen, openAddressModal, closeAddressModal] = useBooleanState(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const { deliveryType, outsideAddress, campusAddress } = useOrderStore();

  const existingAddress = deliveryType === 'CAMPUS' ? !!campusAddress?.full_address : outsideAddress.address !== '';

  const handleOutsideClick = () => {
    if (!deliveryInfo?.off_campus_delivery) {
      setModalMessage('이 상점은 교내만 배달 가능해요');
      openAddressModal();
      return;
    }
    navigate('/delivery/outside');
  };

  const handleCampusClick = () => {
    if (!deliveryInfo?.campus_delivery) {
      setModalMessage('이 상점은 교외만 배달 가능해요');
      openAddressModal();
      return;
    }
    navigate('/delivery/campus');
  };

  return (
    <div>
      <div className={existingAddress ? 'flex items-center justify-between' : ''}>
        <p className="text-primary-500 text-lg font-semibold">배달주소</p>
        {existingAddress ? (
          (deliveryType === 'CAMPUS' && deliveryInfo?.off_campus_delivery) ||
          (deliveryType === 'OUTSIDE' && deliveryInfo?.campus_delivery) ? (
            <Link
              to={`/delivery/${deliveryType === 'CAMPUS' ? 'OUTSIDE' : 'CAMPUS'}`}
              className="text-xs text-neutral-500 underline"
            >
              {deliveryType === 'CAMPUS' ? '교외 주소를 원하시나요?' : '교내 주소를 원하시나요?'}
            </Link>
          ) : null
        ) : (
          <p className="text-xs text-neutral-600">배달 받을 위치를 선택해주세요.</p>
        )}
      </div>

      <div className={twMerge(clsx('shadow-1 mt-2 rounded-xl bg-white px-6 py-3', existingAddress && 'py-4 pr-3'))}>
        {existingAddress ? (
          <div>
            <Button
              color="gray"
              fullWidth
              className="border-0 p-0 shadow-none"
              onClick={() => navigate(`/delivery/${deliveryType === 'CAMPUS' ? 'CAMPUS' : 'OUTSIDE'}`)}
            >
              <div className="flex w-full items-center justify-between text-left">
                {deliveryType === 'CAMPUS' ? (
                  <Badge color="primary" size="lg" className="box-border py-1" label={campusAddress?.short_address} />
                ) : (
                  <span className="max-w-3xs text-xs font-normal text-neutral-600">{outsideAddress?.address}</span>
                )}
                <RightArrow />
              </div>
            </Button>
          </div>
        ) : (
          <>
            <div className="text-primary-500 text-sm font-semibold">어디로 배달할까요?</div>
            <div className="flex items-center gap-5 py-4">
              <Button
                color="primary"
                size="md"
                endIcon={<University />}
                className="text-xs max-[390px]:px-5"
                onClick={handleCampusClick}
                fullWidth
              >
                <div className="leading-[160%]">
                  <div>학교에서</div>
                  <div>받을게요!</div>
                </div>
              </Button>

              <Button
                color="neutral"
                size="md"
                endIcon={<Home />}
                className="text-xs max-[390px]:px-5"
                onClick={handleOutsideClick}
                fullWidth
              >
                <div className="leading-[160%]">
                  <div>밖에서</div>
                  <div>받을게요!</div>
                </div>
              </Button>
            </div>
          </>
        )}
      </div>
      <AddressModal isOpen={isAddressModalOpen} onClose={closeAddressModal} message={modalMessage} />
    </div>
  );
}
