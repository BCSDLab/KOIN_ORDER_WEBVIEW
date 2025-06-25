import { apiClient } from '..';
import { AddressSearchRequest, AddressSearchResponse } from '@/types/api/roadAddress';

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
