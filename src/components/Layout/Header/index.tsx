import clsx from 'clsx';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
// import CartCountButton from './components/CartCountButton';
import CartResetButton from './components/CartResetButton';
import { ROUTE_TITLES } from './routeTitles';
import ArrowBackIcon from '@/assets/Main/arrow-back-icon.svg';
import CloseIcon from '@/assets/Main/close-icon.svg';
import { getCategoryNameById } from '@/constants/shopCategories';
import { isAndroid, isNative } from '@/util/bridge/bridge';
import { backButtonTapped } from '@/util/bridge/nativeAction';
import useLogger from '@/util/hooks/analytics/useLogger';
import { getLoggingTime } from '@/util/ts/analytics/loggingTime';

export default function Header() {
  const logger = useLogger();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  const backToPreviousPage = () => {
    if (pathname.startsWith('/review/edit')) {
      window.dispatchEvent(new CustomEvent('openReviewExitModal'));
      return;
    }

    if (pathname === '/shops') {
      const categoryId = Number(searchParams.get('category')) || undefined;
      const categoryName = getCategoryNameById(categoryId);

      if (sessionStorage.getItem('swipeToBack') === 'true') {
        logger.actionEventSwipe({
          team: 'BUSINESS',
          event_label: 'shop_categories_back',
          value: '',
          previous_page: categoryName,
          current_page: '메인',
          duration_time: getLoggingTime('selectedCategoryTime'),
        });
        return;
      }

      logger.actionEventClick({
        team: 'BUSINESS',
        event_label: 'shop_categories_back',
        value: '',
        duration_time: getLoggingTime('selectedCategoryTime'),
        previous_page: categoryName,
        current_page: '메인',
      });
    }

    if (pathname.startsWith('/review')) {
      const shopName = sessionStorage.getItem('enteredShopName') || '';

      if (sessionStorage.getItem('swipeToBack') === 'true') {
        logger.actionEventSwipe({
          team: 'BUSINESS',
          event_label: 'shop_detail_view_review_back',
          value: shopName,
          duration_time: getLoggingTime('enteredShopReview'),
          current_page: '',
          previous_page: '',
        });
        return;
      }

      logger.actionEventClick({
        team: 'BUSINESS',
        event_label: 'shop_detail_view_review_back',
        value: shopName,
        duration_time: getLoggingTime('enteredShopReview'),
        current_page: '',
        previous_page: '',
      });
    }
    if (pathname.startsWith('/payment')) {
      if (isAndroid()) {
        return backButtonTapped();
      }
      return navigate('/cart', { replace: true });
    }

    if (window.history.length > 1) {
      return navigate(-1);
    }

    return backButtonTapped();
  };

  const goToMainPage = () => {
    if (isNative()) {
      backButtonTapped();
    } else {
      navigate('/home', { replace: true });
    }
  };

  const title = ROUTE_TITLES.find((item) => item.match(pathname))?.title ?? '';

  const bgClass = clsx({
    'bg-white': pathname.startsWith('/shop-detail') || pathname.startsWith('/result') || pathname.startsWith('/review'),
    'bg-[#f8f8fa]': true,
  });

  const layoutClass = pathname.startsWith('/result') ? 'h-15 shadow-2' : 'py-4';

  return (
    <header
      className={clsx('fixed top-0 right-0 left-0 z-110 flex items-center justify-center px-6', bgClass, layoutClass)}
    >
      {pathname.startsWith('/result') ? (
        <button
          type="button"
          aria-label="닫기 버튼"
          onClick={goToMainPage}
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
      {/* TODO: 배달 배포 시 사용 */}
      {/* {(pathname === '/home' || pathname === '/orders' || pathname === '/shops') && <CartCountButton />} */}
    </header>
  );
}
