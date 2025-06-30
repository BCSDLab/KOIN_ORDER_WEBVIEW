import { apiClient } from '..';
import {
  ConfirmPaymentsRequest,
  ConfirmPaymentsResponse,
  DeliveryTemporaryRequest,
  DeliveryTemporaryResponse,
} from '@/types/api/payments';

const getToken = () => localStorage.getItem('token');

export const getTemporaryDelivery = async (body: DeliveryTemporaryRequest) => {
  const token = getToken();
  const response = await apiClient.post<DeliveryTemporaryResponse>('payments/delivery/temporary', {
    body,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const confirmPayments = async (body: ConfirmPaymentsRequest) => {
  const token = getToken();
  const response = await apiClient.post<ConfirmPaymentsResponse>('payments/confirm', {
    body,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
