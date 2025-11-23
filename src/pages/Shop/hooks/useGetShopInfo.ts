import { useSuspenseQuery } from '@tanstack/react-query';
import {
  getShopInfo,
  getShopInfoSummary,
  getShopMenuDetail,
  getShopMenuGroups,
  getUnorderableShopInfo,
  getUnorderableShopInfoSummary,
  getUnorderableShopMenus,
} from '@/api/shop';
import { Price } from '@/api/shop/entity';

export const useGetShopInfo = (orderableShopId: number) => {
  return useSuspenseQuery({
    queryKey: ['shopInfo', orderableShopId],
    queryFn: () => getShopInfo({ orderableShopId }),
  });
};

export const useGetShopInfoSummary = (orderableShopId: number) => {
  return useSuspenseQuery({
    queryKey: ['shopInfoSummary', orderableShopId],
    queryFn: () => getShopInfoSummary({ orderableShopId }),
  });
};

export const useGetShopMenuGroups = (orderableShopId: number) => {
  return useSuspenseQuery({
    queryKey: ['shopMenuGroups', orderableShopId],
    queryFn: () => getShopMenuGroups({ orderableShopId }),
  });
};

export const useGetUnorderableShopMenuGroups = (UnorderableShopId: number) => {
  return useSuspenseQuery({
    queryKey: ['unorderableShopMenuGroups', UnorderableShopId],
    queryFn: () => getUnorderableShopInfo({ UnorderableShopId }),
    select: (data) => ({
      count: data.menu_categories.length,
      menu_groups: data.menu_categories.map((category) => ({
        id: category.id,
        name: category.name,
      })),
    }),
  });
};

export const useGetShopMenuDetail = (orderableShopId: number, orderableShopMenuId: number) => {
  return useSuspenseQuery({
    queryKey: ['shopMenuDetail', orderableShopId, orderableShopMenuId],
    queryFn: () => getShopMenuDetail({ orderableShopId, orderableShopMenuId }),
  });
};

export const useGetUnorderableShopInfo = (UnorderableShopId: number) => {
  return useSuspenseQuery({
    queryKey: ['unorderableShopInfo', UnorderableShopId],
    queryFn: () => getUnorderableShopInfo({ UnorderableShopId }),
    select: (data) => ({
      shop_id: data.id,
      orderable_shop_id: null,
      name: data.name,
      introduction: data.description,
      pay_card: data.pay_card,
      pqy_bank: data.pay_bank,
      is_delivery_available: false,
      is_takeout_available: false,
      minimum_order_amount: 0,
      minimum_delivery_tip: 0,
      maximum_delivery_tip: 0,
      images:
        data.image_urls?.map((url, index) => ({
          image_url: url,
          is_thumbnail: index === 1 ? true : false,
        })) || [],
    }),
  });
};

export const useGetUnorderableShopInfoSummary = (UnorderableShopId: number) => {
  return useSuspenseQuery({
    queryKey: ['unorderableShopInfoSummary', UnorderableShopId],
    queryFn: () => getUnorderableShopInfoSummary({ UnorderableShopId }),
  });
};

export const useGetUnorderableShopMenus = (unorderableShopId: number) => {
  return useSuspenseQuery({
    queryKey: ['unorderableShopMenus', unorderableShopId],
    queryFn: () => getUnorderableShopMenus({ UnorderableShopId: unorderableShopId }),
    select: (data) =>
      data.menu_categories.map((category) => ({
        menu_group_id: category.id,
        menu_group_name: category.name,
        menus: category.menus.map((menu) => {
          const hasOptions = menu.option_prices && menu.option_prices.length > 0;

          const prices: Price[] = hasOptions
            ? menu.option_prices.map((option, index) => ({
                id: index,
                name: option.option ?? null,
                price: option.price,
                is_selected: false,
              }))
            : [
                {
                  id: 0,
                  name: null,
                  price: menu.single_price,
                  is_selected: false,
                },
              ];

          return {
            id: menu.id,
            name: menu.name,
            description: menu.description ?? '',
            thumbnail_image: menu.image_urls?.[0] || '',
            is_sold_out: menu.is_hidden,
            prices,
          };
        }),
      })),
  });
};
