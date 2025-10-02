import { useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import HomeIcon from '/src/assets/Home/home-icon.svg';
import StoreIcon from '/src/assets/Home/store-icon.svg';
import PaperIcon from '/src/assets/Home/paper-icon.svg';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <div className="fixed right-0 bottom-0 left-0 z-40 flex items-center justify-between bg-white px-12 py-4 text-[12px]">
      <button
        onClick={() => navigate('/home')}
        className={clsx(
          'flex w-[42px] flex-col items-center gap-0.5',
          isActive('/home') ? 'text-primary-500' : 'text-neutral-500',
        )}
      >
        <HomeIcon className={clsx(isActive('/home') ? 'fill-primary-500' : 'fill-neutral-300')} />홈
      </button>

      <button
        onClick={() => navigate('/stores')}
        className={clsx(
          'flex w-[42px] flex-col items-center gap-0.5',
          isActive('/stores') ? 'text-primary-500' : 'text-neutral-500',
        )}
      >
        <StoreIcon className={clsx(isActive('/stores') ? 'fill-primary-500' : 'fill-neutral-300')} />
        주변상점
      </button>

      <button
        onClick={() => navigate('/orders')}
        className={clsx(
          'flex w-[42px] flex-col items-center gap-0.5',
          isActive('/orders') ? 'text-primary-500' : 'text-neutral-500',
        )}
      >
        <PaperIcon className={clsx(isActive('/orders') ? 'fill-primary-500' : 'fill-neutral-300')} />
        주문내역
      </button>
    </div>
  );
}
