import { useNavigate } from 'react-router-dom';
import type { AddCartRequest } from '@/api/cart/entity';
import Button from '@/components/UI/Button';
import Modal, { ModalContent } from '@/components/UI/CenterModal/Modal';
import { isNative } from '@/util/bridge/bridge';
import { redirectToLogin } from '@/util/bridge/nativeAction';

interface LoginRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuOptions?: AddCartRequest;
  title?: string;
  subTitle?: string;
}

export default function LoginRequiredModal({
  isOpen,
  onClose,
  menuOptions,
  title = ' 코인 주문을 이용하기 위해선\n로그인이 필요해요',
  subTitle = '로그인 후 코인의 주문 기능을\n이용해보세요!',
}: LoginRequiredModalProps) {
  const navigate = useNavigate();

  const getWebLoginUrl = () => {
    const { hostname } = window.location;

    if (hostname === 'localhost') {
      return '/';
    }

    const isStage = import.meta.env.VITE_API_PATH.includes('stage');
    return isStage ? 'https://next.stage.koreatech.in/auth' : 'https://koreatech.in/auth';
  };

  const handleWebLogin = () => {
    const url = getWebLoginUrl();

    if (url.startsWith('http')) {
      window.location.href = url;
    } else {
      navigate(url);
    }
  };

  const handleNativeLogin = () => {
    if (menuOptions) {
      localStorage.setItem('menuOptions', JSON.stringify(menuOptions));
    }
    redirectToLogin();
    onClose();
  };

  const clickLoginButton = () => {
    if (!isNative()) {
      handleWebLogin();
      return;
    }

    handleNativeLogin();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <div className="flex flex-col items-center gap-2 text-center leading-[160%] font-normal">
          <div className="text-lg font-medium whitespace-pre-wrap">{title}</div>
          <div className="text-sm text-neutral-500">{subTitle}</div>
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
          <Button size="lg" color="primary" className="font-medium shadow-none" fullWidth onClick={clickLoginButton}>
            로그인하기
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
}
