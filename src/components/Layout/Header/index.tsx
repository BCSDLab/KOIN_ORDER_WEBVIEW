import clsx from 'clsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_TITLES } from './routeTitles';
import ArrowBackIcon from '@/assets/Main/arrow-back-icon.svg';
import ResetModal from '@/pages/Cart/components/ResetModal';
import useBooleanState from '@/util/hooks/useBooleanState';

export default function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [isResetModalOpen, openResetModal, closeResetModal] = useBooleanState(false);

  const backToPreviousPage = () => {
    if (pathname === '/payment') {
      if (window.Android?.navigateBack) {
        window.Android.navigateBack();
      } else {
        window.NativeBridge?.call?.('navigateBack');
      }
    } else {
      navigate(-1);
    }
  };

  const title = ROUTE_TITLES.find((item) => item.match(pathname))?.title ?? '';

  const bgClass = clsx({
    'bg-white': pathname.startsWith('/shop-detail'),
    'bg-[#f8f8fa]': true,
  });

  return (
    <header className={`fixed top-0 right-0 left-0 z-40 flex items-center justify-center ${bgClass} px-6 py-4`}>
      <button
        type="button"
        aria-label="뒤로가기 버튼"
        onClick={backToPreviousPage}
        className="absolute top-1/2 left-6 -translate-y-1/2"
      >
        <ArrowBackIcon />
      </button>
      <span className="font-[Pretendard] text-lg font-medium">{title}</span>
      {pathname === '/cart' && (
        <button
          type="button"
          onClick={openResetModal}
          className="text-primary-500 absolute top-1/2 right-6 -translate-y-1/2 text-sm font-semibold"
        >
          전체삭제
        </button>
      )}
      <ResetModal isOpen={isResetModalOpen} onClose={closeResetModal} />
    </header>
  );
}
