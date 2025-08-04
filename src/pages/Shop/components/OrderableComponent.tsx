import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useGetShopInfoSummary } from '../hooks/useGetShopInfo';
import { useGetShopMenuGroups } from '../hooks/useGetShopInfo';
import { useGetShopInfo } from '../hooks/useGetShopInfo';
import { useMenuGroupScroll } from '../hooks/useMenuGroupScroll';
import BottomCartModal from './BottomCartModal';
import Header from './Header';
import ImageCarousel from './ImageCarousel';
import ShopMenuGroups from './ShopMenuGroups';
import ShopMenus from './ShopMenus';
import ShopSummary from './ShopSummary';
import useCart from '@/pages/Payment/hooks/useCart';
import { useOrderStore } from '@/stores/useOrderStore';

export default function OrderableComponent() {
  const { shopId } = useParams();
  const { orderType } = useOrderStore();

  if (!shopId) {
    throw new Error('Shop ID is required');
  }

  const targetRef = useRef<HTMLDivElement | null>(null);

  const { selectedMenu, menuGroupRefs, isAutoScrolling, handleScrollTo, handleChangeMenu } = useMenuGroupScroll();

  const { data: shopInfoSummary } = useGetShopInfoSummary(Number(shopId));
  const { data: shopMenuGroups } = useGetShopMenuGroups(Number(shopId));
  const { data: shopInfo } = useGetShopInfo(Number(shopId));
  const { data: cartInfo } = useCart(orderType);

  const totalQuantity = cartInfo.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Header name={shopInfoSummary.name} targetRef={targetRef} cartItemCount={totalQuantity} />
      <ImageCarousel images={shopInfoSummary.images} targetRef={targetRef} />
      <ShopSummary id={shopId} shopInfoSummary={shopInfoSummary} />
      <ShopMenuGroups selectedMenu={selectedMenu} onSelect={handleScrollTo} shopMenuGroups={shopMenuGroups} />
      <ShopMenus
        menuGroupRefs={menuGroupRefs}
        handleChangeMenu={handleChangeMenu}
        isAutoScrolling={isAutoScrolling}
        shopMenus={shopInfo}
      />
      {cartInfo.items.length > 0 && cartInfo.orderable_shop_id === Number(shopId) && (
        <BottomCartModal id={shopId} cartItemCount={totalQuantity} />
      )}
    </>
  );
}
