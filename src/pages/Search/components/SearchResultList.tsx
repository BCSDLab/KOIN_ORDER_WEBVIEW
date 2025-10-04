import { useQuery } from '@tanstack/react-query';
import RelateSearchItem from './RelateSearchItem';
import type { RelatedSearchResponse } from '@/api/shop/entity';
import { getRelateSearch } from '@/api/shop';

interface SearchResultListProps {
  keyword: string;
}

export default function SearchResultList({ keyword }: SearchResultListProps) {
  const { data } = useQuery<RelatedSearchResponse>({
    queryKey: ['order', 'shop', 'search', keyword],
    queryFn: () => getRelateSearch({ keyword }),
    enabled: keyword.length > 0,
  });

  if (!data) return null;

  const { shop_name_search_results: shop, menu_name_search_results: menu } = data;

  return (
    <div className="flex w-full flex-col items-center">
      {shop?.map(({ orderable_shop_name, orderable_shop_id }) => (
        <RelateSearchItem tag="store" content={orderable_shop_name} to={`/shop/true/${orderable_shop_id}`} />
      ))}
      {menu?.map(({ menu_name, orderable_shop_name, orderable_shop_id }) => (
        <RelateSearchItem
          tag="menu"
          content={`${menu_name} | ${orderable_shop_name}`}
          to={`/shop/true/${orderable_shop_id}`}
        />
      ))}
    </div>
  );
}
