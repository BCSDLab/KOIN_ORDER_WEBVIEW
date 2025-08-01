import { useParams } from 'react-router-dom';
import ShopDetail from '../index';
import { useGetShopDetail } from '@/pages/Shop/hooks/useGetShopDetail';

export default function OrderableShopDetail() {
  const { shopId } = useParams();
  const { data } = useGetShopDetail(Number(shopId));

  return <ShopDetail shopInfo={data} />;
}
