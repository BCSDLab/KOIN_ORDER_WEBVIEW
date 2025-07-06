import Button from '@/components/UI/Button';
import Modal, { ModalContent } from '@/components/UI/CenterModal/Modal';

interface PaymentFailModalProps {
  isOpen: boolean;
  onClose: () => void;
  errorMessage: string;
}
export default function PaymentFailModal({ isOpen, onClose, errorMessage }: PaymentFailModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <div>{errorMessage}</div>
        <Button onClick={onClose} size="lg" fullWidth>
          확인
        </Button>
      </ModalContent>
    </Modal>
  );
}
