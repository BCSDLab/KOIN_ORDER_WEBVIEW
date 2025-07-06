import { addressCategories } from '@/constants/deliveryCampus';

export type AddressCategory = (typeof addressCategories)[number];

export interface CampusDeliveryAddressRequest {
  filter: 'ALL' | AddressCategory;
}

export interface CampusDeliveryAddressResponse {
  count: number;
  addresses: CampusDeliveryAddress[];
}

export interface CampusDeliveryAddress {
  id: number;
  type: '기숙사' | '공학관' | '그 외';
  full_address: string;
  short_address: string;
}
