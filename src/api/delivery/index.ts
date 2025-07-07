import { apiClient } from '..';
import { AddressSearchRequest, AddressSearchResponse } from './entity';
import { PostAddressObjType } from '@/stores/useOrderStore';
import { CampusDeliveryAddressRequest, CampusDeliveryAddressResponse } from '@/types/api/deliveryCampus';
// import { useTokenStore } from '@/stores/auth';

// const token = useTokenStore.getState().token; // 배포 시 또는 브릿지 테스트 시 사용
const token = localStorage.getItem('token'); // 개발용

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
  const response = await apiClient.post('delivery/address/off-campus', {
    body: addressData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};
