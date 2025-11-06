import { CartResponse } from '@/api/cart/entity';

export const CART_WITH_ITEMS: CartResponse = {
  shop_name: '굿모닝살로만치킨',
  shop_thumbnail_image_url: 'https://static.koreatech.in/test.png',
  orderable_shop_id: 2,
  is_delivery_available: true,
  is_takeout_available: true,
  shop_minimum_order_amount: 15000,
  items: [
    {
      cart_menu_item_id: 12,
      orderable_shop_menu_id: 3,
      name: '허니콤보',
      menu_thumbnail_image_url: 'https://static.koreatech.in/test.png',
      quantity: 1,
      total_amount: 23000,
      price: {
        name: null,
        price: 23000,
      },
      options: [],
      is_modified: false,
    },
    {
      cart_menu_item_id: 13,
      orderable_shop_menu_id: 4,
      name: '레드콤보',
      menu_thumbnail_image_url: 'https://static.koreatech.in/test.png',
      quantity: 2,
      total_amount: 47000,
      price: {
        name: '뼈',
        price: 23000,
      },
      options: [
        {
          option_group_name: '소스 추가',
          option_name: '레드디핑 소스',
          option_price: 500,
        },
      ],
      is_modified: false,
    },
  ],
  items_amount: 70000,
  delivery_fee: 0,
  total_amount: 70000,
  final_payment_amount: 70000,
};

export const EMPTY_CART: CartResponse = {
  shop_name: '',
  shop_thumbnail_image_url: '',
  orderable_shop_id: 0,
  is_delivery_available: false,
  is_takeout_available: false,
  shop_minimum_order_amount: 0,
  items: [],
  total_amount: 0,
  items_amount: 0,
  delivery_fee: 0,
  final_payment_amount: 0,
};
