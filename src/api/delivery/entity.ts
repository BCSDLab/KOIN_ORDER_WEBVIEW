import { addressCategories } from '@/constants/deliveryCampus';

/** 요청/응답 참고: https://business.juso.go.kr/addrlink/openApi/searchApi.do */
export interface AddressSearchRequest {
  currentPage: string;
  countPerPage: string;
  keyword: string;
}

export interface AddressSearchResponse {
  addresses: Juso[];
  count_per_page: number;
  current_page: number;
  total_count: string;
}

export interface CommonResponse {
  totalCount: string;
  currentPage: number;
  countPerPage: number;
  errorCode: string;
  errorMessage: string;
}

export interface Juso {
  bd_nm: string;
  emd_nm: string;
  eng_address: string;
  jibun_address: string;
  li_nm: string;
  rn: string;
  road_address: string;
  sgg_nm: string;
  si_nm: string;
  zip_no: string;
}

export type AddressCategory = (typeof addressCategories)[number];

export interface CampusDeliveryAddressRequest {
  filter: 'ALL' | AddressCategory;
}

export interface CampusDeliveryAddress {
  id: number;
  type: '기숙사' | '공학관' | '그 외';
  full_address: string;
  short_address: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface CampusDeliveryAddressResponse {
  count: number;
  addresses: CampusDeliveryAddress[];
}

export interface OffCampusDeliveryAddressRequest {
  zip_number: string;
  si_do: string;
  si_gun_gu: string;
  eup_myeon_dong: string;
  road: string;
  building: string;
  address: string;
  detail_address: string;
}

interface RiderRequestMessage {
  content: string;
}

export interface RiderRequestResponse {
  count: number;
  contents: RiderRequestMessage[];
}

export interface OffCampusDeliveryValidateRequest {
  si_do: string;
  si_gun_gu: string;
  eup_myeon_dong: string;
  building: string;
}
