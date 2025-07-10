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
import { useTokenStore } from '@/stores/auth';

const token = useTokenStore.getState().token; // 배포 시 또는 브릿지 테스트 시 사용
// const token = localStorage.getItem('token');

export const getTemporaryDelivery = async (body: DeliveryTemporaryRequest) => {
  const response = await apiClient.post<TemporaryResponse>('payments/delivery/temporary', {
    body,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const getTemporaryTakeout = async (body: TakeoutTemporaryRequest) => {
  const response = await apiClient.post<TemporaryResponse>('payments/takeout/temporary', {
    body,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const confirmPayments = async (body: ConfirmPaymentsRequest) => {
  const response = await apiClient.post<ConfirmPaymentsResponse>('payments/confirm', {
    body,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const cancelPayment = async (paymentKey: string, body: CancelPaymentRequest) => {
  const response = await apiClient.post<CancelPaymentResponse>(`payments/${paymentKey}/cancel`, {
    body,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
