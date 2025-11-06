import StoreIcon from '/src/assets/Home/stores-icon.svg';
import MenuIcon from '/src/assets/Home/menu-icon.svg';
import NavigateStoreIcon from '/src/assets/Home/navigate-store-icon.svg';
import { Link, useSearchParams } from 'react-router-dom';
import useLogger from '@/util/hooks/analytics/useLogger';
import { getCategoryNameById } from '@/constants/shopCategories';
import { getLoggingTime } from '@/util/ts/analytics/loggingTime';

interface RelatedSearchItemProps {
  tag: 'store' | 'menu';
  to: string;
  shop_name: string;
  menu_name?: string;
}

export default function RelateSearchItem({ tag, shop_name, menu_name, to }: RelatedSearchItemProps) {
  const logger = useLogger();
  const [searchParams] = useSearchParams();
  const categoryId = Number(searchParams.get('category')) || undefined;

  const handleSearchItemClick = () => {
    logger.actionEventClick({
      team: 'BUSINESS',
      event_label: 'shop_clicked',
      value: `${shop_name}`,
      duration_time: getLoggingTime('selectedCategoryTime'),
      previous_page: getCategoryNameById(categoryId),
      current_page: `${shop_name}`,
    });
  };

  return (
    <Link
      to={to}
      className="flex h-12 w-full items-center justify-between border-b border-neutral-200 p-2"
      onClick={handleSearchItemClick}
    >
      <div className="flex items-center gap-1">
        {tag === 'store' ? <StoreIcon /> : <MenuIcon />}
        <p className="text-[10px] text-neutral-500">
          {menu_name && `${menu_name} | `}
          {shop_name}
        </p>
      </div>
      <NavigateStoreIcon />
    </Link>
  );
}
