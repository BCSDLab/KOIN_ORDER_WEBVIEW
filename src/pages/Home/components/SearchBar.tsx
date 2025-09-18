import SearchBarModal from './SearchBarModal';
import useBooleanState from '@/util/hooks/useBooleanState';
import useParamsHandler from '@/util/hooks/useParamsHandler';

export default function SearchBar() {
  const [isModalOpen, openModal, closeModal] = useBooleanState(false);
  const { searchParams } = useParamsHandler();

  return (
    <>
      <button
        className="mt-1 flex h-10 w-[342px] items-center gap-2 rounded-2xl bg-[#F8F8FA] px-3 py-2 shadow-[0_1px_1px_0_rgba(0,0,0,0.02),0_2px_4px_0_rgba(0,0,0,0.04)] sm:w-[calc(100%-500px)]"
        onClick={openModal}
        type="button"
      >
        <div className="flex h-6 w-6 items-center justify-center p-1">
          <img src="/src/assets/Main/search-icon-gray.svg" alt="search_icon" />
        </div>
        <div className="font-['Pretendard'] text-[14px] leading-[160%] font-normal text-[var(--Neutral-400,#CACACA)]">
          {searchParams.get('storeName') || '검색어를 입력해주세요.'}
        </div>
      </button>
      {isModalOpen && <SearchBarModal onClose={closeModal} />}
    </>
  );
}
