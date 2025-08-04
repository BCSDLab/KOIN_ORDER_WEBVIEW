import { useRef, useState } from 'react';
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
  const { data: cartInfo } = useCart(orderType);
  const totalQuantity = cartInfo?.items.reduce((sum, item) => sum + item.quantity, 0);

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
      <Header name={shopInfoSummary.name} targetRef={targetRef} cartItemCount={totalQuantity} />
      <ImageCarousel images={shopInfoSummary.images} targetRef={targetRef} />
      <ShopSummary id={shopId} shopInfoSummary={shopInfoSummary} />
      <ShopMenuGroups id={shopId} selectedMenu={selectedMenu} onSelect={handleScrollTo} />
      <ShopMenus
        id={shopId}
        menuGroupRefs={menuGroupRefs}
        handleChangeMenu={handleChangeMenu}
        isAutoScrolling={isAutoScrolling}
      />
      {cartInfo?.items.length && cartInfo?.items.length > 0 && cartInfo?.orderable_shop_id === Number(shopId) && (
        <BottomCartModal id={shopId} cartItemCount={totalQuantity} />
      )}
    </div>
  );
}
