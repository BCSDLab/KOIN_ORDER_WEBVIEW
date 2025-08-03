import { useGetUnOrderableShopDetail } from '../../hooks/useGetShopDetail';
import ShopDetail from '../index';

interface UnOrderableShopDetailProps {
  shopId: string;
}

export default function UnOrderableShopDetail({ shopId }: UnOrderableShopDetailProps) {
  const { data } = useGetUnOrderableShopDetail(Number(shopId));

  return <ShopDetail shopInfo={data} />;
}
