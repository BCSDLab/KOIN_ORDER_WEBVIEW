import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { useGetShopInfoSummary, useGetShopMenuDetail } from '../hooks/useGetShopInfo';
import useCart from '@/pages/Payment/hooks/useCart';

export default function MenuDetail() {
  const { shopId, menuId } = useParams();
  if (!shopId) {
    throw new Error('Shop ID is required');
  }

  const targetRef = useRef<HTMLDivElement | null>(null);

  const { data: shopInfoSummary } = useGetShopInfoSummary(Number(shopId));
  const { data: menuInfo } = useGetShopMenuDetail(Number(shopId), Number(menuId));
  const { data: cartInfo } = useCart('TAKE_OUT');

  return (
    <div>
      <Header name={shopInfoSummary.name} targetRef={targetRef} cartItemCount={cartInfo.items.length} />
      <MenuDescription />
    </div>
  );
}
