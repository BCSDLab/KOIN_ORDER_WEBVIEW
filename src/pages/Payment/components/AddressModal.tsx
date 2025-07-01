import Button from '@/components/UI/Button';
import Modal, { ModalContent } from '@/components/UI/CenterModal/Modal';

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export default function AddressModal({ isOpen, onClose, message }: AddressModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <div className="text-center text-[15px] leading-[160%] text-neutral-600">{message}</div>
        <Button size="lg" fullWidth onClick={onClose}>
          확인
        </Button>
      </ModalContent>
    </Modal>
  );
}
