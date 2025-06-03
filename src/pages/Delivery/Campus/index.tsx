import { useState } from 'react';
import useMarker from '../hooks/useMarker';
import useNaverMap from '../hooks/useNaverMap';
import CloseIcon from '@/assets/Main/close-icon.svg';
import ArrowDown from '@/assets/Payment/arrow-down-icon.svg';
import ArrowGo from '@/assets/Payment/arrow-go-icon.svg';
import Button from '@/components/UI/Button';
import Modal, { ModalContent, ModalFooter } from '@/components/UI/Modal';
import BottomModal, {
  BottomModalHeader,
  BottomModalContent,
  BottomModalFooter,
} from '@/components/UI/Modal/BottomModal';

const sample: [number, number] = [36.767, 127.284];
const DetailRequest: string[] = [
  '문 앞에 놔주세요 (벨 눌러주세요)',
  '문 앞에 놔주세요 (노크해주세요)',
  '문 앞에 놔주세요 (벨X, 노크 X)',
  '직접 받을게요',
  '전화주시면 마중 나갈게요',
];

export default function Campus() {
  const [bottomModalIsOpen, setBottomModalIsOpen] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const [selectedRequest, setSelectedRequest] = useState<string>('');
  const [customInputValue, setCustomInputValue] = useState<string>('');

  const map = useNaverMap(...sample);
  useMarker(map);

  const requestLabel = () => {
    if (!selectedRequest) {
      return '상세 요청사항을 입력해주세요.';
    }
    if (selectedRequest === 'customRequest') {
      return customInputValue || '상세 요청사항을 입력해주세요.';
    }
    return selectedRequest;
  };

  const handleOpenBottomModal = () => setBottomModalIsOpen(true);
  const handleCloseBottomModal = () => setBottomModalIsOpen(false);

  const handleOpenModal = () => setModalIsOpen(true);
  const handleCloseModal = () => setModalIsOpen(false);

  const handleSelectRequest = (detail: string) => setSelectedRequest(detail);
  const getCustomInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomInputValue(e.target.value.trimStart());
  };

  const handleSubmitRequest = () => handleCloseBottomModal();

  return (
    <div className="flex flex-col items-center">
      <div className="shadow-1 w-[21.375rem] rounded-xl">
        <div id="map" className="h-40 w-full rounded-t-xl border border-neutral-300"></div>
        <div className="flex h-[3.5rem] w-full items-center justify-between rounded-b-xl bg-white px-6 text-[0.813rem] text-neutral-600">
          충남 천안시 동남구 병천면 가전8길 102
          <div>
            <ArrowGo />
          </div>
        </div>
      </div>
      <div className="mt-[1.813rem]">
        <div className="text-primary-500 leading-[160%] font-semibold">배달주소</div>
        <div className="pb-3 text-xs leading-[160%]">배달 받을 위치를 선택해주세요!</div>
        <input
          className="w-[21.375rem] rounded-sm border border-neutral-300 bg-white px-4 py-3 placeholder-neutral-400 placeholder:text-sm"
          type="text"
          name="DetailAddress"
          placeholder="상세주소를 입력해주세요 (건물명, 동/호수 등)"
        />
      </div>
      <div className="mt-[1.813rem]">
        <div className="text-primary-500 pb-2 font-semibold">배달기사님에게</div>
        <button
          type="button"
          onClick={handleOpenBottomModal}
          className="flex w-[21.375rem] items-center justify-between rounded-sm border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-400"
        >
          {requestLabel()}
          <div className="pointer-events-none">
            <ArrowDown />
          </div>
        </button>
      </div>
      <Button className="mt-[18.188rem] h-[2.875rem] w-[21.375rem]" onClick={handleOpenModal}>
        주소 선택
      </Button>
      <Modal isOpen={modalIsOpen} onClose={handleCloseModal}>
        <ModalContent>정확한 상세 주소를 입력해주세요.</ModalContent>
        <ModalFooter>
          <Button onClick={handleCloseModal} className="h-12 w-[16rem]">
            확인
          </Button>
        </ModalFooter>
      </Modal>
      <BottomModal isOpen={bottomModalIsOpen} onClose={handleCloseBottomModal}>
        <BottomModalHeader>
          <div className="text-primary-500 font-semibold">배달기사님에게</div>
          <button onClick={handleCloseBottomModal}>
            <CloseIcon />
          </button>
        </BottomModalHeader>
        <BottomModalContent>
          <form className="flex w-[20.375rem] flex-col gap-2">
            {DetailRequest.map((detail, index) => (
              <label
                key={index}
                htmlFor={detail}
                className={`request-label ${selectedRequest === detail && 'request-label-checked'}`}
              >
                <div className="relative h-5 w-5">
                  <input
                    name="request"
                    id={detail}
                    type="radio"
                    checked={selectedRequest === detail}
                    onChange={() => handleSelectRequest(detail)}
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
                  checked={selectedRequest === 'customRequest'}
                  onChange={() => handleSelectRequest('customRequest')}
                  className="peer border-primary-500 absolute h-5 w-5 appearance-none rounded-full border-2 bg-white"
                />
                <div className="bg-primary-500 pointer-events-none absolute inset-1 rounded-full opacity-0 peer-checked:opacity-100" />
              </div>
              <div className="text-base">직접 입력</div>
            </label>
            {selectedRequest === 'customRequest' && (
              <input
                type="text"
                value={customInputValue}
                placeholder="상세 요청사항을 입력해주세요."
                onChange={getCustomInput}
                className="h-[3.125rem] rounded-lg border border-neutral-300 bg-white p-2 placeholder-neutral-400 placeholder:text-sm placeholder:font-normal"
              />
            )}
          </form>
          <Button onClick={handleSubmitRequest} className="h-[2.875rem] w-[20.375rem]">
            선택하기
          </Button>
        </BottomModalContent>
        <BottomModalFooter></BottomModalFooter>
      </BottomModal>
    </div>
  );
}
