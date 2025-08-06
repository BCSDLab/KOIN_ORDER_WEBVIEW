import { useParams } from 'react-router-dom';
import { useGetUnOrderableShopDetail } from '../../hooks/useGetShopDetail';
import ShopDetail from '../index';

export default function UnOrderableShopDetail() {
  const { shopId } = useParams();

  if (!shopId) {
    return <div className="p-6">가게 정보를 불러올 수 없습니다.</div>;
  }

  const { data } = useGetUnOrderableShopDetail(Number(shopId));

  return <ShopDetail shopInfo={data} />;
}
