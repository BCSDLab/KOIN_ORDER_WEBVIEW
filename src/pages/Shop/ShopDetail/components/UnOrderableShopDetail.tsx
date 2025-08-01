import { useParams } from 'react-router-dom';
import { useGetUnOrderableShopDetail } from '../../hooks/useGetShopDetail';
import ShopDetail from '../index';

export default function UnOrderableShopDetail() {
  const { shopId } = useParams();
  const { data: shopInfo } = useGetUnOrderableShopDetail(Number(shopId));

  return <ShopDetail shopInfo={shopInfo} />;
}
