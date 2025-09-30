import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { RelatedSearchResponse } from '@/api/shop/entity';
import TopModal from '@/components/UI/TopModal/TopModal';
import RelateSearchItem from '@/pages/Home/components/RelateSearchItem';

interface SearchBarModalProps {
  onClose: () => void;
  relatedSearchItems?: RelatedSearchResponse;
}

export default function SearchBarModal({ onClose, relatedSearchItems }: SearchBarModalProps) {
  const navigate = useNavigate();

  return (
    <TopModal
      isOpen
      onClose={onClose}
      className={clsx(relatedSearchItems ? 'bg-[#F8F8FA]' : 'bg-[rgba(0,0,0,0.70)]')}
      outSideClose={!relatedSearchItems}
    >
      <div className="mt-2 mb-2 flex w-full flex-col items-center">
        {relatedSearchItems?.shop_name_search_results?.map((item) => (
          <RelateSearchItem
            tag="store"
            content={item.orderable_shop_name}
            onClick={() => {
              navigate(`/shop/true/${item.orderable_shop_id}`);
              onClose();
            }}
          />
        ))}
        {relatedSearchItems?.menu_name_search_results?.slice(0, 5).map((item) => (
          <RelateSearchItem
            tag="menu"
            content={`${item.menu_name} | ${item.orderable_shop_name}`}
            onClick={() => {
              navigate(`/shop/true/${item.orderable_shop_id}`);
              onClose();
            }}
          />
        ))}
      </div>
    </TopModal>
  );
}
