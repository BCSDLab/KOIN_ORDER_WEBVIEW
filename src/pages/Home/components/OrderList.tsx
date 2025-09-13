import { useStoreCategories } from '@/pages/Home/hooks/useStoreCategories.ts';

interface Category {
  id: number;
  name: string;
  image_url: string;
}

export default function OrderList() {
  const { data: categories } = useStoreCategories();
  const categoriesWithAll = categories.shop_categories.map((category: Category) => ({
    ...category,
  }));

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="overflow: visible ml-6 flex w-[calc(100%-24px)] snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] min-[960px]:ml-0 min-[960px]:snap-none min-[960px]:justify-center [&::-webkit-scrollbar]:hidden">
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

      <div className="mt-40 mb-40 text-center">광고배너</div>
      <div className="text-center">메뉴 리스트</div>
    </div>
  );
}
