export interface Order {
  id: number;
  payment_id: number;
  orderable_shop_id: number;
  orderable_shop_name: string;
  open_status: boolean;
  orderable_shop_thumbnail: string;
  order_date: string;
  order_status: 'CONFIRMING' | 'COOKING' | 'PACKAGED' | 'PICKED_UP' | 'DELIVERING' | 'DELIVERED' | 'CANCELED';
  order_title: string;
  total_amount: number;
}

export interface OrderResponse {
  orders: Order[];
  total_count: number;
  current_count: number;
  current_page: number;
  total_page: number;
}

export interface OrderParams {
  page: number;
  limit: number;
  period: 'NONE' | 'LAST_3MONTH' | 'LAST_6MONTH' | 'LAST_1YEAR';
  status: 'NONE' | 'COMPLETED' | 'CANCELED';
  type: 'NONE' | 'DELIVERY' | 'TAKE_OUT';
  query: string;
}

export interface InProgressOrder {
  id: number;
  payment_id: number;
  order_type: 'DELIVERY' | 'TAKE_OUT';
  orderable_shop_name: string;
  orderable_shop_thumbnail: string;
  estimated_at: string;
  order_status: 'CONFIRMING' | 'COOKING' | 'PACKAGED' | 'PICKED_UP' | 'DELIVERING' | 'DELIVERED' | 'CANCELED';
  order_title: string;
  total_amount: number;
}
