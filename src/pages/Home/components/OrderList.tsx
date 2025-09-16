import { useState } from 'react';
import MenuCard from './MenuCard';
import Delivery from '@/assets/Home/delivery-icon.svg';
import DownArrow from '@/assets/Home/down-arrow-icon.svg';
import FreeIcon from '@/assets/Home/free-icon.svg';
import OpenIcon from '@/assets/Home/open-icon.svg';
import PackIcon from '@/assets/Home/pack-icon.svg';
import { useStoreCategories } from '@/pages/Home/hooks/useStoreCategories.ts';

interface Category {
  id: number;
  name: string;
  image_url: string;
}

type FilterType = 'IS_OPEN' | 'DELIVERY_AVAILABLE' | 'TAKEOUT_AVAILABLE' | 'FREE_DELIVERY_TIP';

interface FilterButton {
  id: FilterType;
  label: string;
  icon: React.ComponentType<{ fill?: string; className?: string }>;
}

const filterButtons: FilterButton[] = [
  { id: 'IS_OPEN', label: '영업중', icon: OpenIcon },
  { id: 'DELIVERY_AVAILABLE', label: '배달가능', icon: Delivery },
  { id: 'TAKEOUT_AVAILABLE', label: '포장가능', icon: PackIcon },
  { id: 'FREE_DELIVERY_TIP', label: '배달팁무료', icon: FreeIcon },
];

export default function OrderList() {
  const { data: categories } = useStoreCategories();
  const categoriesWithAll = categories.shop_categories.map((category: Category) => ({
    ...category,
  }));

  const [selectedFilters, setSelectedFilters] = useState<FilterType[]>(['IS_OPEN']);

  const toggleFilter = (filterId: FilterType) => {
    setSelectedFilters((prev) => {
      if (prev.includes(filterId)) return prev.filter((id) => id !== filterId);
      else return [...prev, filterId];
    });
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
          <button className="mr-4 ml-4 inline-flex shrink-0 items-center justify-center gap-[6px] rounded-3xl border border-solid border-[#b611f5] bg-white px-2 py-[6px] text-[14px] leading-none text-[#b611f5] shadow-[0_1px_1px_0_rgba(0,0,0,0.02),_0_2px_4px_0_rgba(0,0,0,0.04)] min-[600px]:mr-0 min-[600px]:ml-0">
            기본순
            <DownArrow className="h-4 w-4" fill={'#b611f5'} />
          </button>

          <div className="flex flex-1 snap-x snap-mandatory gap-2 overflow-x-auto min-[600px]:flex-initial min-[600px]:snap-none min-[600px]:overflow-visible [@media(pointer:coarse)]:[-ms-overflow-style:none] [@media(pointer:coarse)]:[scrollbar-width:none] [@media(pointer:coarse)]:[&::-webkit-scrollbar]:hidden [@media(pointer:fine)]:[scrollbar-width:thin] [@media(pointer:fine)]:[&::-webkit-scrollbar]:h-2 [@media(pointer:fine)]:[&::-webkit-scrollbar]:w-2 [@media(pointer:fine)]:[&::-webkit-scrollbar-thumb]:rounded-full [@media(pointer:fine)]:[&::-webkit-scrollbar-thumb]:bg-neutral-300 [@media(pointer:fine)]:[&::-webkit-scrollbar-track]:bg-transparent">
            {filterButtons.map((filter) => {
              const isSelected = selectedFilters.includes(filter.id);
              return (
                <button
                  key={filter.id}
                  onClick={() => toggleFilter(filter.id)}
                  className={`flex shrink-0 snap-start items-center justify-center gap-[6px] rounded-3xl px-2 py-[6px] text-[14px] shadow-[0_1px_1px_0_rgba(0,0,0,0.02),_0_2px_4px_0_rgba(0,0,0,0.04)] transition-colors ${
                    isSelected ? 'bg-[#b611f5] text-white' : 'bg-white text-gray-400'
                  }`}
                >
                  {filter.icon && <Delivery fill={isSelected ? '#fff' : '#cacaca'} />}
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

      <div className="mt-20 mb-20 text-center">광고배너</div>
      <div className="flex flex-col gap-6">
        <MenuCard />
        <MenuCard />
      </div>
    </div>
  );
}
