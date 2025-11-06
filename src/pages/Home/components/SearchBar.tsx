import { useNavigate, useSearchParams } from 'react-router-dom';
import SearchIconGray from '@/assets/Main/search-icon-gray.svg';
import { getCategoryNameById } from '@/constants/shopCategories';
import useLogger from '@/util/hooks/analytics/useLogger';

export default function SearchBar() {
  const logger = useLogger();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleSearchBarClick = () => {
    const categoryId = Number(searchParams.get('category')) || undefined;
    const categoryName = getCategoryNameById(categoryId);

    logger.actionEventClick({
      team: 'BUSINESS',
      event_label: 'search_bar_clicked',
      value: `search in ${categoryName}`,
    });
    navigate('/search');
  };
  return (
    <>
      <button
        type="button"
        className={'shadow-1 mt-2 flex h-10 w-full items-center gap-2 rounded-2xl bg-white px-4 py-2'}
        onClick={handleSearchBarClick}
      >
        <SearchIconGray />
        <span className="text-[14px] leading-[160%] text-neutral-500 focus:outline-none">검색어를 입력해주세요.</span>
      </button>
    </>
  );
}
