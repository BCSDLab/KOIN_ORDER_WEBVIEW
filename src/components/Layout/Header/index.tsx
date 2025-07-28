import clsx from 'clsx';
import { useLocation, useNavigate } from 'react-router-dom';
import CartResetButton from './CartResetButton';
import { ROUTE_TITLES } from './routeTitles';
import ArrowBackIcon from '@/assets/Main/arrow-back-icon.svg';
import CloseIcon from '@/assets/Main/close-icon.svg';
import { backButtonTapped } from '@/util/ts/bridge';

export default function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const backToPreviousPage = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      backButtonTapped();
    }
  };

  const title = ROUTE_TITLES.find((item) => item.match(pathname))?.title ?? '';

  const bgClass = clsx({
    'bg-white': pathname.startsWith('/shop-detail') || pathname.startsWith('/result'),
    'bg-[#f8f8fa]': true,
  });

  const layoutClass = pathname.startsWith('/result') ? 'h-15 shadow-4' : 'py-4';

  return (
    <header
      className={clsx('fixed top-0 right-0 left-0 z-40 flex items-center justify-center', bgClass, 'px-6', layoutClass)}
    >
      {pathname.startsWith('/result') ? (
        <button
          type="button"
          aria-label="닫기 버튼"
          onClick={backButtonTapped}
          className="absolute top-1/2 left-6 -translate-y-1/2"
        >
          <CloseIcon />
        </button>
      ) : (
        <button
          type="button"
          aria-label="뒤로가기 버튼"
          onClick={backToPreviousPage}
          className="absolute top-1/2 left-6 -translate-y-1/2"
        >
          <ArrowBackIcon fill="black" />
        </button>
      )}
      <span className="text-lg font-medium">{title}</span>
      {pathname === '/cart' && <CartResetButton />}
    </header>
  );
}
