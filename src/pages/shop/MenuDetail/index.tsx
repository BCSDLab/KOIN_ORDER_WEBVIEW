import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import ImageCarousel from '../components/ImageCarousel';
import MenuDescription from '../components/MenuDescription';
import MenuOptions from '../components/MenuOptions';
import { useGetShopMenuDetail } from '../hooks/useGetShopInfo';
import useCart from '@/pages/Payment/hooks/useCart';

export default function MenuDetail() {
  const { shopId, menuId } = useParams();
  if (!shopId) {
    throw new Error('Shop ID is required');
  }

  const targetRef = useRef<HTMLDivElement | null>(null);

  const { data: cartInfo } = useCart('TAKE_OUT');
  const { data: menuInfo } = useGetShopMenuDetail(Number(shopId), Number(menuId));

  const imagesForCarousel = menuInfo.images.map((image) => ({
    image_url: image,
    is_thumbnail: false,
  }));

  return (
    <div>
      <Header name={menuInfo.name} targetRef={targetRef} cartItemCount={cartInfo.items.length} />
      <ImageCarousel images={imagesForCarousel} targetRef={targetRef} />
      <MenuDescription name={menuInfo.name} description={menuInfo.description || ''} price={menuInfo.prices[0].price} />
      <MenuOptions optionGroups={menuInfo.option_groups} />
    </div>
  );
}
