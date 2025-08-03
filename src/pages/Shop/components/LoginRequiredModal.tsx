import type { AddCartRequest } from '@/api/cart/entity';
import Button from '@/components/UI/Button';
import Modal, { ModalContent } from '@/components/UI/CenterModal/Modal';

interface LoginRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuOptions?: AddCartRequest;
}

export default function LoginRequiredModal({ isOpen, onClose, menuOptions }: LoginRequiredModalProps) {
  const redirectToLogin = () => {
    if (menuOptions) {
      localStorage.setItem('menuOptions', JSON.stringify(menuOptions));
    }
    // 브릿지 추가 예정
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <div className="flex flex-col items-center gap-2 text-center leading-[160%] font-normal">
          <div className="text-lg font-medium">
            코인 주문을 이용하기 위해선 <br />
            로그인이 필요해요.
          </div>
          <div className="text-sm text-neutral-500">
            로그인 후 코인의 주문 기능을 <br />
            이용해보세요!
          </div>
        </div>
        <div className="flex w-full gap-2">
          <Button
            size="lg"
            color="gray"
            className="border-neutral-400 font-medium shadow-none"
            fullWidth
            onClick={onClose}
          >
            닫기
          </Button>
          <Button size="lg" color="primary" className="font-medium shadow-none" fullWidth onClick={redirectToLogin}>
            로그인하기
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
}
