import { useParams } from 'react-router-dom';
import { useGetUnOrderableShopDetail } from '../../hooks/useGetShopDetail';
import ShopDetail from '../index';

export default function UnOrderableShopDetail() {
  const { id } = useParams();
  const { data } = useGetUnOrderableShopDetail(Number(id));

  return <ShopDetail shopInfo={data} />;
}
