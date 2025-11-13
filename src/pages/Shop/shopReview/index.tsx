import { useState } from 'react';
import AverageRating from '../components/AverageRating';
import ReviewList from '../components/ReviewList';
import SortModal from '../components/SortModal';
import DownArowIcon from '@/assets/Home/down-arrow-icon.svg';
import useBooleanState from '@/util/hooks/useBooleanState';

export default function ShopReview() {
  const [showMineOnly, setShowMineOnly] = useState(false);
  const [isSortOpen, openSort, closeSort] = useBooleanState(false);
  const [selectedSort, setSelectedSort] = useState<'LATEST' | 'OLDEST' | 'RATING_DESC' | 'RATING_ASC'>('LATEST');

  const currentSortLabel =
    selectedSort === 'LATEST'
      ? '최신순'
      : selectedSort === 'OLDEST'
        ? '오래된순'
        : selectedSort === 'RATING_DESC'
          ? '평점 높은순'
          : '평점 낮은순';

  return (
    <div className="flex flex-col items-center justify-center px-6">
      <button className="border-primary-500 text-primary-500 mt-[30px] flex w-full items-center justify-center rounded-lg border px-[132.5px] py-[9px] text-[14px]">
        리뷰 작성하기
      </button>
      <div className="mt-3 flex w-full items-center justify-center">
        <AverageRating />
      </div>
      <div className="mt-[18px] flex w-full items-center justify-between text-[14px] text-neutral-500">
        <button type="button" onClick={openSort} className="flex items-center gap-1">
          <span>{currentSortLabel}</span>
          <DownArowIcon fill="#727272" />
        </button>
        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            className="h-5 w-5"
            checked={showMineOnly}
            onChange={(e) => setShowMineOnly(e.target.checked)}
          />
          내가 작성한 리뷰
        </label>
      </div>
      <ReviewList showMineOnly={showMineOnly} sort={selectedSort} />

      <SortModal
        isOpen={isSortOpen}
        onClose={closeSort}
        defaultSort={selectedSort}
        onApply={(sort) => setSelectedSort(sort)}
      />
    </div>
  );
}
