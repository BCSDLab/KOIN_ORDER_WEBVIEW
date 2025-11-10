import { useQuery } from '@tanstack/react-query';
import RelateSearchItem from './RelateSearchItem';
import type { NearbyStoresRelateSearchResponse /* RelatedSearchResponse */ } from '@/api/shop/entity';
import { getNearbyStoresRelateSearch /* getRelateSearch */ } from '@/api/shop';

interface SearchResultListProps {
  keyword: string;
}

export default function SearchResultList({ keyword }: SearchResultListProps) {
  const { data } = useQuery<NearbyStoresRelateSearchResponse>({
    queryKey: ['menu', 'shop', 'search', keyword],
    queryFn: () => getNearbyStoresRelateSearch({ keyword }),
    enabled: keyword.length > 0,
  });

  if (!data) return null;

  const { shop_name_search_results: shop, menu_name_search_results: menu } = data;

  return (
    <div className="flex w-full flex-col items-center">
      {shop?.map(({ shop_name, shop_id }) => (
        <RelateSearchItem key={`shop-${shop_id}`} tag="store" shop_name={shop_name} to={`/shop/false/${shop_id}`} />
      ))}
      {menu?.map(({ menu_name, shop_name, shop_id }) => (
        <RelateSearchItem
          key={`menu-${shop_id}-${menu_name}`}
          tag="menu"
          shop_name={shop_name}
          menu_name={menu_name}
          to={`/shop/false/${shop_id}`}
        />
      ))}
    </div>
  );
}

/*

추후를 위헤 주문 가능 상점 검색 api 주석 처리

export default function SearchResultList({ keyword }: SearchResultListProps) {
  const { data } = useQuery<RelatedSearchResponse>({
    queryKey: ['menu', 'shop', 'search', keyword],
    queryFn: () => getRelateSearch({ keyword }),
    enabled: keyword.length > 0,
  });

  if (!data) return null;

  const { shop_name_search_results: shop, menu_name_search_results: menu } = data;

  return (
    <div className="flex w-full flex-col items-center">
      {shop?.map(({ orderable_shop_name, orderable_shop_id }) => (
        <RelateSearchItem tag="store" shop_name={orderable_shop_name} to={`/shop/true/${orderable_shop_id}`} />
      ))}
      {menu?.map(({ menu_name, orderable_shop_name, orderable_shop_id }) => (
        <RelateSearchItem
          tag="menu"
          shop_name={orderable_shop_name}
          menu_name={menu_name}
          to={`/shop/true/${orderable_shop_id}`}
        />
      ))}
    </div>
  );
}
*/
