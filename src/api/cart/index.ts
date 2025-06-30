import { apiClient } from '..';
import { CartResponse } from '@/types/api/cart';

const getToken = () => localStorage.getItem('token');

export const getCart = async () => {
  const token = getToken();
  return await apiClient.get<CartResponse>('cart', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
