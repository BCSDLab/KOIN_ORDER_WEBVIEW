import Button from '@/components/UI/Button';
import Modal, { ModalContent } from '@/components/UI/CenterModal/Modal';

interface NoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export default function NoticeModal({ isOpen, onClose, message }: NoticeModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <div className="mx-11 flex w-full flex-col items-center justify-center gap-6">
          <div className="text-center leading-[1.6] font-medium whitespace-pre-line">{message}</div>
          <Button size="lg" color="primary" className="w-full font-medium shadow-none" onClick={onClose}>
            확인
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
}
