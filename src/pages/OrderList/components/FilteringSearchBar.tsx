import { useState } from 'react';
import clsx from 'clsx';
import ArrowDownIconWhite from '@/assets/OrderHistory/arrow-down-icon-white.svg';
import ArrowDownIcon from '@/assets/OrderHistory/arrow-down-icon.svg';
import RefreshIcon from '@/assets/OrderHistory/refresh-icon.svg';
import SearchIconGray from '@/assets/OrderHistory/search-icon-gray.svg';
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
  const [isFocused, focus, blur] = useBooleanState(false);

  useScrollLock(isFocused);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearchConfirm(keyword.trim());
      blur();
    }
  };

  const handleCancel = () => {
    setKeyword('');
    onSearchConfirm('');
    blur();
  };
  return (
    <div
      className={clsx(
        'fixed top-[110px] right-0 left-0 z-120 flex h-[122px] flex-col bg-[#F8F8FA] px-6',
        isScrolled ? 'shadow-1' : '',
      )}
    >
      <div className="fontfamily-pretendard flex items-center justify-between gap-4 text-[14px] leading-[160%]">
        <div className="shadow-1 my-4 flex flex-1 items-center gap-2 rounded-2xl bg-white px-3 py-2">
          <SearchIconGray />
          <input
            type="text"
            placeholder="주문한 메뉴/매장을 찾아보세요"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={focus}
            className="flex w-full placeholder-neutral-400 focus:outline-none"
          />
        </div>
        {keyword && (
          <button type="button" onClick={handleCancel} className="flex font-semibold text-neutral-500">
            취소
          </button>
        )}
      </div>

      {isFocused && (
        <button className="fixed inset-x-0 top-[232px] bottom-0 z-[110] bg-[rgba(0,0,0,0.70)]" onClick={blur} />
      )}

      {isFiltered ? (
        <>
          <div className="fontfamily-pretendard flex gap-2 text-[14px] leading-[160%] font-semibold text-neutral-500">
            <button
              className="shadow-1 flex items-center gap-[6px] rounded-2xl bg-white px-2 py-[6px]"
              onClick={onReset}
            >
              <span>초기화</span>
              <RefreshIcon />
            </button>
            <button
              onClick={openFilter}
              className={clsx(
                'shadow-1 flex items-center gap-[6px] rounded-2xl px-2 py-[6px]',
                isPeriod ? 'bg-primary-500 text-[#F8F8FA]' : 'bg-white text-neutral-500',
              )}
            >
              <span>{periodLabel}</span>
              {isPeriod ? <ArrowDownIconWhite /> : <ArrowDownIcon />}
            </button>
            <button
              onClick={openFilter}
              className={clsx(
                'shadow-1 flex items-center gap-[6px] rounded-2xl px-2 py-[6px]',
                isOrder ? 'bg-primary-500 text-[#F8F8FA]' : 'bg-white text-neutral-500',
              )}
            >
              <span>{orderLabel}</span>
              {isOrder ? <ArrowDownIconWhite /> : <ArrowDownIcon />}
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="fontfamily-pretendard flex gap-2 text-[14px] leading-[160%] font-semibold text-neutral-500">
            <button
              onClick={openFilter}
              className="shadow-1 flex items-center gap-[6px] rounded-2xl bg-white px-2 py-[6px]"
            >
              {periodLabel}
              <ArrowDownIcon />
            </button>
            <button
              onClick={openFilter}
              className="shadow-1 flex items-center gap-[6px] rounded-2xl bg-white px-2 py-[6px]"
            >
              {orderLabel}
              <ArrowDownIcon />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
