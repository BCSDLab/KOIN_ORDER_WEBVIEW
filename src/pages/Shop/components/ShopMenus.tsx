import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetShopInfo } from '../hooks/useGetShopInfo';
import SoldOutIcon from '@/assets/Shop/sold-out-icon.svg';

interface ShopMenusProps {
  id: string;
  menuGroupRefs: React.RefObject<Record<string, HTMLDivElement | null>>;
  handleChangeMenu: (name: string) => void;
  isAutoScrolling: React.RefObject<boolean>;
}

export default function ShopMenus({ id, menuGroupRefs, handleChangeMenu, isAutoScrolling }: ShopMenusProps) {
  const navigate = useNavigate();
  const visibleMap = useRef<Record<string, boolean>>({});

  const { data: shopInfo } = useGetShopInfo(Number(id));

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
    <div id="shop-menus-container" className="mb-40 flex flex-col items-center gap-3 px-6">
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
              <button
                className={`flex w-full items-center justify-between py-3 pr-3 pl-4 ${idx !== 0 ? 'border-t border-neutral-300' : ''}`}
                key={menu.id}
                name={menu.name}
                disabled={menu.is_sold_out}
                onClick={() => navigate(`menus/${menu.id}`)}
              >
                <div className="flex flex-col">
                  <span className="flex text-lg leading-[1.6] font-semibold">{menu.name}</span>
                  {menu.description && (
                    <span className="line-clamp-2 text-left text-[12px] leading-[1.6] font-normal text-neutral-500">
                      {menu.description}
                    </span>
                  )}
                  {menu.prices.map((price) => {
                    if (!price.name) {
                      return (
                        <span key={price.id} className="flex text-sm leading-[1.6] font-semibold">
                          {price.price.toLocaleString()}원
                        </span>
                      );
                    }
                    return (
                      <div key={price.id} className="flex h-[1.1375rem] gap-1">
                        <span className="text-sm leading-[1.6] font-normal">{price.name} : </span>
                        <span className="text-sm leading-[1.6] font-semibold">{price.price.toLocaleString()}원</span>
                      </div>
                    );
                  })}
                </div>
                <div className="relative h-20 w-20 flex-shrink-0">
                  {menu.is_sold_out && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center rounded-md bg-neutral-800 opacity-70">
                      <SoldOutIcon />
                      <span className="text-sm leading-[1.6] font-semibold text-white">품절</span>
                    </div>
                  )}
                  <img
                    src={menu.thumbnail_image}
                    alt={menu.name}
                    className="h-20 w-20 self-baseline-last rounded-md object-cover"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
