import { useRef, useState } from 'react';
import CloseIcon from '@/assets/Main/close-icon.svg';
import BottomModal, {
  BottomModalContent,
  BottomModalFooter,
  BottomModalHeader,
} from '@/components/UI/BottomModal/BottomModal';
import Button from '@/components/UI/Button';

interface StoreRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRequest: string;
  currentNoCutlery: boolean;
  onSubmit: (request: string, noCutlery: boolean) => void;
}

export default function StoreRequestModal({
  isOpen,
  onClose,
  currentRequest,
  currentNoCutlery,
  onSubmit,
}: StoreRequestModalProps) {
  const [request, setRequest] = useState(currentRequest);
  const [noCutlery, setNoCutlery] = useState(currentNoCutlery);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleButtonClick = () => {
    onSubmit(request, noCutlery);
    onClose();
  };

  const handleChangeRequest = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value.trimStart();
    if (input.length <= 30) {
      setRequest(input);
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
        <div className="flex w-full justify-between">사장님에게</div>
        <button type="button" onClick={onClose} data-testid="storeRequest-modal-close">
          <CloseIcon />
        </button>
      </BottomModalHeader>
      <BottomModalContent className="gap-0">
        <div>
          <textarea
            value={request}
            onChange={handleChangeRequest}
            placeholder="예)매운맛 조금만 해주세요"
            className="w-full resize-none overflow-hidden rounded-xl border border-neutral-300 px-4 py-3 outline-none"
            rows={1}
            ref={textareaRef}
          />

          <div className={`text-right text-[10px] ${request ? 'text-black' : 'text-neutral-400'}`}>
            {request.length}/30
          </div>
        </div>
        <label className="flex items-center gap-3 text-sm font-medium text-neutral-600">
          <input
            type="checkbox"
            checked={noCutlery}
            onChange={() => setNoCutlery((prev) => !prev)}
            className="accent-primary-500 h-4 w-4 rounded"
          />
          일회용 수저, 포크는 빼 주세요
        </label>

        <Button size="lg" onClick={handleButtonClick} className="mt-4 rounded-xl py-2.5 text-lg">
          저장하기
        </Button>
      </BottomModalContent>
      <BottomModalFooter />
    </BottomModal>
  );
}
