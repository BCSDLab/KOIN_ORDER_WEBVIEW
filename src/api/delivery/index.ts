import { apiClient } from '..';
import { AddressSearchRequest, AddressSearchResponse } from './entity';
import { CampusDeliveryAddressRequest, CampusDeliveryAddressResponse } from '@/types/api/deliveryCampus';

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

  const { count, addresses } = response;
  return { count, addresses };
};
