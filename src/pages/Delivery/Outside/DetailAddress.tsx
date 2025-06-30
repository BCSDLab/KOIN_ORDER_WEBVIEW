import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useMarker from '../hooks/useMarker';
import useNaverGeocode from '../hooks/useNaverGeocode';
import useNaverMap from '../hooks/useNaverMap';
import CloseIcon from '@/assets/Main/close-icon.svg';
import ArrowDown from '@/assets/Payment/arrow-down-icon.svg';
import ArrowGo from '@/assets/Payment/arrow-go-icon.svg';
import BottomModal, {
  BottomModalContent,
  BottomModalFooter,
  BottomModalHeader,
} from '@/components/UI/BottomModal/BottomModal';
import Button from '@/components/UI/Button';
import Modal, { ModalContent } from '@/components/UI/CenterModal/Modal';
import { useOrderStore } from '@/store/useOrderStore';
import useBooleanState from '@/util/hooks/useBooleanState';

const DetailRequest: string[] = [
  '문 앞에 놔주세요 (벨 눌러주세요)',
  '문 앞에 놔주세요 (노크해주세요)',
  '문 앞에 놔주세요 (벨X, 노크 X)',
  '직접 받을게요',
  '전화주시면 마중 나갈게요',
];

export default function DetailAddress() {
  const { setMainAddress, setDeliveryRequest, setDetailAddress } = useOrderStore();

  const location = useLocation();
  const address = location.state?.address || '';

  const navigate = useNavigate();

  const [isDeliveryBottomModalOpen, openDeliveryBottomModal, closeDeliveryBottomModal] = useBooleanState(false);
  const [isModalOpen, openModal, closeModal] = useBooleanState(false);

  const [selectedRequestInModal, setSelectedRequestInModal] = useState<string>('');
  const [customInputValueInModal, setCustomInputValueInModal] = useState<string>('');

  const [selectedRequest, setSelectedRequest] = useState<string>('');
  const [customInputValue, setCustomInputValue] = useState<string>('');

  const [detailAddressValue, setDetailAddressValue] = useState<string>('');

  const coords = useNaverGeocode(address);
  const map = useNaverMap(...coords);

  useMarker(map);

  const handleSelectRequestInModal = (detail: string) => setSelectedRequestInModal(detail);
  const handleCustomInputInModal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomInputValueInModal(e.target.value.trim());
  };
  const handleDetailAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetailAddressValue(e.target.value.trim());
  };

  const requestLabel = () => {
    if (!selectedRequest) return '상세 요청사항을 입력해주세요.';

    if (selectedRequest === 'customRequest') return customInputValue || '상세 요청사항을 입력해주세요.';

    return selectedRequest;
  };

  const handleSelectRequest = () => {
    closeDeliveryBottomModal();
    setSelectedRequest(selectedRequestInModal);
    setCustomInputValue(customInputValueInModal);
  };

  const DeliveryRequest = () => {
    if (selectedRequest === 'customRequest') return setDeliveryRequest(customInputValue.trim() || '요청사항 없음');

    return setDeliveryRequest(selectedRequest || '요청사항 없음');
  };

  const handleClickSaveAddress = () => {
    if (detailAddressValue.length === 0) return openModal();
    DeliveryRequest();
    setMainAddress(address);
    setDetailAddress(detailAddressValue);
  };

  const backSetAddressPage = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="shadow-1 w-[21.375rem] rounded-xl">
        <div id="map" className="h-40 w-full rounded-t-xl border border-neutral-300"></div>
        <div className="flex h-[3.5rem] w-full items-center justify-between rounded-b-xl bg-white px-6 text-[0.813rem] text-neutral-600">
          {address}
          <button onClick={backSetAddressPage}>
            <ArrowGo />
          </button>
        </div>
      </div>
      <div className="mt-[1.813rem]">
        <div className="text-primary-500 leading-[160%] font-semibold">상세주소</div>
        <div className="pb-3 text-xs leading-[160%]">상세 주소를 입력해주세요</div>
        <input
          className="w-[21.375rem] rounded-sm border border-neutral-300 bg-white px-4 py-3 placeholder-neutral-400 placeholder:text-sm"
          type="text"
          name="DetailAddress"
          placeholder="상세주소를 입력해주세요 (건물명, 동/호수 등)"
          value={detailAddressValue}
          onChange={handleDetailAddress}
        />
      </div>
      <div className="mt-[1.813rem]">
        <div className="text-primary-500 pb-2 font-semibold">배달기사님에게</div>
        <button
          type="button"
          onClick={openDeliveryBottomModal}
          className="flex w-[21.375rem] items-center justify-between rounded-sm border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-400"
        >
          {requestLabel()}
          <div className="pointer-events-none">
            <ArrowDown />
          </div>
        </button>
      </div>
      <Button className="mt-[18.188rem] h-[2.875rem] w-[21.375rem]" onClick={handleClickSaveAddress}>
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
      <BottomModal isOpen={isDeliveryBottomModalOpen} onClose={closeDeliveryBottomModal}>
        <BottomModalHeader>
          <div className="text-primary-500 font-semibold">배달기사님에게</div>
          <button onClick={closeDeliveryBottomModal}>
            <CloseIcon />
          </button>
        </BottomModalHeader>
        <BottomModalContent className="px-6">
          <form className="flex w-full flex-col gap-2">
            {DetailRequest.map((detail, index) => (
              <label
                key={index}
                htmlFor={detail}
                className={`request-label ${selectedRequestInModal === detail && 'request-label-checked'}`}
              >
                <div className="relative h-5 w-5">
                  <input
                    name="request"
                    id={detail}
                    type="radio"
                    checked={selectedRequestInModal === detail}
                    onChange={() => handleSelectRequestInModal(detail)}
                    className="peer border-primary-500 absolute h-5 w-5 appearance-none rounded-full border-2 bg-white"
                  />
                  <div className="bg-primary-500 pointer-events-none absolute inset-1 rounded-full opacity-0 peer-checked:opacity-100" />
                </div>
                <div className="text-base">{detail}</div>
              </label>
            ))}
            <label
              htmlFor="customRequest"
              className="has-[input[type=radio]:checked]:border-primary-500 has-[input[type=radio]:checked]:bg-primary-100 shadow-1 flex h-[3.125rem] items-center gap-2 rounded-lg border border-neutral-300 p-2 has-[input[type=radio]:checked]:border-2"
            >
              <div className="relative h-5 w-5">
                <input
                  name="request"
                  id="customRequest"
                  type="radio"
                  checked={selectedRequestInModal === 'customRequest'}
                  onChange={() => handleSelectRequestInModal('customRequest')}
                  className="peer border-primary-500 absolute h-5 w-5 appearance-none rounded-full border-2 bg-white"
                />
                <div className="bg-primary-500 pointer-events-none absolute inset-1 rounded-full opacity-0 peer-checked:opacity-100" />
              </div>
              <div className="text-base">직접 입력</div>
            </label>
            {selectedRequestInModal === 'customRequest' && (
              <input
                type="text"
                value={customInputValueInModal}
                placeholder="상세 요청사항을 입력해주세요."
                onChange={handleCustomInputInModal}
                className="h-[3.125rem] rounded-lg border border-neutral-300 bg-white p-2 placeholder-neutral-400 placeholder:text-sm placeholder:font-normal"
              />
            )}
          </form>
          <Button onClick={handleSelectRequest} className="h-[2.875rem] w-full">
            선택하기
          </Button>
        </BottomModalContent>
        <BottomModalFooter></BottomModalFooter>
      </BottomModal>
    </div>
  );
}
