import { useGetShopDetail } from '../hooks/useGetShopDetail';
import ShopDetail from './index';

interface OrderableShopDetailProps {
  shopId: string;
}

export default function OrderableShopDetail({ shopId }: OrderableShopDetailProps) {
  const { data } = useGetShopDetail(Number(shopId));

  return (
    <>
      <ShopDetail shopInfo={data} />
    </>
  );
}
