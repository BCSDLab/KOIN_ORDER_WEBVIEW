import StoreIcon from '/src/assets/Home/stores-icon.svg';
import MenuIcon from '/src/assets/Home/menu-icon.svg';
import NavigateStoreIcon from '/src/assets/Home/navigate-store-icon.svg';

interface RelatedSearchItemProps {
  tag: 'store' | 'menu';
  content: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function RelateSearchItem({ tag, content, onClick }: RelatedSearchItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-12 w-[342px] items-center justify-between border-b border-[#eee] p-2 max-[341px]:w-full lg:w-[936px]"
    >
      <div className="flex items-center gap-1">
        {tag === 'store' ? <StoreIcon /> : <MenuIcon />}
        <p className="text-[10px] text-neutral-500">{content}</p>
      </div>
      <NavigateStoreIcon />
    </button>
  );
}
