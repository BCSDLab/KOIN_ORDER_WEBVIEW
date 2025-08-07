import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import Header from './components/Header';
import ImageCarousel from './components/ImageCarousel';
import ShopMenuGroups from './components/ShopMenuGroups';
import ShopMenus from './components/ShopMenus';
import ShopSummary from './components/ShopSummary';
import { useGetUnOrderableShopInfo } from './hooks/useGetShopInfo';
import { useGetUnOrderableShopReviews } from './hooks/useGetShopInfo';
import { useGetUnOrderableShopMenuGroups } from './hooks/useGetShopInfo';
import { useGetUnOrderableShopMenus } from './hooks/useGetShopInfo';
import { useMenuGroupScroll } from './hooks/useMenuGroupScroll';
import useCart from '@/pages/Payment/hooks/useCart';
import { useOrderStore } from '@/stores/useOrderStore';

export default function UnOrderableShopView() {
  const { shopId } = useParams();
  const { orderType } = useOrderStore();

  if (!shopId) {
    throw new Error('Shop ID is required');
  }

  const targetRef = useRef<HTMLDivElement | null>(null);

  const { selectedMenu, menuGroupRefs, isAutoScrolling, handleScrollTo, handleChangeMenu } = useMenuGroupScroll();

  const { data: shopInfoSummary } = useGetUnOrderableShopInfo(Number(shopId));
  const { data: shopReviews } = useGetUnOrderableShopReviews(Number(shopId));
  const { data: unOrderableShopMenuGroups } = useGetUnOrderableShopMenuGroups(Number(shopId));
  const { data: unOrderableShopMenus } = useGetUnOrderableShopMenus(Number(shopId));
  const { data: cartInfo } = useCart(orderType);

  const shopInfoSummaryData = {
    ...shopInfoSummary,
    ...shopReviews,
  };

  const totalQuantity = cartInfo.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Header name={shopInfoSummary.name} targetRef={targetRef} cartItemCount={totalQuantity} />
      <ImageCarousel images={shopInfoSummaryData.images} targetRef={targetRef} />
      <ShopSummary id={shopId} shopInfoSummary={shopInfoSummaryData} isOrderable={false} />
      <ShopMenuGroups
        selectedMenu={selectedMenu}
        onSelect={handleScrollTo}
        shopMenuGroups={unOrderableShopMenuGroups}
      />
      <ShopMenus
        menuGroupRefs={menuGroupRefs}
        handleChangeMenu={handleChangeMenu}
        isAutoScrolling={isAutoScrolling}
        shopMenus={unOrderableShopMenus}
        isOrderable={false}
      />
    </>
  );
}
