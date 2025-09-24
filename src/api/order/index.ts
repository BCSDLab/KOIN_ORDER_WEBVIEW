import { apiClient } from '..';
import { OrderParams, OrderResponse } from './entity';
import { getAuthHeader } from '@/util/ts/auth';

export const getOrder = async (params: OrderParams) => {
  return await apiClient.get<OrderResponse, OrderParams>('order', {
    headers: getAuthHeader(),
    params,
  });
};
