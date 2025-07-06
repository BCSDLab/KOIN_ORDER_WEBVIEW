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

export default function Shop() {
  const { id } = useParams();
  if (!id) {
    throw new Error('Shop ID is required');
  }

  const [selectedMenu, setSelectedMenu] = useState<string>('');
  const menuGroupRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const targetRef = useRef<HTMLDivElement | null>(null);
  const isAutoScrolling = useRef<boolean>(false);

  const { data: shopInfoSummary } = useGetShopInfoSummary(Number(id));
  const { data: cartInfo } = useCart('TAKE_OUT');

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
      <Header name={shopInfoSummary.name} targetRef={targetRef} cartItemCount={cartInfo.items.length} />
      {/* TODO: image_urls 속성 추가 후 변경 예정*/}
      <ImageCarousel
        images={[
          'https://static.koreatech.in/upload/SHOPS/2024/10/16/685ad565-4d58-4d65-944a-a51dc18993f0/BHC.jpeg',
          'a',
          'c',
          'd',
        ]}
        targetRef={targetRef}
      />
      <ShopSummary id={id} shopInfoSummary={shopInfoSummary} />
      <ShopMenuGroups id={id} selectedMenu={selectedMenu} onSelect={handleScrollTo} />
      <ShopMenus
        id={id}
        menuGroupRefs={menuGroupRefs}
        handleChangeMenu={handleChangeMenu}
        isAutoScrolling={isAutoScrolling}
      />
      {cartInfo.items.length > 0 && cartInfo.orderable_shop_id === Number(id) && (
        <BottomCartModal id={id} cartItemCount={cartInfo.items.length} />
      )}
    </div>
  );
}
