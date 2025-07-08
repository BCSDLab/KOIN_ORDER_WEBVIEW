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
export interface OffCampusDeliveryAddressRequest {
  zip_number: string;
  si_do: string;
  si_gun_gu: string;
  eup_myeon_dong: string;
  road: string;
  building: string;
  detail_address: string;
  full_address: string;
}

interface RiderRequestMessage {
  content: string;
}

export interface RiderRequestResponse {
  count: number;
  contents: RiderRequestMessage[];
}
