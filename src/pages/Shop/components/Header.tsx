import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@/assets/Main/arrow-back-icon.svg';
// import CartIcon from '@/assets/Shop/cart-icon.svg';
import { backButtonTapped } from '@/util/bridge/nativeAction';

interface HeaderProps {
  name: string;
  targetRef: React.RefObject<HTMLDivElement | null>;
  // cartItemCount: number;
  noImage?: boolean;
}
// export default function Header({ name, targetRef, cartItemCount, noImage }: HeaderProps) {
export default function Header({ name, targetRef, noImage }: HeaderProps) {
  const navigate = useNavigate();
  const [opacity, setOpacity] = useState(0);

  const currentOpacity = noImage ? 1 : opacity;

  const backToPreviousPage = () => {
    // 1. 히스토리 백 시도
    const prevPath = window.location.pathname;
    navigate(-1);

    setTimeout(() => {
      // 2. 만약 위치가 바뀌지 않았다면 네이티브 팝
      if (window.location.pathname === prevPath) {
        backButtonTapped();
      }
    }, 100); // SPA 라우팅 딜레이 고려
  };

  useEffect(() => {
    if (noImage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio;
        const calculatedOpacity = ratio < 0.3 ? 1 - ratio / 0.3 : 0;
        setOpacity(calculatedOpacity);
      },
      {
        threshold: Array.from({ length: 31 }, (_, i) => i / 100),
      },
    );

    const element = targetRef.current;
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const getTransitionColor = (opacity: number) => {
    const value = Math.round(255 * (1 - opacity));
    return `rgb(${value}, ${value}, ${value})`;
  };

  return (
    <header
      className="fixed top-0 right-0 left-0 z-10 flex h-[60px] items-center justify-center px-8"
      style={{
        backgroundColor: `rgba(248, 248, 250, ${currentOpacity})`,
      }}
    >
      <button
        type="button"
        aria-label="뒤로가기 버튼"
        onClick={backToPreviousPage}
        className="absolute top-1/2 left-6 -translate-y-1/2"
      >
        <ArrowBackIcon fill={getTransitionColor(currentOpacity)} />
      </button>
      <span
        className="font-[Pretendard] text-lg font-semibold"
        style={{
          color: `rgba(0, 0, 0, ${currentOpacity})`,
        }}
      >
        {name}
      </span>
      {/* TODO: 배달 배포 시 추가 예정 */}
      {/* <div className="absolute top-1/2 right-6 -translate-y-1/2">
        <button
          type="button"
          aria-label="장바구니 이동"
          onClick={() => navigate('/cart')}
          className="relative flex items-center justify-center"
        >
          <CartIcon fill={getTransitionColor(currentOpacity)} />
          {cartItemCount > 0 && (
            <div className="bg-primary-500 absolute -top-1/2 -right-1/2 flex h-4 w-4 items-center justify-center rounded-full text-[12px] font-medium text-white">
              {cartItemCount}
            </div>
          )}
        </button>
      </div> */}
    </header>
  );
}
