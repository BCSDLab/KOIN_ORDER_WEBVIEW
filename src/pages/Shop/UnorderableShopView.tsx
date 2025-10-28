import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import Header from './components/Header';
import ImageCarousel from './components/ImageCarousel';
import ShopMenuGroups from './components/ShopMenuGroups';
import ShopMenus from './components/ShopMenus';
import ShopSummary from './components/ShopSummary';
import { useGetUnorderableSummaryShopInfo } from './hooks/useGetShopDetail';
import { useGetUnorderableShopInfoSummary } from './hooks/useGetShopInfo';
import { useGetUnorderableShopMenuGroups } from './hooks/useGetShopInfo';
import { useGetUnorderableShopMenus } from './hooks/useGetShopInfo';
import { useMenuGroupScroll } from './hooks/useMenuGroupScroll';
import useCart from '@/pages/Payment/hooks/useCart';
import { useOrderStore } from '@/stores/useOrderStore';

export default function UnorderableShopView() {
  const { shopId } = useParams();
  const { orderType } = useOrderStore();

  if (!shopId) {
    throw new Error('Shop ID is required');
  }

  const targetRef = useRef<HTMLDivElement | null>(null);

  const { selectedMenu, menuGroupRefs, isAutoScrolling, handleScrollTo, handleChangeMenu } = useMenuGroupScroll();

  const { data: shopInfoSummary } = useGetUnorderableShopInfoSummary(Number(shopId));
  const { data: unorderableShopMenuGroups } = useGetUnorderableShopMenuGroups(Number(shopId));
  const { data: unorderableShopMenus } = useGetUnorderableShopMenus(Number(shopId));
  const { data: unorderableShopInfo } = useGetUnorderableSummaryShopInfo(Number(shopId));
  const { data: cartInfo } = useCart(orderType);

  const totalQuantity = cartInfo.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Header name={shopInfoSummary.name} targetRef={targetRef} cartItemCount={totalQuantity} />
      <ImageCarousel images={shopInfoSummary.images} targetRef={targetRef} />
      <ShopSummary
        id={shopId}
        shopInfoSummary={shopInfoSummary}
        isOrderable={false}
        UnOrderableShopInfo={unorderableShopInfo}
      />
      <ShopMenuGroups
        selectedMenu={selectedMenu}
        onSelect={handleScrollTo}
        shopMenuGroups={unorderableShopMenuGroups}
      />
      <ShopMenus
        menuGroupRefs={menuGroupRefs}
        handleChangeMenu={handleChangeMenu}
        isAutoScrolling={isAutoScrolling}
        shopMenus={unorderableShopMenus}
        isOrderable={false}
      />
    </>
  );
}
