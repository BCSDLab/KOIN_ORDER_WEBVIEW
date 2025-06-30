export interface CampusDeliveryAddressRequest {
  filter: string;
}

export interface CampusDeliveryAddressResponse {
  count: number;
  addresses: CampusDeliveryAddress[];
}

export interface CampusDeliveryAddress {
  id: number;
  type: string;
}
