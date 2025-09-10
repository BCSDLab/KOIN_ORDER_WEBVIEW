import { apiClient } from '..';
import {
  AddressSearchRequest,
  AddressSearchResponse,
  CampusDeliveryAddressRequest,
  CampusDeliveryAddressResponse,
  OffCampusDeliveryAddressRequest,
  RiderRequestResponse,
  OffCampusDeliveryValidateRequest,
} from './entity';
import { getAuthHeader } from '@/util/ts/auth';

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
    headers: getAuthHeader(),
  });
};

export const getRiderRequestMessages = async () => {
  return await apiClient.get<RiderRequestResponse>('delivery/rider-message', {
    headers: getAuthHeader(),
  });
};

export const postOffCampusDeliveryValidate = async (addressData: OffCampusDeliveryValidateRequest) => {
  return await apiClient.post('delivery/address/off-campus/validate', {
    body: addressData,
  });
};
