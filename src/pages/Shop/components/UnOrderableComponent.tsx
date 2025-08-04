import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useGetUnOrderableShopInfo } from '../hooks/useGetShopInfo';
import { useGetUnOrderableShopReviews } from '../hooks/useGetShopInfo';
import { useGetUnOrderableShopMenuGroups } from '../hooks/useGetShopInfo';
import { useGetUnOrderableShopMenus } from '../hooks/useGetShopInfo';
import { useMenuGroupScroll } from '../hooks/useMenuGroupScroll';
import Header from './Header';
import ImageCarousel from './ImageCarousel';
import ShopMenuGroups from './ShopMenuGroups';
import ShopMenus from './ShopMenus';
import ShopSummary from './ShopSummary';
import useCart from '@/pages/Payment/hooks/useCart';
import { useOrderStore } from '@/stores/useOrderStore';

export default function UnOrderableComponent() {
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
      <ShopSummary id={shopId} shopInfoSummary={shopInfoSummaryData} />
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
      />
    </>
  );
}
