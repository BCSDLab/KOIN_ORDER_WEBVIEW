import { apiClient } from '..';
import { InProgressOrder, OrderParams, OrderResponse } from './entity';
import { getAuthHeader } from '@/util/ts/auth';

export const getOrder = async (params: OrderParams) => {
  return await apiClient.get<OrderResponse, OrderParams>('order', {
    headers: getAuthHeader(),
    params,
  });
};

export const getInProgressOrder = async () => {
  return await apiClient.get<InProgressOrder[]>('order/in-progress', {
    headers: getAuthHeader(),
  });
};
