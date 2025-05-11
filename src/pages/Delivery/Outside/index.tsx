import { useRef } from 'react';
import useRoadNameAddress from '../hooks/useRoadNameAddress';
import InfoIcon from '@/assets/Common/info-icon.svg';
import SearchIcon from '@/assets/Common/search-icon.svg';

interface SearchAddress {
  searchInputKeyword: HTMLInputElement | null;
}

export default function DeliveryOutside() {
  const searchRef = useRef<SearchAddress>({
    searchInputKeyword: null,
  });
  const { mutate: searchRoadNameAddress, data, isSuccess, isPending } = useRoadNameAddress();

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const { searchInputKeyword } = searchRef.current;
      const searchKeyword = searchInputKeyword ? searchInputKeyword.value : '';
      searchRoadNameAddress(searchKeyword);
    }
  };
  return (
    <div className="mx-6 mt-4">
      <span className="text-primary-500 text-[16px] font-semibold">배달주소</span>
      <div className="shadow-1 my-2 flex h-10 items-center gap-2 rounded-xl border-[1px] border-neutral-400 px-3 py-2">
        <SearchIcon />
        <input
          ref={(inputRef) => {
            searchRef.current.searchInputKeyword = inputRef;
          }}
          type="text"
          enterKeyHint="search"
          placeholder="주소를 입력해주세요."
          onKeyDown={(e) => handleSubmit(e)}
          className="w-full focus:border-transparent focus:ring-0 focus:outline-none"
        />
      </div>
      <div className="flex gap-1">
        <InfoIcon />
        <span className="text-[10px] leading-[1.6] text-neutral-500">주소지는 병천으로만 설정 가능해요</span>
      </div>
      {!(isPending || isSuccess) && (
        <div className="mt-4 text-[13px] leading-relaxed font-normal text-neutral-600">
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
      {isSuccess && data && data.juso.length > 0 && (
        <div className="shadow-1 mt-4 flex flex-col divide-y divide-neutral-300 rounded-xl border-[1px] border-neutral-300">
          {data.juso.map((address) => (
            <div key={address.bdMgtSn} className="p-4">
              <div className="text-sm leading-[1.6] font-medium text-neutral-800">{address.bdNm}</div>
              <div className="text-[12px] leading-[1.6] font-normal text-neutral-500">{address.roadAddrPart1}</div>
            </div>
          ))}
        </div>
      )}
      {isSuccess && data && data.juso.length === 0 && (
        <div className="mt-4 flex flex-col items-center gap-3">
          <img />
          <div>
            <div className="text-primary-500 text-lg leading-[1.6] font-semibold">검색결과가 없어요</div>
            <div className="text-sm leading-[1.6] font-medium text-neutral-600">
              검색어를 확인하고 다시 검색해주세요
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
