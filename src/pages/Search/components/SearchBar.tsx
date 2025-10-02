import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import SearchBarModal from './SearchBarModal';
import { getRelateSearch } from '@/api/shop';
import { RelatedSearchResponse } from '@/api/shop/entity';
import SearchIconGray from '@/assets/Main/search-icon-gray.svg';
import useBooleanState from '@/util/hooks/useBooleanState';
import useDebouncedCallback from '@/util/hooks/useDebounce';

export default function SearchBar() {
  const [isModalOpen, openModal, closeModal] = useBooleanState(false);

  const [keyword, setKeyword] = useState('');

  const setDebounced = useDebouncedCallback((value: string) => {
    setKeyword(value.trim());
  }, 200);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDebounced(e.target.value);
  };

  const { data: relatedSearchItems } = useQuery<RelatedSearchResponse>({
    queryKey: ['relateSearch', keyword],
    queryFn: () => getRelateSearch({ keyword }),
    enabled: keyword.length > 0,
  });

  return (
    <>
      <div
        className={
          'shadow-1 mt-2 flex h-10 w-[342px] items-center gap-2 rounded-2xl bg-white px-3 py-2 max-[341px]:w-full lg:w-[936px]'
        }
      >
        <SearchIconGray className="h-6 w-6 shrink-0" />
        <input
          type="text"
          placeholder="검색어를 입력해주세요."
          autoComplete="off"
          onClick={openModal}
          className="w-full text-[14px] leading-[160%] placeholder-neutral-500 focus:outline-none"
          onChange={onChange}
        />
      </div>
      {isModalOpen && <SearchBarModal onClose={closeModal} relatedSearchItems={relatedSearchItems} />}
    </>
  );
}
