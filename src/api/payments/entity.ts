export interface DeliveryTemporaryRequest {
  address: string;
  address_detail: string;
  longitude: number;
  latitude: number;
  phone_number: string;
  to_owner: string;
  to_rider: string;
  total_menu_price: number;
  delivery_type: 'CAMPUS' | 'OFF_CAMPUS';
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
  orderable_shop_id: number;
  amount: number;
  requested_at: string;
  approved_at: string;
  payment_method: string;
  delivery_address: string;
  delivery_address_details: string;
  shop_address: string;
  longitude: number;
  latitude: number;
  to_owner: string;
  to_rider: string;
  provide_cutlery: boolean;
  shop_name: string;
  menus: {
    name: string;
    quantity: number;
    price: number;
    options: {
      option_group_name: string;
      option_name: string;
      option_price: number;
    }[];
  }[];
  order_type: 'DELIVERY' | 'TAKE_OUT';
  easy_pay_company: 'string';
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
