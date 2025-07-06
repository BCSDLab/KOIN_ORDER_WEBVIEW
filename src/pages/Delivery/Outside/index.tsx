import { useState } from 'react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import useRoadNameAddress from '../hooks/useRoadNameAddress';
import { Juso } from '@/api/delivery/entity';
import InfoIcon from '@/assets/Common/info-icon.svg';
import SearchIcon from '@/assets/Common/search-icon.svg';
import BCSDLogoWithMagnifyIcon from '@/assets/Payment/bcsd-logo-with-magnify.svg';
import { useOrderStore } from '@/stores/useOrderStore';

export default function DeliveryOutside() {
  const { setPostAddress } = useOrderStore();

  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [address, setAddress] = useState<Juso | null>(null);

  const { data, refetch, isSuccess, isFetched } = useRoadNameAddress(searchKeyword);

  const roadAddress = address?.road_address;

  const handleAddressSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setSearchKeyword(e.currentTarget.value);
      refetch();
    }
  };

  return (
    <div className="mx-6 mt-4 flex min-h-[calc(100dvh-4.75rem)] flex-col items-center justify-between">
      <div className="w-full">
        <span className="text-primary-500 text-[16px] font-semibold">배달주소</span>
        <div className="shadow-1 my-2 flex h-10 items-center gap-2 rounded-xl border-[1px] border-neutral-400 px-3 py-2">
          <SearchIcon />
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="주소를 입력해주세요."
            onKeyDown={(e) => handleAddressSearch(e)}
            className="w-full focus:border-transparent focus:ring-0 focus:outline-none"
          />
        </div>
        <div className="flex gap-1">
          <InfoIcon />
          <span className="text-[10px] leading-[1.6] text-neutral-500">주소지는 병천으로만 설정 가능해요</span>
        </div>
        {!isSuccess && !isFetched && (
          <div className="mt-4 text-[13px] leading-[1.6] font-normal text-neutral-600">
            <p className="mb-2 text-sm font-medium">이렇게 검색해보세요!</p>
            <ul className="space-y-2">
              <li className="relative pl-4">
                <span className="absolute top-0 left-0 text-neutral-500">•</span>
                <div>
                  <span className="text-neutral-500">도로명 + 건물번호</span>
                  <br />
                  <span className="text-primary-300">예) 가전8길 + 102</span>
                </div>
              </li>
              <li className="relative pl-4">
                <span className="absolute top-0 left-0 text-neutral-500">•</span>
                <div>
                  <span className="text-neutral-500">병천면 + 건물명</span>
                  <br />
                  <span className="text-primary-300">예) 병천면 + 라이프원룸</span>
                </div>
              </li>
            </ul>
          </div>
        )}
        {isSuccess && data && data.addresses.length > 0 && (
          <div className="shadow-1 mt-4 flex flex-col divide-y divide-neutral-300 rounded-xl border-[1px] border-neutral-300">
            {data.addresses.map((address, index) => {
              const isFirst = index === 0;
              const isLast = index === data.addresses.length - 1;

              const className = twMerge(
                clsx('flex flex-col items-start p-4 focus-within:bg-gray-300', {
                  'focus-within:rounded-t-xl': isFirst,
                  'focus-within:rounded-b-xl': isLast,
                }),
              );
              return (
                <button key={address.eng_address} className={className} onClick={() => setAddress(address)}>
                  <div className="text-sm leading-[1.6] font-medium text-neutral-800">
                    {address.bd_nm === '' ? address.road_address : address.bd_nm}
                  </div>
                  <div className="text-[12px] leading-[1.6] font-normal text-neutral-500">{address.road_address}</div>
                </button>
              );
            })}
          </div>
        )}
        {((!isSuccess && isFetched) || (isSuccess && data.addresses.length === 0)) && (
          <div className="mt-20 flex flex-col items-center gap-3">
            <BCSDLogoWithMagnifyIcon />
            <div>
              <div className="text-primary-500 text-lg leading-[1.6] font-semibold">검색결과가 없어요</div>
              <div className="text-sm leading-[1.6] font-medium text-neutral-600">
                검색어를 확인하고 다시 검색해주세요
              </div>
            </div>
          </div>
        )}
      </div>
      <button
        className="bg-primary-500 my-9 h-12 w-full rounded-lg text-[15px] leading-[1.6] font-semibold text-white"
        onClick={() => {
          if (address) {
            setPostAddress({
              zip_number: address.zip_no,
              si_do: address.si_nm,
              si_gun_gu: address.sgg_nm,
              eup_myeon_dong: address.emd_nm,
              road: address.rn,
              building: address.bd_nm,
              detail_address: '',
              full_address: '',
            });
            navigate('/delivery/outside/detail', { state: { roadAddress } });
          }
        }}
      >
        주소 선택
      </button>
    </div>
  );
}
