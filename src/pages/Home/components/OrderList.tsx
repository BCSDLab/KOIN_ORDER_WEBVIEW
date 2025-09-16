import { useState } from 'react';
import ShopCard from './ShopCard';
import { OrderableShopsResponse } from '@/api/shop/entity';
import CheckIcon from '@/assets/Home/check-icon.svg';
import Delivery from '@/assets/Home/delivery-icon.svg';
import DownArrow from '@/assets/Home/down-arrow-icon.svg';
import FreeIcon from '@/assets/Home/free-icon.svg';
import OpenIcon from '@/assets/Home/open-icon.svg';
import PackIcon from '@/assets/Home/pack-icon.svg';
import PlanetIcon from '@/assets/Home/planet-closed.svg';
import CloseIcon from '@/assets/Main/close-icon.svg';
import { useOrderableShops } from '@/pages/Home/hooks/useOrderableShops.ts';
import { useStoreCategories } from '@/pages/Home/hooks/useStoreCategories.ts';

interface Category {
  id: number;
  name: string;
  image_url: string;
}

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

export default function OrderList() {
  const { data: categories } = useStoreCategories();
  const categoriesWithAll = categories.shop_categories.map((category: Category) => ({
    ...category,
  }));

  const [selectedFilters, setSelectedFilters] = useState<FilterType[]>(['IS_OPEN']);
  const [selectedSort, setSelectedSort] = useState<SortType>('NONE');
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);

  const { data: shops } = useOrderableShops({
    filter: selectedFilters.length > 0 ? selectedFilters : undefined,
    sorter: selectedSort !== 'NONE' ? selectedSort : undefined,
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

  const getCurrentSortLabel = () => {
    return sortOptions.find((option) => option.id === selectedSort)?.label || '기본순';
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <div className="ml-6 flex w-[calc(100%-24px)] snap-x snap-mandatory gap-6 overflow-x-auto pb-4 min-[960px]:ml-0 min-[960px]:snap-none min-[960px]:justify-center [@media(pointer:coarse)]:[-ms-overflow-style:none] [@media(pointer:coarse)]:[scrollbar-width:none] [@media(pointer:coarse)]:[&::-webkit-scrollbar]:hidden [@media(pointer:fine)]:[scrollbar-width:thin] [@media(pointer:fine)]:[&::-webkit-scrollbar]:h-2 [@media(pointer:fine)]:[&::-webkit-scrollbar]:w-2 [@media(pointer:fine)]:[&::-webkit-scrollbar-thumb]:rounded-full [@media(pointer:fine)]:[&::-webkit-scrollbar-thumb]:bg-neutral-300 [@media(pointer:fine)]:[&::-webkit-scrollbar-track]:bg-transparent">
        {categoriesWithAll.map((category) => (
          <button
            key={category.id}
            onClick={() => {}}
            className="flex w-14 shrink-0 snap-start flex-col items-center justify-center gap-1"
            type="button"
          >
            <img src={category.image_url} alt={category.name} className="h-8 w-8" />
            <div className="text-xs">{category.name}</div>
          </button>
        ))}
      </div>

      <div className="flex w-full pr-4 min-[600px]:justify-center">
        <div className="flex w-full min-[600px]:flex-wrap min-[600px]:justify-center min-[600px]:gap-2">
          <button
            onClick={() => setIsSortModalOpen(true)}
            className="mr-4 ml-4 inline-flex shrink-0 items-center justify-center gap-[6px] rounded-3xl border border-solid border-[#b611f5] bg-white px-2 py-[6px] text-[14px] leading-none text-[#b611f5] shadow-[0_1px_1px_0_rgba(0,0,0,0.02),_0_2px_4px_0_rgba(0,0,0,0.04)] min-[600px]:mr-0 min-[600px]:ml-0"
          >
            {getCurrentSortLabel()}
            <DownArrow className="h-4 w-4" fill={'#b611f5'} />
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
                    isSelected ? 'bg-[#b611f5] text-white' : 'bg-white text-gray-400'
                  }`}
                >
                  <IconComponent fill={isSelected ? '#f8f8fa' : '#cacaca'} />
                  {filter.label}
                </button>
              );
            })}

            <button className="flex shrink-0 snap-start items-center justify-center gap-[6px] rounded-3xl bg-white px-2 py-[6px] text-[14px] text-gray-400 shadow-[0_1px_1px_0_rgba(0,0,0,0.02),_0_2px_4px_0_rgba(0,0,0,0.04)]">
              최소주문금액
              <DownArrow className="h-4 w-4" fill={'#cacaca'} />
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
          <div className="col-span-full text-center text-gray-500">
            {shops?.length === 0 ? (
              <div className="flex flex-col items-center">
                <PlanetIcon />
                <div className="text-[18px] text-[#b611f5]">이용 가능한 가게가 없어요</div>
                <div className="text-[14px] text-[#4b4b4b]">조건을 변경하고 다시 검색해주세요</div>
              </div>
            ) : (
              <div className="text-[14px] text-[#4b4b4b]">가게 목록을 불러오는 중입니다.</div>
            )}
          </div>
        )}
      </div>

      {isSortModalOpen && (
        <>
          <button className="fixed inset-0 z-40 bg-black/60" type="button" onClick={() => setIsSortModalOpen(false)} />

          <div className="fixed right-0 bottom-0 left-0 z-50 rounded-4xl bg-white">
            <div className="flex items-center justify-between border-b border-[#e1e1e1] px-8 py-3">
              <h3 className="text-[18px] font-bold text-[#b611f5]">가게 정렬</h3>
              <button onClick={() => setIsSortModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <CloseIcon />
              </button>
            </div>

            <div className="">
              {sortOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSortSelect(option.id)}
                  className={`flex w-full items-center justify-between px-8 pt-4 pb-3 text-left text-[16px] hover:bg-gray-50 ${
                    selectedSort === option.id ? 'text-[#b611f5]' : 'text-gray-700'
                  }`}
                >
                  {option.label}
                  {selectedSort === option.id && <CheckIcon fill="#b611f5" />}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
