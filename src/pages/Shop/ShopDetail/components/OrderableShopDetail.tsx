import ShopDetail from '../index';
import { useGetShopDetail } from '@/pages/Shop/hooks/useGetShopDetail';

interface OrderableShopDetailProps {
  shopId: string;
}

export default function OrderableShopDetail({ shopId }: OrderableShopDetailProps) {
  const { data } = useGetShopDetail(Number(shopId));

  return <ShopDetail shopInfo={data} />;
}
