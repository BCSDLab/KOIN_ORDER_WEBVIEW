import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRelateSearch } from '@/api/shop';
import { RelatedSearchResponse } from '@/api/shop/entity';
import RelateSearchItem from '@/pages/Home/components/RelateSearchItem';
import useCart from '@/pages/Payment/hooks/useCart';
import Header from '@/pages/Shop/components/Header';
import { useOrderStore } from '@/stores/useOrderStore';
import useEscapeKeyDown from '@/util/hooks/useEscapeKeyDown';
import useParamsHandler from '@/util/hooks/useParamsHandler';
import useClickTouchOutside from '@/util/hooks/useTouchOutside';

interface SearchBarModalProps {
  onClose: () => void;
}

export default function SearchBarModal({ onClose }: SearchBarModalProps) {
  const backgroundRef = React.useRef<HTMLDivElement | null>(null);
  const targetRef = useRef<HTMLInputElement | null>(null);
  const debounceTimeout = useRef<number | null>(null);
  const [relateSearchItems, setRelateSearchItems] = useState<RelatedSearchResponse>();
  const { searchParams, setParams } = useParamsHandler();
  const navigate = useNavigate();
  useClickTouchOutside(backgroundRef, onClose);
  useEscapeKeyDown(onClose);
  const { orderType } = useOrderStore();
  const { data: cartInfo } = useCart(orderType);
  const totalQuantity = cartInfo.items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    targetRef.current?.focus();
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.trim();

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(async () => {
      if (inputValue.length === 0) {
        setRelateSearchItems(undefined);
        return;
      }
      const data = await getRelateSearch({ keyword: inputValue });
      console.log(data);
      setRelateSearchItems(data);
    }, 200);
  }, []);

  const handleSearch = () => {
    const value = targetRef.current?.value ?? '';
    setParams('storeName', value, {
      deleteBeforeParam: searchParams.get('storeName') === undefined,
      replacePage: true,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-[var(--Dim,rgba(0,0,0,0.70))] pt-14">
      <div ref={backgroundRef} className="flex w-[492px] flex-col items-center bg-[#F8F8FA] pt-1 sm:w-full">
        <Header name="검색" targetRef={backgroundRef} cartItemCount={totalQuantity} noImage />

        <div className="mt-1 flex h-10 w-[342px] items-center gap-2 rounded-2xl bg-white px-3 py-2 shadow-[0_1px_1px_0_rgba(0,0,0,0.02),0_2px_4px_0_rgba(0,0,0,0.04)] sm:w-[936px]">
          <button type="button" onClick={handleSearch} className="flex h-6 w-6 items-center justify-center p-1">
            <img src="/src/assets/Main/search-icon-gray.svg" alt="search_icon" />
          </button>
          <input
            ref={targetRef}
            type="text"
            placeholder="검색어를 입력해주세요."
            className="font-['Pretendard'] text-[14px] leading-[160%] font-normal placeholder-[#727272] focus:outline-none"
            defaultValue={searchParams.get('storeName') === undefined ? '' : (searchParams.get('storeName') ?? '')}
            autoComplete="off"
            onChange={handleInputChange}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
        </div>

        <div className="mt-2 mb-2 flex w-full flex-col items-center">
          {relateSearchItems?.shop_name_search_results?.map((item) => (
            <RelateSearchItem
              key={item.orderable_shop_id}
              url={`/shop/${item.orderable_shop_id}`}
              content={item.orderable_shop_name}
              onClick={() => {
                navigate(`/store/${item.orderable_shop_id}`);
                onClose();
              }}
            />
          ))}
          {relateSearchItems?.menu_name_search_results?.slice(0, 5).map((item) => (
            <RelateSearchItem
              key={item.menu_name + item.orderable_shop_id}
              url={null}
              content={`${item.menu_name} | ${item.orderable_shop_name}`}
              onClick={() => {
                onClose();
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
