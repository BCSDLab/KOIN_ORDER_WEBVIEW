import React, { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import SearchBox from './SearchBox';
import { getRelateSearch } from '@/api/shop';
import { RelatedSearchResponse } from '@/api/shop/entity';
import Header from '@/components/Layout/Header';
import Portal from '@/components/Portal';
import RelateSearchItem from '@/pages/Home/components/RelateSearchItem';
import useDebouncedCallback from '@/util/hooks/useDebounce';
import useEscapeKeyDown from '@/util/hooks/useEscapeKeyDown';
import useHandleOutside from '@/util/hooks/useHandleOutside';
import useScrollLock from '@/util/hooks/useScrollLock';

interface SearchBarModalProps {
  onClose: () => void;
}

function useModalClose(onClose: () => void) {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDialogElement>(null);
  useScrollLock(true);
  useEscapeKeyDown(onClose);

  useHandleOutside<HTMLDialogElement, HTMLDivElement>({
    containerRef,
    backgroundRef,
    onOutsideClick: (e) => {
      e.preventDefault?.();
      onClose();
    },
  });
  return { backgroundRef, containerRef };
}

function useSearch(delay = 200) {
  const [keyword, setKeyword] = useState('');

  const setDebounced = useDebouncedCallback((value: string) => {
    setKeyword(value.trim());
  }, delay);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDebounced(e.target.value);
  };

  return { keyword, onChange };
}

export default function SearchBarModal({ onClose }: SearchBarModalProps) {
  const { backgroundRef, containerRef } = useModalClose(onClose);
  const navigate = useNavigate();

  const { keyword, onChange } = useSearch(200);

  const { data } = useQuery<RelatedSearchResponse>({
    queryKey: ['relateSearch', keyword],
    queryFn: () => getRelateSearch({ keyword }),
    enabled: keyword.length > 0,
  });

  const relateSearchItems = data;

  return (
    <Portal>
      <div
        ref={backgroundRef}
        className={clsx(
          'fixed inset-0 z-120 flex items-start justify-center pt-14',
          relateSearchItems ? 'bg-[#F8F8FA]' : 'bg-[rgba(0,0,0,0.70)]',
        )}
      >
        <dialog ref={containerRef} open className="m-0 h-auto w-full border-0 bg-transparent p-0 outline-none">
          <Header />
          <div className="flex w-full flex-col items-center bg-[#F8F8FA] pt-1">
            <SearchBox
              mode="input"
              text="검색어를 입력해주세요."
              autoFocus
              onChange={onChange}
              className="text-[14px] leading-[160%] placeholder-neutral-500 focus:outline-none"
            />

            <div className="mt-2 mb-2 flex w-full flex-col items-center">
              {relateSearchItems?.shop_name_search_results?.map((item) => (
                <RelateSearchItem
                  tag="store"
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
                  content={`${item.menu_name} | ${item.orderable_shop_name}`}
                  onClick={() => {
                    navigate(`/shop/true/${item.orderable_shop_id}`);
                    onClose();
                  }}
                />
              ))}
            </div>
          </div>
        </dialog>
      </div>
    </Portal>
  );
}
