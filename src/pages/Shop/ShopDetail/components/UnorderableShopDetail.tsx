import { useParams } from 'react-router-dom';
import ShopDetail from '../index';
import { useGetUnorderableShopDetail } from '@/pages/Shop/hooks/useGetShopDetail';

export default function UnorderableShopDetail() {
  const { shopId } = useParams();

  if (!shopId) {
    return <div className="p-6">가게 정보를 불러올 수 없습니다.</div>;
  }

  const { data } = useGetUnorderableShopDetail(Number(shopId));

  return <ShopDetail shopInfo={data} isOrderable={false} />;
}
