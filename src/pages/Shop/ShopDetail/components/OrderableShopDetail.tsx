import { useParams } from 'react-router-dom';
import ShopDetail from '../index';
import { useGetShopDetail } from '@/pages/Shop/hooks/useGetShopDetail';

export default function OrderableShopDetail() {
  const { shopId } = useParams();

  if (!shopId) {
    return <div className="p-6">가게 정보를 불러올 수 없습니다.</div>;
  }

  const { data } = useGetShopDetail(Number(shopId));

  return <ShopDetail shopInfo={data} isOrderable={true} />;
}
