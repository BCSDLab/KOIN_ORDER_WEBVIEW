import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import BottomCartModal from './components/BottomCartModal';
import Header from './components/Header';
import ImageCarousel from './components/ImageCarousel';
import ShopMenuGroups from './components/ShopMenuGroups';
import ShopMenus from './components/ShopMenus';
import ShopSummary from './components/ShopSummary';
import { useGetShopInfo } from './hooks/useGetShopInfo';
import { useGetShopMenuGroups } from './hooks/useGetShopInfo';
import { useGetShopInfoSummary } from './hooks/useGetShopInfo';
import { useMenuGroupScroll } from './hooks/useMenuGroupScroll';
import useCart from '@/pages/Payment/hooks/useCart';
import { useOrderStore } from '@/stores/useOrderStore';

export default function OrderableShopView() {
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
      {/*TODO: 배달 배포 시 교체 예정*/}
      {/* <Header name={shopInfoSummary.name} targetRef={targetRef} cartItemCount={totalQuantity} /> */}
      <Header name={shopInfoSummary.name} targetRef={targetRef} />
      <ImageCarousel images={shopInfoSummary.images} targetRef={targetRef} />
      <ShopSummary id={shopId} shopInfoSummary={shopInfoSummary} isOrderable={true} />
      <ShopMenuGroups selectedMenu={selectedMenu} onSelect={handleScrollTo} shopMenuGroups={shopMenuGroups} />
      <ShopMenus
        menuGroupRefs={menuGroupRefs}
        handleChangeMenu={handleChangeMenu}
        isAutoScrolling={isAutoScrolling}
        shopMenus={shopInfo}
        isOrderable={true}
      />
      {cartInfo.items.length > 0 && cartInfo.orderable_shop_id === Number(shopId) && (
        <BottomCartModal id={shopId} cartItemCount={totalQuantity} />
      )}
    </>
  );
}
