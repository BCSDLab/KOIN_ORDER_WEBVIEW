export interface DeliveryTemporaryRequest {
  address: string;
  phone_number: string;
  to_owner: string;
  to_rider: string;
  total_menu_price: number;
  delivery_tip: number;
  total_amount: number;
}

export interface DeliveryTemporaryResponse {
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
}
