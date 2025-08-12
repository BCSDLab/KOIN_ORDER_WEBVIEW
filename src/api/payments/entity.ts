export interface DeliveryTemporaryRequest {
  address: string;
  phone_number: string;
  to_owner: string;
  to_rider: string;
  total_menu_price: number;
  delivery_tip: number;
  provide_cutlery: boolean;
  total_amount: number;
}

export interface TakeoutTemporaryRequest {
  phone_number: string;
  to_owner: string;
  provide_cutlery: boolean;
  total_menu_price: number;
  total_amount: number;
}

export interface TemporaryResponse {
  order_id: string;
}

export interface ConfirmPaymentsRequest {
  payment_key: string;
  order_id: string;
  amount: number;
}

export interface ConfirmPaymentsResponse {
  id: number;
  amount: number;
  requested_at: string;
  approved_at: string;
  payment_method: string;
  delivery_address: string;
  shop_address: string;
  to_owner: string;
  to_rider: string;
  provide_cutlery: boolean;
  shop_name: string;
  menus: {
    name: string;
    quantity: number;
    options: {
      option_group_name: string;
      option_name: string;
      option_price: number;
    }[];
  }[];
  order_type: 'DELIVERY' | 'TAKE_OUT';
}

export interface CancelPaymentRequest {
  cancel_reason: string;
}

export interface CancelPaymentResponse {
  payment_cancels: {
    id: number;
    cancel_reason: string;
    cancel_amount: number;
    canceled_at: string;
  }[];
}
