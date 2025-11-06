import { useRef, useState } from 'react';
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
  initialValue: string;
  onSubmit: (finalValue: string) => void;
}

export default function RiderRequestModal({ isOpen, onClose, initialValue, onSubmit }: RiderRequestModalProps) {
  const { data } = useGetRiderRequest();
  const requestList = data.contents.map((item) => item.content);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isCustom = !requestList.includes(initialValue);
  const [requestValue, setRequestValue] = useState(initialValue);
  const [isCustomSelected, setIsCustomSelected] = useState(isCustom);

  const handleSelect = (value: string) => {
    setIsCustomSelected(false);
    setRequestValue(value);
  };

  const handleCustomSelect = () => {
    setIsCustomSelected(true);
    setRequestValue('');
  };

  const handleClickButton = () => {
    onSubmit(requestValue);
    onClose();
  };

  const handleChangeRequestValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value.trimStart();
    if (input.length <= 30) {
      setRequestValue(input);
    }

    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  return (
    <BottomModal isOpen={isOpen} onClose={onClose}>
      <BottomModalHeader>
        <div className="text-primary-500 font-semibold">배달기사님에게</div>
        <button type="button" onClick={onClose} data-testid="riderRequest-modal-close">
          <CloseIcon />
        </button>
      </BottomModalHeader>

      <BottomModalContent className="px-6">
        <div className="flex w-full flex-col gap-2">
          {requestList.map((option, idx) => (
            <label
              key={idx}
              className={`request-label ${!isCustomSelected && requestValue === option && 'request-label-checked'}`}
            >
              <div className="relative h-5 w-5">
                <input
                  type="radio"
                  name="request"
                  checked={!isCustomSelected && requestValue === option}
                  onChange={() => handleSelect(option)}
                  className="peer border-primary-500 absolute h-5 w-5 appearance-none rounded-full border-2 bg-white"
                />
                <div className="bg-primary-500 pointer-events-none absolute inset-1 rounded-full opacity-0 peer-checked:opacity-100" />
              </div>
              <div className="text-base">{option}</div>
            </label>
          ))}

          <label
            className={`has-[input[type=radio]:checked]:border-primary-500 has-[input[type=radio]:checked]:bg-primary-100 shadow-1 flex h-[3.125rem] items-center gap-2 rounded-lg border border-neutral-300 p-2 has-[input[type=radio]:checked]:border-2`}
          >
            <div className="relative h-5 w-5">
              <input
                type="radio"
                name="request"
                checked={isCustomSelected}
                onChange={handleCustomSelect}
                className="peer border-primary-500 absolute h-5 w-5 appearance-none rounded-full border-2"
              />
              <div className="bg-primary-500 pointer-events-none absolute inset-1 rounded-full opacity-0 peer-checked:opacity-100" />
            </div>
            <div className="text-base">직접 입력</div>
          </label>

          {isCustomSelected && (
            <div>
              <textarea
                value={requestValue}
                onChange={handleChangeRequestValue}
                placeholder="상세 요청사항을 입력해주세요."
                className="w-full resize-none overflow-hidden rounded-sm border border-neutral-300 px-4 py-3 text-sm placeholder-neutral-400 outline-none placeholder:text-sm"
                rows={1}
                ref={textareaRef}
              />
              <div className={`text-right text-[10px] ${requestValue ? 'text-black' : 'text-neutral-400'}`}>
                {requestValue.length}/30
              </div>
            </div>
          )}
        </div>

        <Button onClick={handleClickButton} className="h-[2.875rem] w-full">
          선택하기
        </Button>
      </BottomModalContent>

      <BottomModalFooter />
    </BottomModal>
  );
}
