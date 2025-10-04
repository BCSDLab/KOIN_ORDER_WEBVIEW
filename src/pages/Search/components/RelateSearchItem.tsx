import StoreIcon from '/src/assets/Home/stores-icon.svg';
import MenuIcon from '/src/assets/Home/menu-icon.svg';
import NavigateStoreIcon from '/src/assets/Home/navigate-store-icon.svg';
import { Link } from 'react-router-dom';

interface RelatedSearchItemProps {
  tag: 'store' | 'menu';
  content: string;
  to: string;
}

export default function RelateSearchItem({ tag, content, to }: RelatedSearchItemProps) {
  return (
    <Link to={to} className="flex h-12 w-full items-center justify-between border-b border-neutral-200 p-2">
      <div className="flex items-center gap-1">
        {tag === 'store' ? <StoreIcon /> : <MenuIcon />}
        <p className="text-[10px] text-neutral-500">{content}</p>
      </div>
      <NavigateStoreIcon />
    </Link>
  );
}
