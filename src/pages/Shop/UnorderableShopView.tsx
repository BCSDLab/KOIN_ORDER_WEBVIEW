import { useEffect, useRef } from 'react';
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
import useLogger from '@/util/hooks/analytics/useLogger';
import { useScrollLogging } from '@/util/hooks/analytics/useScrollLogging';
import useScrollToTop from '@/util/hooks/ui/useScrollToTop';
import { useSwipeToBack } from '@/util/hooks/useSwipeToBack';
import { setStartLoggingTime } from '@/util/ts/analytics/loggingTime';
// import useCart from '@/pages/Payment/hooks/useCart';
// import { useOrderStore } from '@/stores/useOrderStore';

export default function UnorderableShopView() {
  useScrollToTop();
  useSwipeToBack();
  const logger = useLogger();
  const { shopId } = useParams();
  // const { orderType } = useOrderStore();

  if (!shopId) {
    throw new Error('Shop ID is required');
  }

  const targetRef = useRef<HTMLDivElement | null>(null);

  const { selectedMenu, menuGroupRefs, isAutoScrolling, handleScrollTo, handleChangeMenu } = useMenuGroupScroll();

  const { data: shopInfoSummary } = useGetUnorderableShopInfoSummary(Number(shopId));
  const { data: unorderableShopMenuGroups } = useGetUnorderableShopMenuGroups(Number(shopId));
  const { data: unorderableShopMenus } = useGetUnorderableShopMenus(Number(shopId));
  const { data: unorderableShopInfo } = useGetUnorderableSummaryShopInfo(Number(shopId));
  // const { data: cartInfo } = useCart(orderType);

  // const totalQuantity = cartInfo.items.reduce((sum, item) => sum + item.quantity, 0);

  const shopDetailScrollLogging = () => {
    logger.actionEventClick({
      team: 'BUSINESS',
      event_label: 'shop_detail_view',
      value: shopInfoSummary.name,
      event_category: 'scroll',
    });
  };

  useScrollLogging(shopDetailScrollLogging);

  useEffect(() => {
    setStartLoggingTime('enteredShopDetail');
    sessionStorage.setItem('enteredShopName', shopInfoSummary.name);
  }, [shopInfoSummary.name]);

  return (
    <>
      {/*TODO: 배달 배포 시 교체 예정*/}
      {/* <Header name={shopInfoSummary.name} targetRef={targetRef} cartItemCount={totalQuantity} /> */}
      <Header name={shopInfoSummary.name} targetRef={targetRef} />
      <ImageCarousel images={shopInfoSummary.images} targetRef={targetRef} shopName={shopInfoSummary.name} />
      <ShopSummary
        id={shopId}
        shopInfoSummary={shopInfoSummary}
        isOrderable={false}
        UnOrderableShopInfo={unorderableShopInfo}
      />
      <ShopMenuGroups
        shopName={shopInfoSummary.name}
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
