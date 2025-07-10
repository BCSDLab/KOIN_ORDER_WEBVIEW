import { Dispatch, SetStateAction } from 'react';
import CloseIcon from '@/assets/Main/close-icon.svg';
import BottomModal, {
  BottomModalHeader,
  BottomModalContent,
  BottomModalFooter,
} from '@/components/UI/BottomModal/BottomModal';
import Button from '@/components/UI/Button';
import useGetRiderRequest from '@/pages/Delivery/hooks/useGetRiderRequest';

interface RiderRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRequest: string;
  setSelectedRequest: Dispatch<SetStateAction<string>>;
  customInputValue: string;
  setCustomInputValue: Dispatch<SetStateAction<string>>;
  onSubmit: () => void;
}

export default function RiderRequestModal({
  isOpen,
  onClose,
  selectedRequest,
  setSelectedRequest,
  customInputValue,
  setCustomInputValue,
  onSubmit,
}: RiderRequestModalProps) {
  const { data } = useGetRiderRequest();
  const requestList = data.contents.map((item) => item.content);

  const handleSelectRequest = (detail: string) => setSelectedRequest(detail);
  const handleCustomInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomInputValue(e.target.value.trimStart());
  };

  return (
    <BottomModal isOpen={isOpen} onClose={onClose}>
      <BottomModalHeader>
        <div className="text-primary-500 font-semibold">배달기사님에게</div>
        <button onClick={onClose}>
          <CloseIcon />
        </button>
      </BottomModalHeader>

      <BottomModalContent className="px-6">
        <form className="flex w-full flex-col gap-2">
          {requestList.map((detail, index) => (
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
              onChange={handleCustomInput}
              className="h-[3.125rem] rounded-lg border border-neutral-300 bg-white p-2 placeholder-neutral-400 placeholder:text-sm placeholder:font-normal"
            />
          )}
        </form>
        <Button onClick={onSubmit} className="h-[2.875rem] w-full">
          선택하기
        </Button>
      </BottomModalContent>

      <BottomModalFooter />
    </BottomModal>
  );
}
