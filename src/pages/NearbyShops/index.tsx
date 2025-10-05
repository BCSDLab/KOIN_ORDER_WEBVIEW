import { useState } from 'react';
import clsx from 'clsx';
import { ShopInfo } from '@/api/shop/entity';
import CheckIcon from '@/assets/Home/check-icon.svg';
import DownArrowIcon from '@/assets/Home/down-arrow-icon.svg';
import OpenIcon from '@/assets/Home/open-icon.svg';
import PlanetIcon from '@/assets/Home/planet-closed-icon.svg';
import CloseIcon from '@/assets/Main/close-icon.svg';
import Badge from '@/components/UI/Badge';
import BottomModal, {
  BottomModalContent,
  BottomModalFooter,
  BottomModalHeader,
} from '@/components/UI/BottomModal/BottomModal';
import SearchBar from '@/pages/Home/components/SearchBar';
import ShopCard from '@/pages/Home/components/ShopCard';
import { useShopCategories } from '@/pages/Home/hooks/useShopCategories';
import { useShopList } from '@/pages/Home/hooks/useShopList';

interface Category {
  id: number;
  name: string;
  image_url: string;
}

interface SortOption {
  id: SortType;
  label: string;
}

type CategoryType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type SortType = 'NONE' | 'COUNT' | 'COUNT_ASC' | 'COUNT_DESC' | 'RATING' | 'RATING_ASC' | 'RATING_DESC';

const sortOptions: SortOption[] = [
  { id: 'RATING_DESC', label: '별점 높은 순' },
  { id: 'COUNT_DESC', label: '리뷰순' },
  { id: 'NONE', label: '기본순' },
];

export default function NearbyShops() {
  const { data: categories } = useShopCategories();
  const categoriesWithAll = categories.shop_categories.map((category: Category) => ({
    ...category,
  }));

  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(1);
  const [selectedFilters, setSelectedFilters] = useState<string | null>('OPEN');
  const [selectedSort, setSelectedSort] = useState<SortType>('NONE');

  const [isSortModalOpen, setIsSortModalOpen] = useState(false);

  const { data } = useShopList({
    sorter: selectedSort !== 'NONE' ? selectedSort : undefined,
    filter: selectedFilters === 'OPEN' ? selectedFilters : undefined,
    category: selectedCategory,
  });

  const getCurrentSortLabel = () => {
    return sortOptions.find((option) => option.id === selectedSort)?.label || '기본순';
  };

  const handleSortSelect = (sortId: SortType) => {
    setSelectedSort(sortId);
    setIsSortModalOpen(false);
  };

  const toggleFilter = (filterId: string) => {
    setSelectedFilters((prev) => {
      if (prev === filterId) return null;
      else return filterId;
    });
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <div className="w-full px-6">
        <SearchBar />
      </div>

      {/* 카테고리 */}
      <div className="scrollbar-responsive ml-6 flex w-[calc(100%-24px)] snap-x snap-mandatory gap-6 overflow-x-auto pt-2 pb-4 min-[960px]:ml-0 min-[960px]:snap-none min-[960px]:justify-center">
        {categoriesWithAll.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id as CategoryType)}
            className="flex w-14 shrink-0 snap-start flex-col items-center justify-center gap-3"
            type="button"
          >
            <div className="relative flex items-center justify-center">
              <img
                src={category.image_url}
                alt={category.name}
                className={`h-8 w-8 ${selectedCategory === category.id ? 'z-10' : ''}`}
              />
              {selectedCategory === category.id && <div className="absolute h-12 w-12 rounded-full bg-neutral-300" />}
            </div>
            <div className={`relative text-xs ${selectedCategory === category.id ? 'z-10' : ''}`}>{category.name}</div>
          </button>
        ))}
      </div>

      {/* 기본 순 / 영업 중 필터 */}
      <div className="flex w-full pr-4 min-[604px]:justify-center">
        <div className="flex w-full min-[604px]:flex-wrap min-[604px]:justify-center min-[604px]:gap-2">
          <button
            onClick={() => setIsSortModalOpen(true)}
            className="mr-4 ml-4 inline-flex shrink-0 items-center justify-center pb-2 leading-none min-[604px]:mr-0 min-[604px]:ml-0 min-[604px]:pb-0 [@media(pointer:coarse)]:pb-0"
          >
            <Badge
              label={getCurrentSortLabel()}
              color="primary"
              variant="outlined"
              size="sm"
              endIcon={<DownArrowIcon className="fill-primary-500 h-4 w-4" />}
              className="shadow-1"
            />
          </button>

          <div className="scrollbar-responsive flex flex-1 snap-x snap-mandatory gap-2 overflow-x-auto min-[604px]:flex-initial min-[604px]:snap-none min-[604px]:overflow-visible">
            <button
              onClick={() => toggleFilter('OPEN')}
              className="flex shrink-0 snap-start items-center justify-center transition-colors"
            >
              <Badge
                label="영업중"
                color="neutral"
                variant="outlined"
                size="sm"
                startIcon={
                  <OpenIcon className={clsx(selectedFilters === 'OPEN' ? 'fill-[#f8f8fa]' : 'fill-neutral-400')} />
                }
                className={clsx(
                  'shadow-1',
                  selectedFilters === 'OPEN' ? 'bg-primary-500 text-white' : 'bg-white text-neutral-400',
                )}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-25 items-center justify-center text-center">광고배너</div>

      {/* 메뉴 리스트 */}
      <div className="grid w-full grid-cols-1 gap-6 px-6 min-[730px]:grid-cols-2 min-[1050px]:grid-cols-3 min-[1400px]:grid-cols-4">
        {data && data.shops && data.shops.length > 0 ? (
          data.shops.map((shop: ShopInfo) => {
            const formattedImages = shop.images.map((url, index) => ({
              image_url: url,
              is_thumbnail: index === 0, // ShopCard의 img의 타입과 달라서 변환 과정을 추가했습니다.
            }));

            return (
              <ShopCard
                key={shop.id}
                shopId={shop.id}
                isOpen={shop.is_open}
                name={shop.name}
                rating={shop.average_rate}
                reviewCount={shop.review_count}
                img={formattedImages}
              />
            );
          })
        ) : (
          <div className="col-span-full mt-10 flex min-h-[200px] flex-col items-center">
            <PlanetIcon />
            <div className="text-primary-500 mt-4 text-[18px]">이용 가능한 가게가 없어요</div>
            <div className="text-[14px] text-neutral-600">조건을 변경하고 다시 검색해주세요</div>
          </div>
        )}
      </div>

      {/* 정렬 BottomSheet */}
      <BottomModal isOpen={isSortModalOpen} onClose={() => setIsSortModalOpen(false)}>
        <BottomModalHeader>
          <div className="text-primary-500 font-semibold select-none"> 가게 정렬</div>
          <button onClick={() => setIsSortModalOpen(false)}>
            <CloseIcon />
          </button>
        </BottomModalHeader>
        <BottomModalContent>
          <div className="flex flex-col gap-5 select-none">
            {sortOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSortSelect(option.id)}
                className={`flex w-full items-center justify-between text-left text-[16px] hover:bg-gray-50 ${
                  selectedSort === option.id ? 'text-primary-500' : 'text-gray-700'
                }`}
              >
                {option.label}
                {selectedSort === option.id && <CheckIcon className="fill-primary-500" />}
              </button>
            ))}
          </div>
        </BottomModalContent>
        <BottomModalFooter />
      </BottomModal>
    </div>
  );
}
