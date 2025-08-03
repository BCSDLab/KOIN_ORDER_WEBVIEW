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
import { useInteraction } from './hooks/useInteraction';

interface UnOrderableComponentProps {
  totalQuantity: number;
}

export default function UnOrderableComponent({ totalQuantity }: UnOrderableComponentProps) {
  const { shopId } = useParams();
  if (!shopId) {
    throw new Error('Shop ID is required');
  }

  const targetRef = useRef<HTMLDivElement | null>(null);
  const isAutoScrolling = useRef<boolean>(false);

  const { selectedMenu, menuGroupRefs, handleScrollTo, handleChangeMenu } = useInteraction();

  const { data: shopInfoSummary } = useGetUnOrderableShopInfo(Number(shopId));
  const { data: shopReviews } = useGetUnOrderableShopReviews(Number(shopId));
  const { data: unOrderableShopMenuGroups } = useGetUnOrderableShopMenuGroups(Number(shopId));
  const { data: unOrderableShopMenus } = useGetUnOrderableShopMenus(Number(shopId));

  const carouselImages =
    shopInfoSummary.image_urls?.map((url, index) => ({
      image_url: url,
      is_thumbnail: index === 1 ? true : false,
    })) || [];

  const shopInfoSummaryData = {
    shop_id: shopInfoSummary.id,
    orderable_shop_id: Number(shopId),
    name: shopInfoSummary.name,
    introduction: shopInfoSummary.description,
    pay_card: shopInfoSummary.pay_card,
    pqy_bank: shopInfoSummary.pay_bank,
    is_delivery_available: false,
    is_takeout_available: false,
    minimum_order_amount: 0,
    rating_average: shopReviews.statistics.average_rating,
    review_count: shopReviews.total_count,
    minimum_delivery_tip: 0,
    maximum_delivery_tip: 0,
    images: carouselImages,
  };

  const shopMenuGroups = {
    count: unOrderableShopMenuGroups.menu_categories.length,
    menu_groups: unOrderableShopMenuGroups.menu_categories.map((category) => ({
      id: category.id,
      name: category.name,
    })),
  };

  const shopMenus = unOrderableShopMenus.menu_categories.map((category) => ({
    menu_group_id: category.id,
    menu_group_name: category.name,
    menus: category.menus.map((menu) => ({
      id: menu.id,
      name: menu.name,
      description: menu.description ?? '',
      thumbnail_image: menu.image_urls?.[0] || '',
      is_sold_out: false,
      prices: (menu.option_prices || []).map((price, index) => ({
        id: index,
        name: price.option,
        price: price.price,
        is_selected: false,
      })),
    })),
  }));

  return (
    <>
      <Header name={shopInfoSummary.name} targetRef={targetRef} cartItemCount={totalQuantity} />
      <ImageCarousel images={carouselImages} targetRef={targetRef} />
      <ShopSummary id={shopId} shopInfoSummary={shopInfoSummaryData} isOrderable={false} />
      <ShopMenuGroups selectedMenu={selectedMenu} onSelect={handleScrollTo} shopMenuGroups={shopMenuGroups} />
      <ShopMenus
        menuGroupRefs={menuGroupRefs}
        handleChangeMenu={handleChangeMenu}
        isAutoScrolling={isAutoScrolling}
        shopMenus={shopMenus}
        isOrderable={false}
      />
    </>
  );
}
