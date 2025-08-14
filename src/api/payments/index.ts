import { apiClient } from '..';
import {
  CancelPaymentRequest,
  CancelPaymentResponse,
  ConfirmPaymentsRequest,
  ConfirmPaymentsResponse,
  DeliveryTemporaryRequest,
  TakeoutTemporaryRequest,
  TemporaryResponse,
} from '@/api/payments/entity';
import { getAuthHeader } from '@/util/ts/auth';

export const getTemporaryDelivery = async (body: DeliveryTemporaryRequest) => {
  const response = await apiClient.post<TemporaryResponse>('payments/delivery/temporary', {
    body,
    headers: getAuthHeader(),
  });
  return response;
};

export const getTemporaryTakeout = async (body: TakeoutTemporaryRequest) => {
  const response = await apiClient.post<TemporaryResponse>('payments/takeout/temporary', {
    body,
    headers: getAuthHeader(),
  });
  return response;
};

export const getPaymentInfo = async (paymentId: number) => {
  const response = await apiClient.get<ConfirmPaymentsResponse>(`payments/${paymentId}`, {
    headers: getAuthHeader(),
  });
  return response;
};

export const confirmPayments = async (body: ConfirmPaymentsRequest) => {
  const response = await apiClient.post<ConfirmPaymentsResponse>('payments/confirm', {
    body,
    headers: getAuthHeader(),
  });
  return response;
};

export const cancelPayment = async (paymentId: number, body: CancelPaymentRequest) => {
  const response = await apiClient.post<CancelPaymentResponse>(`payments/${paymentId}/cancel`, {
    body,
    headers: getAuthHeader(),
  });
  return response;
};
