import Button from '@/components/UI/Button';
import Modal, { ModalContent } from '@/components/UI/CenterModal/Modal';
import useResetCart from '@/pages/Cart/hooks/useResetCart';

interface ResetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResetModal({ isOpen, onClose }: ResetModalProps) {
  const { mutate: resetCart } = useResetCart();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <div className="text-center">
          <div>장바구니에는 같은 가게 메뉴만</div>
          <div>담을 수 있어요.</div>
          <div>담았던 메뉴는 삭제할까요?</div>
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
