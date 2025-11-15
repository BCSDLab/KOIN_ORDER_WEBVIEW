import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AverageRating from '../components/AverageRating';
import ReviewList from '../components/ReviewList';
import SortModal, { type SortType } from '../components/SortModal';
import DownArrowIcon from '@/assets/Home/down-arrow-icon.svg';
import CheckboxFalse from '@/assets/Shop/checkbox-false.svg';
import CheckboxTrue from '@/assets/Shop/checkbox-true.svg';
import useBooleanState from '@/util/hooks/useBooleanState';

const sortOptions: { id: SortType; label: string }[] = [
  { id: 'LATEST', label: '최신순' },
  { id: 'OLDEST', label: '오래된순' },
  { id: 'RATING_DESC', label: '평점 높은순' },
  { id: 'RATING_ASC', label: '평점 낮은순' },
];

export default function ShopReview() {
  const [showMineOnly, setShowMineOnly] = useState(false);
  const [isSortModalOpen, openSortModal, closeSortModal] = useBooleanState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const rawSort = searchParams.get('sort');

  const selectedSort: SortType =
    rawSort && sortOptions.some((o) => o.id === rawSort) ? (rawSort as SortType) : 'LATEST';

  const getCurrentSortLabel = () => sortOptions.find((o) => o.id === selectedSort)?.label || '최신순';

  const handleChangeSort = (sort: SortType) => {
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

  return (
    <div className="flex flex-col items-center justify-center px-6 pb-10">
      <button className="border-primary-500 text-primary-500 mt-[30px] flex w-full items-center justify-center rounded-lg border py-[9px] text-[14px]">
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
          <input
            type="checkbox"
            className="hidden"
            checked={showMineOnly}
            onChange={(e) => setShowMineOnly(e.target.checked)}
          />
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
    </div>
  );
}
