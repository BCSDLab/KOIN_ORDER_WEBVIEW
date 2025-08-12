import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowGo from '@/assets/Payment/arrow-go-icon.svg';
import Button from '@/components/UI/Button';
import Modal, { ModalContent } from '@/components/UI/CenterModal/Modal';
import useMarker from '@/pages/Delivery/hooks/useMarker';
import useNaverGeocode from '@/pages/Delivery/hooks/useNaverGeocode';
import useNaverMap from '@/pages/Delivery/hooks/useNaverMap';
import useUserDeliveryAddress from '@/pages/Delivery/hooks/useUserDeliveryAddress';
import { useOrderStore } from '@/stores/useOrderStore';
import useBooleanState from '@/util/hooks/useBooleanState';

export default function DetailAddress() {
  const navigate = useNavigate();
  const location = useLocation();
  const address = location.state?.roadAddress || '';

  const [isModalOpen, openModal, closeModal] = useBooleanState(false);
  const [detailAddressValue, setDetailAddressValue] = useState<string>('');

  const { mutate } = useUserDeliveryAddress();
  const { outsideAddress, setOutsideAddress, setDeliveryType } = useOrderStore();

  const coords = useNaverGeocode(address);
  const map = useNaverMap(...coords);
  useMarker(map);

  const handleDetailAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetailAddressValue(e.target.value);
  };

  const handleClickSaveAddress = () => {
    if (detailAddressValue.length === 0) return openModal();

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
          className="w-full rounded-sm border border-neutral-300 bg-white px-4 py-3 placeholder-neutral-400 outline-none placeholder:text-sm"
          type="text"
          name="DetailAddress"
          placeholder="상세주소를 입력해주세요 (건물명, 동/호수 등)"
          value={detailAddressValue}
          onChange={handleDetailAddress}
        />
      </div>

      <Button className="mt-auto mb-5 h-[2.875rem]" fullWidth onClick={handleClickSaveAddress}>
        주소 선택
      </Button>

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
