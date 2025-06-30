import useResetCart from '../hooks/useResetCart';
import Button from '@/components/UI/Button';
import Modal, { ModalContent } from '@/components/UI/CenterModal/Modal';

interface ResetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResetModal({ isOpen, onClose }: ResetModalProps) {
  const { mutate: resetCart } = useResetCart();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <div>
          <div>정말로 담았던 메뉴들을</div>
          <div>전체 삭제하시겠어요?</div>
        </div>
        <div className="flex w-full gap-2">
          <Button
            size="lg"
            color="gray"
            className="border-neutral-400 font-medium shadow-none"
            fullWidth
            onClick={onClose}
          >
            아니오
          </Button>
          <Button
            size="lg"
            color="primary"
            className="font-medium shadow-none"
            fullWidth
            onClick={() => {
              resetCart();
              onClose();
            }}
          >
            예
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
}
