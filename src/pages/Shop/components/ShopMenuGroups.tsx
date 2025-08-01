import { useEffect, useRef } from 'react';
import { ShopMenuGroupsResponse } from '@/api/shop/entity';
import Badge from '@/components/UI/Badge';

interface ShopMenuGroupsProps {
  selectedMenu: string;
  shopMenuGroups: ShopMenuGroupsResponse;
  onSelect: (name: string) => void;
}

export default function ShopMenuGroups({ selectedMenu, onSelect, shopMenuGroups }: ShopMenuGroupsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const badgeRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    if (!selectedMenu || !badgeRefs.current[selectedMenu] || !scrollContainerRef.current) return;

    const badgeElement = badgeRefs.current[selectedMenu];
    const container = scrollContainerRef.current;

    const badgeLeft = badgeElement.offsetLeft;

    const offset = 16;

    container.scrollTo({
      left: badgeLeft - offset,
      behavior: 'smooth',
    });
  }, [selectedMenu]);

  return (
    <>
      <div className="h-2 w-full bg-neutral-100" />
      <div
        className="scrollbar-hide sticky top-[60px] z-10 box-border flex h-16 items-center gap-1 overflow-scroll bg-[#f8f8fa] px-6 whitespace-nowrap"
        ref={scrollContainerRef}
      >
        {shopMenuGroups.count > 0 &&
          shopMenuGroups.menu_groups.map((group) => (
            <button
              key={group.name}
              ref={(el) => {
                badgeRefs.current[group.name] = el;
              }}
              onClick={() => onSelect(group.name)}
              className="focus:outline-none"
            >
              <Badge
                label={group.name}
                variant="outlined"
                color={selectedMenu === group.name ? 'white' : 'neutral'}
                size="lg"
                className="w-fit"
                id={group.name}
              />
            </button>
          ))}
      </div>
    </>
  );
}
