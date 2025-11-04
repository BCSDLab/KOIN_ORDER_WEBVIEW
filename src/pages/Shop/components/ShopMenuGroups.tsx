import { useEffect, useRef } from 'react';
import type { ShopMenuGroupsResponse } from '@/api/shop/entity';
import Badge from '@/components/UI/Badge';
import useLogger from '@/util/hooks/analytics/useLogger';

interface ShopMenuGroupsProps {
  shopName: string;
  selectedMenu: string;
  shopMenuGroups: ShopMenuGroupsResponse;
  onSelect: (name: string) => void;
}

export default function ShopMenuGroups({ shopName, selectedMenu, onSelect, shopMenuGroups }: ShopMenuGroupsProps) {
  const logger = useLogger();

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const badgeRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const handleBadgeClick = (groupName: string) => () => {
    logger.actionEventClick({
      team: 'BUSINESS',
      event_label: 'shop_detail_view',
      value: shopName,
    });
    onSelect(groupName);
  };

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
              onClick={handleBadgeClick(group.name)}
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
