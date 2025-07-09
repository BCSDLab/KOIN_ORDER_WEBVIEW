import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RiderRequestModal from '../components/RiderRequestModal';
import AddressTypeDropdown from './AddressTypeDropdown';
import { AddressCategory } from '@/api/delivery/entity';
import Building from '@/assets/Delivery/building.svg';
import NightShelter from '@/assets/Delivery/night-shelter.svg';
import ArrowDown from '@/assets/Payment/arrow-down-icon.svg';
import Badge from '@/components/UI/Badge';
import Button from '@/components/UI/Button';
import useMarker from '@/pages/Delivery/hooks/useMarker';
import useNaverMap from '@/pages/Delivery/hooks/useNaverMap';
import { useOrderStore } from '@/stores/useOrderStore';
import useBooleanState from '@/util/hooks/useBooleanState';

interface Place {
  id: number;
  full_address: string;
  short_address: string;
  latitude: number;
  longitude: number;
}

const DEFAULT_PLACE: Place = {
  id: 5,
  full_address: '충남 천안시 동남구 병천면 충절로 1600 한국기술교육대학교 제1캠퍼스 생활관 105동',
  short_address: '105동(함지)',
  latitude: 36.76202833,
  longitude: 127.28281109,
};

const getTrimmedRequestMessage = (selectedRequest: string, customInputValue: string): string => {
  const isCustom = selectedRequest === 'customRequest';
  const trimmed = customInputValue.trim();
  return isCustom && trimmed !== '' ? trimmed : !isCustom && selectedRequest !== '' ? selectedRequest : '요청사항 없음';
};

export default function Campus() {
  const navigate = useNavigate();
  const [bottomModalIsOpen, openBottomModal, closeBottomModal] = useBooleanState(false);
  const [selectedRequest, setSelectedRequest] = useState('');
  const [customInputValue, setCustomInputValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<AddressCategory | null>(null);

  const { campusAddress, setDeliveryRequest, setCampusAddress, setDeliveryType } = useOrderStore();

  const initialPlace: Place = campusAddress
    ? {
        id: campusAddress.id,
        full_address: campusAddress.full_address,
        short_address: campusAddress.short_address,
      }
    : DEFAULT_PLACE;

  const [selectedPlace, setSelectedPlace] = useState<Place>(initialPlace);

  const addressState = {
    selectedCategory,
    setSelectedCategory,
    selectedPlace,
    setSelectedPlace,
  };

  const map = useNaverMap(selectedPlace.latitude, selectedPlace.longitude);
  useMarker(map);

  const requestMessage = getTrimmedRequestMessage(selectedRequest, customInputValue);

  const handleSubmitRequest = () => {
    setDeliveryRequest(requestMessage);
    closeBottomModal();
  };

  const handleSelectAddress = () => {
    if (!selectedPlace) return;

    setDeliveryRequest(requestMessage);
    setDeliveryType('CAMPUS');
    setCampusAddress({
      id: selectedPlace.id,
      full_address: selectedPlace.full_address,
      short_address: selectedPlace.short_address,
    });

    navigate('/payment?orderType=DELIVERY');
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full flex-col items-center px-[1.5rem]">
      <div className="shadow-1 w-full rounded-xl">
        <div id="map" className="h-40 w-full rounded-t-xl border border-neutral-300"></div>
        <div className="flex h-[3.5rem] w-full items-center justify-between rounded-b-xl bg-white px-6 text-[0.813rem] text-neutral-600">
          {selectedPlace ? (
            <div className="flex w-full items-center justify-center gap-2">
              <Badge label={selectedPlace.short_address} color="primary" size="sm" className="text-sm" />
              <span>앞으로 배달돼요!</span>
            </div>
          ) : (
            <span>배달 받을 위치를 선택해주세요!</span>
          )}
        </div>
      </div>

      <div className="mt-[1.813rem] w-full">
        <div className="text-primary-500 leading-[160%] font-semibold">배달주소</div>
        <div className="pb-3 text-xs leading-[160%]">배달 받을 위치를 선택해주세요!</div>
        <div className="flex flex-col gap-3">
          <AddressTypeDropdown type="DORMITORY" icon={<NightShelter />} addressState={addressState} />
          <AddressTypeDropdown type="COLLEGE_BUILDING" icon={<Building />} addressState={addressState} />
          <AddressTypeDropdown type="ETC" icon={<Building />} addressState={addressState} />
        </div>
      </div>

      <div className="my-[1.813rem] w-full">
        <div className="text-primary-500 pb-2 font-semibold">배달기사님에게</div>
        <button
          type="button"
          onClick={openBottomModal}
          className={`flex w-full items-center justify-between rounded-sm border border-neutral-300 bg-white px-4 py-3 text-sm ${
            requestMessage === '요청사항 없음' ? 'text-neutral-400' : 'text-black'
          }`}
        >
          {requestMessage === '요청사항 없음' ? '상세 요청사항을 입력해주세요.' : requestMessage}
          <div className="pointer-events-none">
            <ArrowDown />
          </div>
        </button>
      </div>

      <Button className="mt-auto h-[2.875rem] w-full" onClick={handleSelectAddress}>
        주소 선택
      </Button>

      <RiderRequestModal
        isOpen={bottomModalIsOpen}
        onClose={closeBottomModal}
        selectedRequest={selectedRequest}
        setSelectedRequest={setSelectedRequest}
        customInputValue={customInputValue}
        setCustomInputValue={setCustomInputValue}
        onSubmit={handleSubmitRequest}
      />
    </div>
  );
}
