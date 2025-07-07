import { useEffect, useRef } from 'react';
import { useGetShopInfo } from '../hooks/useGetShopInfo';

interface ShopMenusProps {
  id: string;
  menuGroupRefs: React.RefObject<Record<string, HTMLDivElement | null>>;
  handleChangeMenu: (name: string) => void;
  isAutoScrolling: React.RefObject<boolean>;
}

export default function ShopMenus({ id, menuGroupRefs, handleChangeMenu, isAutoScrolling }: ShopMenusProps) {
  const { data: shopInfo } = useGetShopInfo(Number(id));

  const visibleMap = useRef<Record<string, boolean>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let changed = false;

        entries.forEach((entry) => {
          const id = entry.target.id;
          const isVisible = entry.isIntersecting;

          if (visibleMap.current[id] !== isVisible) {
            visibleMap.current[id] = isVisible;
            changed = true;
          }
        });

        if (changed && !isAutoScrolling.current) {
          const visibleEntries = Object.entries(visibleMap.current)
            .filter(([, isVisible]) => isVisible)
            .map(([id]) => menuGroupRefs.current[id])
            .filter(Boolean)
            .sort((a, b) => a!.getBoundingClientRect().top - b!.getBoundingClientRect().top);

          if (visibleEntries.length > 0) {
            handleChangeMenu(visibleEntries[0]!.id);
          }
        }
      },
      {
        threshold: 0,
        rootMargin: '-124px 0px 0px 0px',
      },
    );

    Object.values(menuGroupRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [menuGroupRefs, handleChangeMenu]);

  return (
    <div id="shop-menus-container" className="flex flex-col items-center gap-3 px-6">
      {shopInfo.map((shop) => (
        <div
          key={shop.menu_group_id}
          className="flex w-full scroll-mt-[124px] flex-col gap-3"
          ref={(el) => {
            menuGroupRefs.current[shop.menu_group_name] = el;
          }}
          id={shop.menu_group_name}
        >
          <span className="ml-1 text-xl leading-[1.6] font-bold">{shop.menu_group_name}</span>
          <div className="shadow-1 rounded-3xl bg-white">
            {shop.menus.map((menu, idx) => (
              <div
                className={`flex w-full items-center justify-between py-3 pr-3 pl-4 ${idx !== 0 ? 'border-t border-neutral-300' : ''}`}
                key={menu.id}
              >
                <div className="flex flex-col">
                  <span className="text-lg leading-[1.6] font-semibold">{menu.name}</span>
                  <span className="text-[12px] leading-[1.6] font-normal text-neutral-500">{menu.description}</span>
                  {menu.prices.map((price) => {
                    if (!price.name) {
                      return (
                        <span key={price.id} className="text-sm leading-[1.6] font-semibold">
                          {price.price.toLocaleString()}원
                        </span>
                      );
                    }
                    return (
                      <div key={price.id} className="flex gap-1">
                        <span className="text-sm leading-[1.6] font-normal">{price.name} : </span>
                        <span className="text-sm leading-[1.6] font-semibold">{price.price.toLocaleString()}원</span>
                      </div>
                    );
                  })}
                </div>
                <img src={menu.thumbnail_image} alt={menu.name} className="h-20 w-20 self-baseline-last object-cover" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
