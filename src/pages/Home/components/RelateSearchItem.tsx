import StoreIcon from '/src/assets/Home/stores-icon.svg';
import MenuIcon from '/src/assets/Home/menu-icon.svg';
import NavigateStoreIcon from '/src/assets/Home/navigate-store-icon.svg';

interface RelatedSearchItemProps {
  url: string | null;
  content: string;
  onClick: () => void;
}

export default function RelateSearchItem({ url, content, onClick }: RelatedSearchItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-12 w-[342px] items-center justify-between border-b border-[#eee] p-2 sm:w-[936px]"
    >
      <div className="flex items-center gap-1">
        <div className="h-4 w-4">{url ? <StoreIcon /> : <MenuIcon />}</div>
        <p className="text-[10px] text-[#727272]">{content}</p>
      </div>
      {url && (
        <div className="h-4 w-4">
          <NavigateStoreIcon />
        </div>
      )}
    </button>
  );
}
