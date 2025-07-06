import { apiClient } from '..';
import { AddressSearchRequest, AddressSearchResponse } from './entity';
import { PostAddressObjType } from '@/stores/useOrderStore';
import { CampusDeliveryAddressRequest, CampusDeliveryAddressResponse } from '@/types/api/deliveryCampus';

const getToken = () => localStorage.getItem('token');

export const getRoadNameAddress = async ({ keyword, currentPage, countPerPage }: AddressSearchRequest) => {
  const response = await apiClient.get<AddressSearchResponse>('address/search', {
    params: {
      keyword,
      currentPage,
      countPerPage,
    },
  });

  return response;
};

export const getCampusDeliveryAddress = async ({ filter }: CampusDeliveryAddressRequest) => {
  const response = await apiClient.get<CampusDeliveryAddressResponse>('address/delivery/campus', {
    params: {
      filter,
    },
  });

  return response;
};

export const postUserDeliveryAddress = async (addressData: PostAddressObjType) => {
  const token = getToken();
  const response = await apiClient.post('delivery/address/off-campus', {
    body: addressData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};
