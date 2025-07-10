import { apiClient } from '..';
import {
  AddressSearchRequest,
  AddressSearchResponse,
  CampusDeliveryAddressRequest,
  CampusDeliveryAddressResponse,
  OffCampusDeliveryAddressRequest,
  RiderRequestResponse,
  CampusDeliveryValidateRequest,
} from './entity';
import { useTokenStore } from '@/stores/auth';

const token = useTokenStore.getState().token; // 배포 시 또는 브릿지 테스트 시 사용
// const token = localStorage.getItem('token'); // 개발용

export const getRoadNameAddress = async ({ keyword, currentPage, countPerPage }: AddressSearchRequest) => {
  return await apiClient.get<AddressSearchResponse>('address/search', {
    params: {
      keyword,
      currentPage,
      countPerPage,
    },
  });
};

export const getCampusDeliveryAddress = async ({ filter }: CampusDeliveryAddressRequest) => {
  return await apiClient.get<CampusDeliveryAddressResponse>('address/delivery/campus', {
    params: {
      filter,
    },
  });
};

export const postUserDeliveryAddress = async (addressData: OffCampusDeliveryAddressRequest) => {
  return await apiClient.post('delivery/address/off-campus', {
    body: addressData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getRiderRequestMessages = async () => {
  return await apiClient.get<RiderRequestResponse>('delivery/rider-message', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const postOffCampusDeliveryValidate = async (addressData: CampusDeliveryValidateRequest) => {
  return await apiClient.post('delivery/address/off-campus/validate', {
    body: addressData,
  });
};
