import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RiderRequestModal from '../components/RiderRequestModal';
import ArrowDown from '@/assets/Payment/arrow-down-icon.svg';
import ArrowGo from '@/assets/Payment/arrow-go-icon.svg';
import Button from '@/components/UI/Button';
import Modal, { ModalContent } from '@/components/UI/CenterModal/Modal';
import useMarker from '@/pages/Delivery/hooks/useMarker';
import useNaverGeocode from '@/pages/Delivery/hooks/useNaverGeocode';
import useNaverMap from '@/pages/Delivery/hooks/useNaverMap';
import useUserDeliveryAddress from '@/pages/Delivery/hooks/useUserDeliveryAddress';
import { useOrderStore } from '@/stores/useOrderStore';
import useBooleanState from '@/util/hooks/useBooleanState';

const getTrimmedRequestMessage = (selectedRequest: string, customInputValue: string): string => {
  const isCustom = selectedRequest === 'customRequest';
  const trimmed = customInputValue.trim();
  return isCustom && trimmed !== '' ? trimmed : !isCustom && selectedRequest !== '' ? selectedRequest : '요청사항 없음';
};

export default function DetailAddress() {
  const navigate = useNavigate();
  const location = useLocation();
  const address = location.state?.roadAddress || '';

  const [isRequestModalOpen, openRequestModal, closeRequestModal] = useBooleanState(false);
  const [isModalOpen, openModal, closeModal] = useBooleanState(false);

  const [selectedRequest, setSelectedRequest] = useState<string>('');
  const [customInputValue, setCustomInputValue] = useState<string>('');
  const [detailAddressValue, setDetailAddressValue] = useState<string>('');

  const { mutate } = useUserDeliveryAddress();
  const { outsideAddress, setDeliveryRequest, setOutsideAddress, setDeliveryType } = useOrderStore();

  const coords = useNaverGeocode(address);
  const map = useNaverMap(...coords);
  useMarker(map);

  const requestMessage = getTrimmedRequestMessage(selectedRequest, customInputValue);

  const handleDetailAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetailAddressValue(e.target.value.trim());
  };

  const handleSubmitRequest = () => {
    setDeliveryRequest(requestMessage);
    closeRequestModal();
  };

  const DeliveryRequest = () => {
    if (selectedRequest === 'customRequest') return setDeliveryRequest(customInputValue.trim() || '요청사항 없음');

    return setDeliveryRequest(selectedRequest || '요청사항 없음');
  };

  const handleClickSaveAddress = () => {
    if (detailAddressValue.length === 0) return openModal();

    DeliveryRequest();

    const updatedOutsideAddress = {
      ...outsideAddress,
      detail_address: detailAddressValue,
      full_address: `${address} ${detailAddressValue}`,
    };

    setOutsideAddress(updatedOutsideAddress);
    setDeliveryType('OUTSIDE');
    navigate('/payment?orderType=DELIVERY');
    mutate(updatedOutsideAddress);
  };

  const backSetAddressPage = () => {
    navigate(-1);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col items-center px-[1.5rem]">
      <div className="shadow-1 w-full rounded-xl">
        <div id="map" className="h-40 w-full rounded-t-xl border border-neutral-300"></div>
        <div className="flex h-[3.5rem] w-full items-center justify-between rounded-b-xl bg-white px-6 text-[0.813rem] text-neutral-600">
          {address}
          <button onClick={backSetAddressPage}>
            <ArrowGo />
          </button>
        </div>
      </div>
      <div className="mt-[1.813rem] w-full">
        <div className="text-primary-500 leading-[160%] font-semibold">상세주소</div>
        <div className="pb-3 text-xs leading-[160%]">상세 주소를 입력해주세요</div>
        <input
          className="w-full rounded-sm border border-neutral-300 bg-white px-4 py-3 placeholder-neutral-400 placeholder:text-sm"
          type="text"
          name="DetailAddress"
          placeholder="상세주소를 입력해주세요 (건물명, 동/호수 등)"
          value={detailAddressValue}
          onChange={handleDetailAddress}
        />
      </div>
      <div className="my-[1.813rem] w-full">
        <div className="text-primary-500 pb-2 font-semibold">배달기사님에게</div>
        <button
          type="button"
          onClick={openRequestModal}
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
      <Button className="mt-auto h-[2.875rem]" fullWidth onClick={handleClickSaveAddress}>
        주소 선택
      </Button>

      <RiderRequestModal
        isOpen={isRequestModalOpen}
        onClose={closeRequestModal}
        selectedRequest={selectedRequest}
        setSelectedRequest={setSelectedRequest}
        customInputValue={customInputValue}
        setCustomInputValue={setCustomInputValue}
        onSubmit={handleSubmitRequest}
      />

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalContent>
          정확한 상세 주소를 입력해주세요.
          <Button onClick={closeModal} className="h-12 w-[16rem]">
            확인
          </Button>
        </ModalContent>
      </Modal>
    </div>
  );
}
