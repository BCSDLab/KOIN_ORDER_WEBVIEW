import { useState } from 'react';
import clsx from 'clsx';
import ArrowDownIcon from '@/assets/OrderHistory/arrow-down-icon.svg';
import RefreshIcon from '@/assets/OrderHistory/refresh-icon.svg';
import SearchIconGray from '@/assets/OrderHistory/search-icon-gray.svg';
import Button from '@/components/UI/Button';
import useBooleanState from '@/util/hooks/useBooleanState';
import useScrollLock from '@/util/hooks/useScrollLock';

interface FilterProps {
  isScrolled: boolean;
  openFilter: () => void;
  isFiltered: boolean;
  onReset: () => void;
  onSearchConfirm: (keyword: string) => void;
  periodLabel: string;
  orderLabel: string;
  isPeriod: boolean;
  isOrder: boolean;
}

export default function FilteringSearchBar({
  isScrolled = false,
  openFilter,
  isFiltered,
  onReset,
  onSearchConfirm,
  periodLabel,
  orderLabel,
  isPeriod,
  isOrder,
}: FilterProps) {
  const [keyword, setKeyword] = useState('');
  const [isSearchActive, activateSearch, deactivateSearch] = useBooleanState(false);

  useScrollLock(isSearchActive);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearchConfirm(keyword.trim());
      deactivateSearch();
    }
  };

  const handleCancel = () => {
    setKeyword('');
    onSearchConfirm('');
    deactivateSearch();
  };

  return (
    <div
      className={clsx(
        'fixed top-[110px] right-0 left-0 z-120 flex flex-col bg-[#F8F8FA] px-6 pb-[18px]',
        isScrolled ? 'shadow-2' : '',
      )}
    >
      <div className="flex items-center justify-between gap-4 text-[14px] leading-[160%]">
        <div className="shadow-1 my-4 flex flex-1 items-center gap-2 rounded-2xl bg-white px-3 py-2">
          <SearchIconGray />
          <input
            type="text"
            placeholder="주문한 메뉴/매장을 찾아보세요"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={activateSearch}
            className="flex w-full placeholder-neutral-400 focus:outline-none"
          />
        </div>
        {keyword && (
          <button onClick={handleCancel} className="flex font-semibold text-neutral-500">
            취소
          </button>
        )}
      </div>

      {isSearchActive && (
        <button
          className="fixed inset-x-0 top-[232px] bottom-0 z-[110] bg-[rgba(0,0,0,0.70)]"
          onClick={deactivateSearch}
        />
      )}

      {isFiltered ? (
        <div className="flex gap-2 leading-[160%]">
          <Button
            size="sm"
            color="white"
            onClick={onReset}
            endIcon={<RefreshIcon />}
            className="rounded-2xl border-0 px-2 py-[6px] text-[15px]"
          >
            초기화
          </Button>

          <Button
            size="sm"
            color={isPeriod ? 'primary' : 'white'}
            onClick={openFilter}
            endIcon={isPeriod ? <ArrowDownIcon fill="white" /> : <ArrowDownIcon />}
            className="rounded-2xl border-0 px-2 py-[6px] text-[15px]"
          >
            {periodLabel}
          </Button>
          <Button
            size="sm"
            color={isOrder ? 'primary' : 'white'}
            onClick={openFilter}
            endIcon={isOrder ? <ArrowDownIcon fill="white" /> : <ArrowDownIcon />}
            className="rounded-2xl border-0 px-2 py-[6px] text-[15px]"
          >
            {orderLabel}
          </Button>
        </div>
      ) : (
        <div className="flex gap-2 leading-[160%]">
          <Button
            size="sm"
            color="white"
            onClick={openFilter}
            endIcon={<ArrowDownIcon />}
            className="rounded-2xl border-0 px-2 py-[6px] text-[15px]"
          >
            {periodLabel}
          </Button>
          <Button
            size="sm"
            color="white"
            onClick={openFilter}
            endIcon={<ArrowDownIcon />}
            className="rounded-2xl border-0 px-2 py-[6px] text-[15px]"
          >
            {orderLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
