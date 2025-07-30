import { useGetShopDetail } from '../hooks/useGetShopDetail';
import ShopDetail from './index';

export default function OrderableShopDetail({ shopId }: { shopId: string }) {
  const { data } = useGetShopDetail(Number(shopId));

  return (
    <>
      <ShopDetail shopInfo={data} />
    </>
  );
}
