export interface CartItem {
  cart_menu_item_id: number;
  name: string;
  menu_thumbnail_image_url: string | null;
  quantity: number;
  total_amount: number;
  price: {
    name: string | null;
    price: number;
  };
  options: {
    option_group_name: string;
    option_name: string;
    option_price: number;
  }[];
  is_modified: boolean;
}

export interface CartResponse {
  shop_name: string;
  shop_thumbnail_image_url: string;
  orderable_shop_id: number;
  is_delivery_available: boolean;
  is_takeout_available: boolean;
  shop_minimum_order_amount: number;
  items: CartItem[];
  items_amount: number;
  delivery_fee: number;
  total_amount: number;
  final_payment_amount: number;
}

export interface CartSummaryResponse {
  orderable_shop_id: number;
  shop_mininum_order_amount: number;
  cart_items_amount: number;
  is_available: boolean;
}

export interface AddCartRequest {
  menuInfo: {
    orderable_shop_id: number;
    orderable_shop_menu_id: number;
    orderable_shop_menu_price_id: number;
    orderable_shop_menu_option_ids: {
      option_group_id: number;
      option_id: number;
    }[];
    quantity: number;
  };
}
