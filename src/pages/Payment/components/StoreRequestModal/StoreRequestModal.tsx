import { useState } from 'react';
import Button from '@/components/UI/Button';
import BottomModal from '@/components/UI/Modal/BottomModal';

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

  return (
    <BottomModal isOpen={isOpen} onClose={onClose}>
      <BottomModal.Header showCloseButton>
        <div className="flex w-full justify-between">사장님에게</div>
      </BottomModal.Header>
      <BottomModal.Content>
        <input
          type="text"
          value={request}
          onChange={(e) => setRequest(e.target.value)}
          placeholder="예)매운맛 조금만 해주세요"
          className="w-full rounded-xl border border-neutral-300 px-4 py-3"
        />
        <label className="flex items-center gap-3 text-sm font-medium text-neutral-600">
          <input
            type="checkbox"
            checked={noCutlery}
            onChange={() => setNoCutlery((prev) => !prev)}
            className="accent-primary-500 h-4 w-4 rounded"
          />
          일회용 수저, 포크는 빼 주세요
        </label>

        <Button
          size="lg"
          onClick={() => {
            onSubmit(request, noCutlery);
            onClose();
          }}
          className="rounded-xl py-2.5 text-lg"
        >
          변경하기
        </Button>
      </BottomModal.Content>
      <BottomModal.Footer />
    </BottomModal>
  );
}
