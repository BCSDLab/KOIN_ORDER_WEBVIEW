import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import useCart from '../Payment/hooks/useCart';
import BottomCartModal from './components/BottomCartModal';
import Header from './components/Header';
import ImageCarousel from './components/ImageCarousel';
import ShopMenuGroups from './components/ShopMenuGroups';
import ShopMenus from './components/ShopMenus';
import ShopSummary from './components/ShopSummary';
import { useGetShopInfoSummary } from './hooks/useGetShopInfo';
import { useOrderStore } from '@/stores/useOrderStore';

export default function Shop() {
  const { shopId } = useParams();
  if (!shopId) {
    throw new Error('Shop ID is required');
  }

  const [selectedMenu, setSelectedMenu] = useState<string>('');
  const { orderType } = useOrderStore();
  const menuGroupRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const targetRef = useRef<HTMLDivElement | null>(null);
  const isAutoScrolling = useRef<boolean>(false);

  const { data: shopInfoSummary } = useGetShopInfoSummary(Number(shopId));
  const { data: cartInfo, error: cartError } = useCart(orderType);

  const [hasShownError, setHasShownError] = useState(false);
  useEffect(() => {
    if (cartError && !hasShownError) {
      alert(cartError.message ?? String(cartError));
      setHasShownError(true);
    }
  }, [cartError, hasShownError]);

  const handleScrollTo = (name: string) => {
    const element = menuGroupRefs.current[name];
    if (element) {
      isAutoScrolling.current = true;
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setSelectedMenu(name);

      setTimeout(() => {
        isAutoScrolling.current = false;
      }, 500);
    }
  };

  const handleChangeMenu = (name: string) => {
    setSelectedMenu(name);
  };

  return (
    <div>
      {cartError ? (
        <div
          style={{
            color: 'red',
            background: '#fee',
            padding: '12px 16px',
            marginBottom: 20,
            borderRadius: 6,
            fontWeight: 600,
          }}
        >
          ⚠️ 장바구니 정보를 불러오는 중 에러가 발생했습니다:
          <br />
          {cartError.message ?? String(cartError)}
        </div>
      ) : (
        <>
          <Header name={shopInfoSummary.name} targetRef={targetRef} cartItemCount={cartInfo.items.length} />
          <ImageCarousel images={shopInfoSummary.images} targetRef={targetRef} />
          <ShopSummary id={shopId} shopInfoSummary={shopInfoSummary} />
          <ShopMenuGroups id={shopId} selectedMenu={selectedMenu} onSelect={handleScrollTo} />
          <ShopMenus
            id={shopId}
            menuGroupRefs={menuGroupRefs}
            handleChangeMenu={handleChangeMenu}
            isAutoScrolling={isAutoScrolling}
          />
          {cartInfo.items.length > 0 && cartInfo.orderable_shop_id === Number(shopId) && (
            <BottomCartModal id={shopId} cartItemCount={cartInfo.items.length} />
          )}
        </>
      )}
    </div>
  );
}
