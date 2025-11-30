import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import AverageRating from '../components/AverageRating';
import ReviewList from '../components/ReviewList';
import SortModal from '../components/SortModal';
import type { ReviewSorter } from '@/api/shop/entity';
import DownArrowIcon from '@/assets/Home/down-arrow-icon.svg';
import CheckboxFalse from '@/assets/Shop/checkbox-false.svg';
import CheckboxTrue from '@/assets/Shop/checkbox-true.svg';
import LoginRequiredModal from '@/pages/Shop/components/LoginRequiredModal';
import { useGetUnorderableShopDetail } from '@/pages/Shop/hooks/useGetShopDetail';
import useLogger from '@/util/hooks/analytics/useLogger';
import { useScrollLogging } from '@/util/hooks/analytics/useScrollLogging';
import useBooleanState from '@/util/hooks/useBooleanState';
import { setStartLoggingTime } from '@/util/ts/analytics/loggingTime';
import { getCookie } from '@/util/ts/cookie';

const sortOptions: { id: ReviewSorter; label: string }[] = [
  { id: 'LATEST', label: '최신순' },
  { id: 'OLDEST', label: '오래된순' },
  { id: 'HIGHEST_RATING', label: '평점 높은순' },
  { id: 'LOWEST_RATING', label: '평점 낮은순' },
];

export default function ShopReview() {
  const { shopId } = useParams();
  const navigate = useNavigate();
  const logger = useLogger();

  const { data: shopDetail } = useGetUnorderableShopDetail(Number(shopId));
  const shopName = shopDetail.name;

  const [showMineOnly, setShowMineOnly] = useState(false);
  const [isSortModalOpen, openSortModal, closeSortModal] = useBooleanState(false);
  const [loginModalOpen, openLoginModal, closeLoginModal] = useBooleanState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const rawSort = searchParams.get('sort');

  const selectedSort: ReviewSorter =
    rawSort && sortOptions.some((o) => o.id === rawSort) ? (rawSort as ReviewSorter) : 'LATEST';

  const getCurrentSortLabel = () => sortOptions.find((o) => o.id === selectedSort)?.label || '최신순';

  const handleChangeSort = (sort: ReviewSorter) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (sort === 'LATEST') {
          next.delete('sort');
        } else {
          next.set('sort', sort);
        }
        return next;
      },
      { replace: true },
    );
  };

  const handleButtonClick = () => {
    const isLogin = getCookie('AUTH_TOKEN_KEY');
    if (!isLogin) {
      openLoginModal();
      return;
    }

    navigate(`/review/new/${shopId}`);
  };

  const handleCheckboxClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isLogin = getCookie('AUTH_TOKEN_KEY');
    if (!isLogin) {
      openLoginModal();
      return;
    }

    setShowMineOnly(e.target.checked);
  };

  const shopScrollLogging = () => {
    logger.actionEventClick({
      team: 'BUSINESS',
      event_label: 'shop_detail_view_review',
      value: shopName,
      event_category: 'scroll',
    });
  };

  useScrollLogging(shopScrollLogging);

  useEffect(() => {
    if (!shopName) return;

    sessionStorage.setItem('enteredShopName', shopName);
    setStartLoggingTime('enteredShopReview');
  }, [shopName]);

  return (
    <div className="flex flex-col items-center justify-center px-6 pb-10">
      <button
        className="border-primary-500 text-primary-500 mt-[30px] flex w-full items-center justify-center rounded-lg border py-[9px] text-[14px]"
        onClick={handleButtonClick}
      >
        리뷰 작성하기
      </button>
      <div className="mt-3 flex w-full items-center justify-center">
        <AverageRating />
      </div>
      <div className="mt-[18px] flex w-full items-center justify-between text-[14px] text-neutral-500">
        <button type="button" onClick={openSortModal} className="flex items-center gap-1">
          <span>{getCurrentSortLabel()}</span>
          <DownArrowIcon fill="#727272" />
        </button>
        <label className="flex cursor-pointer items-center gap-1">
          <input type="checkbox" className="hidden" checked={showMineOnly} onChange={handleCheckboxClick} />
          {showMineOnly ? <CheckboxTrue className="h-5 w-5" /> : <CheckboxFalse className="h-5 w-5" />}
          <span className="pt-[2px]">내가 작성한 리뷰</span>
        </label>
      </div>
      <ReviewList showMineOnly={showMineOnly} sort={selectedSort} />

      <SortModal
        isOpen={isSortModalOpen}
        onClose={closeSortModal}
        defaultSort={selectedSort}
        onApply={handleChangeSort}
      />

      <LoginRequiredModal
        isOpen={loginModalOpen}
        onClose={closeLoginModal}
        title={`리뷰를 작성하기 위해\n로그인이 필요해요.`}
        subTitle={`리뷰작성은 회원만 사용 가능합니다.`}
      />
    </div>
  );
}
