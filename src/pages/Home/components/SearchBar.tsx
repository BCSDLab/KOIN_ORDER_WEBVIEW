import { useNavigate } from 'react-router-dom';
import SearchIconGray from '@/assets/Main/search-icon-gray.svg';

export default function SearchBar() {
  const navigate = useNavigate();

  return (
    <>
      <button
        type="button"
        className={
          'shadow-1 mt-2 flex h-10 w-[342px] items-center gap-2 rounded-2xl bg-white px-3 py-2 max-[341px]:w-full lg:w-[936px]'
        }
        onClick={() => navigate('/search')}
      >
        <SearchIconGray />
        <span className="text-[14px] leading-[160%] text-neutral-500 focus:outline-none">검색어를 입력해주세요.</span>
      </button>
    </>
  );
}
