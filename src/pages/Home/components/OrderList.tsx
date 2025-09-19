import { useState } from 'react';
import ShopCard from './ShopCard';
import { OrderableShopsResponse } from '@/api/shop/entity';
import CheckIcon from '@/assets/Home/check-icon.svg';
import Delivery from '@/assets/Home/delivery-icon.svg';
import DownArrow from '@/assets/Home/down-arrow-icon.svg';
import FreeIcon from '@/assets/Home/free-icon.svg';
import OpenIcon from '@/assets/Home/open-icon.svg';
import PackIcon from '@/assets/Home/pack-icon.svg';
import PlanetIcon from '@/assets/Home/planet-closed-icon.svg';
import PlanetSliderIcon from '@/assets/Home/planet-icon.svg';
import CloseIcon from '@/assets/Main/close-icon.svg';
import BottomModal, {
  BottomModalContent,
  BottomModalFooter,
  BottomModalHeader,
} from '@/components/UI/BottomModal/BottomModal';
import Button from '@/components/UI/Button';
import { useOrderableShops } from '@/pages/Home/hooks/useOrderableShops.ts';
import { useStoreCategories } from '@/pages/Home/hooks/useStoreCategories.ts';

interface Category {
  id: number;
  name: string;
  image_url: string;
}

type CategoryType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type FilterType = 'IS_OPEN' | 'DELIVERY_AVAILABLE' | 'TAKEOUT_AVAILABLE' | 'FREE_DELIVERY_TIP';
type SortType = 'NONE' | 'COUNT' | 'COUNT_ASC' | 'COUNT_DESC' | 'RATING' | 'RATING_ASC' | 'RATING_DESC';

interface FilterButton {
  id: FilterType;
  label: string;
  icon: React.ComponentType<{ fill?: string; className?: string }>;
}

interface SortOption {
  id: SortType;
  label: string;
}

const filterButtons: FilterButton[] = [
  { id: 'IS_OPEN', label: '영업중', icon: OpenIcon },
  { id: 'DELIVERY_AVAILABLE', label: '배달가능', icon: Delivery },
  { id: 'TAKEOUT_AVAILABLE', label: '포장가능', icon: PackIcon },
  { id: 'FREE_DELIVERY_TIP', label: '배달팁무료', icon: FreeIcon },
];

const sortOptions: SortOption[] = [
  { id: 'RATING_DESC', label: '별점 높은 순' },
  { id: 'COUNT_DESC', label: '리뷰순' },
  { id: 'NONE', label: '기본순' },
];

const ALL_VALUE = 99999;

const MIN_ORDER_OPTIONS = [
  { value: 0, label: '0' },
  { value: 5000, label: '5,000' },
  { value: 10000, label: '10,000' },
  { value: 15000, label: '15,000' },
  { value: 20000, label: '20,000' },
  { value: ALL_VALUE, label: '전체' },
];

export default function OrderList() {
  const { data: categories } = useStoreCategories();
  const categoriesWithAll = categories.shop_categories.map((category: Category) => ({
    ...category,
  }));

  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(1);
  const [selectedFilters, setSelectedFilters] = useState<FilterType[]>(['IS_OPEN']);
  const [selectedSort, setSelectedSort] = useState<SortType>('NONE');

  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  // const [isSortModalOpen, , closeSortBottomModal] = useBooleanState(false);
  const [isMinOrderOpen, setIsMinOrderOpen] = useState(false);

  const [minOrderAmount, setMinOrderAmount] = useState<number | null>(null);
  // 위와 분리한 이유는 완료 버튼을 눌렀을 때만 적용되게 하기 위해
  const [selectedValue, setSelectedValue] = useState<number | null>(ALL_VALUE);

  const isMinOrderSelected = minOrderAmount !== null && minOrderAmount !== 99999;

  const { data: shops } = useOrderableShops({
    filter: selectedFilters.length > 0 ? selectedFilters : undefined,
    sorter: selectedSort !== 'NONE' ? selectedSort : undefined,
    category_filter: selectedCategory !== null ? selectedCategory : undefined,
    minimum_order_amount: isMinOrderSelected ? minOrderAmount : undefined,
  });

  const toggleFilter = (filterId: FilterType) => {
    setSelectedFilters((prev) => {
      if (prev.includes(filterId)) return prev.filter((id) => id !== filterId);
      else return [...prev, filterId];
    });
  };

  const handleSortSelect = (sortId: SortType) => {
    setSelectedSort(sortId);
    setIsSortModalOpen(false);
  };

  const getMinOrderLabel = () => {
    if (minOrderAmount === null || minOrderAmount === 99999) {
      return '최소주문금액';
    }
    return `최소주문금액 ${minOrderAmount.toLocaleString()}원 이하`;
  };

  const getCurrentSortLabel = () => {
    return sortOptions.find((option) => option.id === selectedSort)?.label || '기본순';
  };

  const getSliderPosition = () => {
    if (selectedValue === null) return 100;
    const index = MIN_ORDER_OPTIONS.findIndex((opt) => opt.value === selectedValue);
    return (index / (MIN_ORDER_OPTIONS.length - 1)) * 100;
  };

  const isPointActive = (optionValue: number) => {
    if (selectedValue === null) return optionValue === ALL_VALUE;
    return optionValue <= selectedValue;
  };

  const handleValueSelect = () => {
    setMinOrderAmount(selectedValue);
    setIsMinOrderOpen(false);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <div className="ml-6 flex w-[calc(100%-24px)] snap-x snap-mandatory gap-6 overflow-x-auto pb-4 min-[960px]:ml-0 min-[960px]:snap-none min-[960px]:justify-center [@media(pointer:coarse)]:[-ms-overflow-style:none] [@media(pointer:coarse)]:[scrollbar-width:none] [@media(pointer:coarse)]:[&::-webkit-scrollbar]:hidden [@media(pointer:fine)]:[scrollbar-width:thin] [@media(pointer:fine)]:[&::-webkit-scrollbar]:h-2 [@media(pointer:fine)]:[&::-webkit-scrollbar]:w-2 [@media(pointer:fine)]:[&::-webkit-scrollbar-thumb]:rounded-full [@media(pointer:fine)]:[&::-webkit-scrollbar-thumb]:bg-neutral-300 [@media(pointer:fine)]:[&::-webkit-scrollbar-track]:bg-transparent">
        {categoriesWithAll.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id as CategoryType)}
            className="flex w-14 shrink-0 snap-start flex-col items-center justify-center gap-1"
            type="button"
          >
            <img
              src={category.image_url}
              alt={category.name}
              className={`relative h-8 w-8 ${selectedCategory === category.id ? 'z-10' : ''}`}
            />
            <div className={`text-xs ${selectedCategory === category.id ? 'z-10' : ''}`}>{category.name}</div>
            {selectedCategory === category.id && <div className="absolute h-12 w-12 rounded-full bg-neutral-300" />}
          </button>
        ))}
      </div>

      <div className="flex w-full pr-4 min-[600px]:justify-center">
        <div className="flex w-full min-[600px]:flex-wrap min-[600px]:justify-center min-[600px]:gap-2">
          <button
            onClick={() => setIsSortModalOpen(true)}
            className="border-primary-500 text-primary-500 mr-4 ml-4 inline-flex shrink-0 items-center justify-center gap-[6px] rounded-3xl border border-solid bg-white px-2 py-[6px] text-[14px] leading-none shadow-[0_1px_1px_0_rgba(0,0,0,0.02),_0_2px_4px_0_rgba(0,0,0,0.04)] min-[600px]:mr-0 min-[600px]:ml-0"
          >
            {getCurrentSortLabel()}
            <DownArrow className="fill-primary-500 h-4 w-4" />
          </button>

          <div className="flex flex-1 snap-x snap-mandatory gap-2 overflow-x-auto min-[600px]:flex-initial min-[600px]:snap-none min-[600px]:overflow-visible [@media(pointer:coarse)]:[-ms-overflow-style:none] [@media(pointer:coarse)]:[scrollbar-width:none] [@media(pointer:coarse)]:[&::-webkit-scrollbar]:hidden [@media(pointer:fine)]:[scrollbar-width:thin] [@media(pointer:fine)]:[&::-webkit-scrollbar]:h-2 [@media(pointer:fine)]:[&::-webkit-scrollbar]:w-2 [@media(pointer:fine)]:[&::-webkit-scrollbar-thumb]:rounded-full [@media(pointer:fine)]:[&::-webkit-scrollbar-thumb]:bg-neutral-300 [@media(pointer:fine)]:[&::-webkit-scrollbar-track]:bg-transparent">
            {filterButtons.map((filter) => {
              const isSelected = selectedFilters.includes(filter.id);
              const IconComponent = filter.icon;

              return (
                <button
                  key={filter.id}
                  onClick={() => toggleFilter(filter.id)}
                  className={`flex shrink-0 snap-start items-center justify-center gap-[6px] rounded-3xl px-2 py-[6px] text-[14px] shadow-[0_1px_1px_0_rgba(0,0,0,0.02),_0_2px_4px_0_rgba(0,0,0,0.04)] transition-colors ${
                    isSelected ? 'bg-primary-500 text-white' : 'bg-white text-neutral-400'
                  }`}
                >
                  <IconComponent className={isSelected ? 'fill-[#f8f8fa]' : 'fill-neutral-400'} />
                  {filter.label}
                </button>
              );
            })}

            <button
              onClick={() => setIsMinOrderOpen(true)}
              className={`flex shrink-0 ${isMinOrderSelected ? 'bg-primary-500 text-[#f8f8fA]' : 'bg-white text-neutral-400'} snap-start items-center justify-center gap-[6px] rounded-3xl px-2 py-[6px] text-[14px] text-gray-400 shadow-[0_1px_1px_0_rgba(0,0,0,0.02),_0_2px_4px_0_rgba(0,0,0,0.04)]`}
            >
              {getMinOrderLabel()}
              <DownArrow className={isMinOrderSelected ? 'h-4 w-4 fill-white' : 'h-4 w-4 fill-neutral-400'} />
            </button>
          </div>
        </div>
      </div>

      {shops && shops.length > 0 && <div className="flex h-25 items-center text-center">광고배너</div>}

      <div className="grid grid-cols-1 gap-6 min-[730px]:grid-cols-2 min-[1050px]:grid-cols-3 min-[1400px]:grid-cols-4">
        {shops && shops.length > 0 ? (
          shops.map((shop: OrderableShopsResponse) => {
            return (
              <ShopCard
                key={shop.shop_id}
                shopId={shop.orderable_shop_id}
                isOpen={shop.is_open}
                name={shop.name}
                rating={shop.rating_average}
                reviewCount={shop.review_count}
                deliver={shop.minimum_delivery_tip}
                isTakeout={shop.is_takeout_available}
                isService={shop.service_event}
                img={shop.images}
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
          <div className="text-primary-500 font-semibold"> 가게 정렬</div>
          <button onClick={() => setIsSortModalOpen(false)}>
            <CloseIcon />
          </button>
        </BottomModalHeader>
        <BottomModalContent>
          <div className="flex flex-col gap-5">
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

      {/* 최소 주문 금액 BottomSheet */}
      <BottomModal isOpen={isMinOrderOpen} onClose={() => setIsMinOrderOpen(false)}>
        <BottomModalHeader>
          <div className="text-primary-500 font-semibold"> 최소주문금액</div>
          <button onClick={() => setIsMinOrderOpen(false)}>
            <CloseIcon />
          </button>
        </BottomModalHeader>
        <BottomModalContent>
          <div className="relative mb-9">
            <div className="relative h-2 w-full rounded-full bg-[#E9EBED]">
              <div className="absolute h-2 rounded-full bg-[#C358FC]" style={{ width: `${getSliderPosition()}%` }} />
              <div className="absolute inset-0 flex items-center justify-between">
                {MIN_ORDER_OPTIONS.map((option) => (
                  <button
                    key={option.label}
                    onClick={() => setSelectedValue(option.value)}
                    className="relative flex h-4 w-4 items-center justify-center"
                    type="button"
                  >
                    <div
                      className={`h-1 w-1 rounded-full ${
                        isPointActive(option.value) ? 'bg-[#fff]' : 'border-2 border-neutral-400'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <div
                className="absolute top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                style={{ left: `${getSliderPosition()}%` }}
              >
                <PlanetSliderIcon />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between px-1">
              {MIN_ORDER_OPTIONS.map((option) => (
                <button
                  key={option.label}
                  onClick={() => setSelectedValue(option.value)}
                  className={`text-[14px] ${selectedValue === option.value ? 'text-primary-500 font-bold' : 'text-black'}`}
                  type="button"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <Button onClick={handleValueSelect} className="rounded-xl py-2.5 text-lg">
            완료
          </Button>
        </BottomModalContent>
        <BottomModalFooter />
      </BottomModal>
    </div>
  );
}
