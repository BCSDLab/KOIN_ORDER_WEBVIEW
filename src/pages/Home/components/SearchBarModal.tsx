import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBox from './SearchBox';
import { getRelateSearch } from '@/api/shop';
import { RelatedSearchResponse } from '@/api/shop/entity';
import Header from '@/components/Layout/Header';
import useDebounce from '@/pages/Home/components/hooks/useDebounce';
import RelateSearchItem from '@/pages/Home/components/RelateSearchItem';
import useEscapeKeyDown from '@/util/hooks/useEscapeKeyDown';
import useParamsHandler from '@/util/hooks/useParamsHandler';
import useClickTouchOutside from '@/util/hooks/useTouchOutside';

interface SearchBarModalProps {
  onClose: () => void;
}

export default function SearchBarModal({ onClose }: SearchBarModalProps) {
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef<HTMLInputElement | null>(null);

  const [relateSearchItems, setRelateSearchItems] = useState<RelatedSearchResponse>();
  const { searchParams, setParams } = useParamsHandler();
  const navigate = useNavigate();

  useClickTouchOutside(backgroundRef, onClose);
  useEscapeKeyDown(onClose);

  const doSearch = useCallback(async (raw: string) => {
    const inputValue = raw.trim();

    if (inputValue.length === 0) {
      setRelateSearchItems(undefined);
      return;
    }

    const data = await getRelateSearch({ keyword: inputValue });
    setRelateSearchItems(data);
  }, []);

  const debouncedSearch = useDebounce((...args: readonly unknown[]) => {
    const raw = args[0];
    if (typeof raw !== 'string') return;
    void doSearch(raw);
  }, 200);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      debouncedSearch(e.target.value);
    },
    [debouncedSearch],
  );

  const handleSearch = () => {
    const value = targetRef.current?.value ?? '';
    setParams('storeName', value, {
      deleteBeforeParam: searchParams.get('storeName') === undefined,
      replacePage: true,
    });
    onClose();
  };

  const isResults =
    !!relateSearchItems &&
    ((relateSearchItems.shop_name_search_results?.length ?? 0) > 0 ||
      (relateSearchItems.menu_name_search_results?.length ?? 0) > 0);

  useEffect(() => {
    targetRef.current?.focus();
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-start justify-center pt-14 ${isResults ? '' : 'bg-[rgba(0,0,0,0.70)]'}`}
    >
      <Header />
      <div ref={backgroundRef} className="flex w-full flex-col items-center bg-[#F8F8FA] pt-1">
        <SearchBox
          mode="input"
          inputRef={targetRef}
          text="검색어를 입력해주세요."
          defaultValue={searchParams.get('storeName') ?? ''}
          autoFocus
          onChange={handleInputChange}
          onEnter={handleSearch}
          onSubmit={handleSearch}
        />

        <div className="mt-2 mb-2 flex w-full flex-col items-center">
          {relateSearchItems?.shop_name_search_results?.map((item) => (
            <RelateSearchItem
              tag="store"
              key={item.orderable_shop_id}
              content={item.orderable_shop_name}
              onClick={() => {
                navigate(`/shop/true/${item.orderable_shop_id}`);
                onClose();
              }}
            />
          ))}
          {relateSearchItems?.menu_name_search_results?.slice(0, 5).map((item) => (
            <RelateSearchItem
              tag="menu"
              key={item.menu_name + item.orderable_shop_id}
              content={`${item.menu_name} | ${item.orderable_shop_name}`}
              onClick={() => {
                navigate(`/shop/true/${item.orderable_shop_id}`);
                onClose();
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
