import { useParams } from 'react-router-dom';
import ShopDetail from '../index';
import { useGetShopDetail } from '@/pages/Shop/hooks/useGetShopDetail';

export default function OrderableShopDetail() {
  const { id } = useParams();
  const { data } = useGetShopDetail(Number(id));

  return <ShopDetail shopInfo={data} />;
}
