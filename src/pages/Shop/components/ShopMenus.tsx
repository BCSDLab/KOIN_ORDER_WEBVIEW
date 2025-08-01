import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import type { ShopInfoResponse } from '@/api/shop/entity';
import EmptyThumbnail from '@/assets/Shop/empty_thumbnail.svg';
import SoldOutIcon from '@/assets/Shop/sold-out-icon.svg';

interface ShopMenusProps {
  menuGroupRefs: React.RefObject<Record<string, HTMLDivElement | null>>;
  handleChangeMenu: (name: string) => void;
  isAutoScrolling: React.RefObject<boolean>;
  shopMenus: ShopInfoResponse[];
}

export default function ShopMenus({ menuGroupRefs, handleChangeMenu, isAutoScrolling, shopMenus }: ShopMenusProps) {
  const navigate = useNavigate();
  const visibleMap = useRef<Record<string, boolean>>({});
  const { isOrderable } = useParams();

  const isOrderableBoolean = isOrderable === 'true';

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
      {shopMenus.map((shop) => (
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
                onClick={() => navigate(`menus/${menu.id}`)}
                disabled={!isOrderableBoolean}
              >
                <div className="flex flex-col">
                  <span className="flex h-auto text-start text-lg leading-[1.6] font-semibold">{menu.name}</span>
                  {menu.description && (
                    <span className="flex h-auto text-start text-[12px] leading-[1.6] font-normal text-neutral-500">
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
                      <div key={price.id} className="m-1 flex h-[1.1375rem] gap-1">
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
                  {!menu.thumbnail_image && (
                    <div className="flex h-full w-full items-center justify-center rounded-md">
                      <EmptyThumbnail />
                    </div>
                  )}
                  {menu.thumbnail_image && (
                    <img src={menu.thumbnail_image} alt={menu.name} className="h-full w-full rounded-md object-cover" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
