import { apiClient } from '..';
import { CartResponse } from '@/api/cart/entity';

const getToken = () => localStorage.getItem('token');

export const getCart = async (orderType: 'DELIVERY' | 'TAKE_OUT') => {
  const token = getToken();
  return await apiClient.get<CartResponse>(`cart?type=${orderType}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const validateCart = async () => {
  const token = getToken();
  return await apiClient.get<CartResponse>('cart/validate', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const resetCart = async () => {
  const token = getToken();
  return await apiClient.delete('cart/reset', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteCartItem = async (cartMenuItemId: number) => {
  const token = getToken();
  return await apiClient.delete(`cart/delete/${cartMenuItemId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateCartItemQuantity = async ({
  cartMenuItemId,
  quantity,
}: {
  cartMenuItemId: number;
  quantity: number;
}) => {
  const token = getToken();
  return await apiClient.post(`cart/quantity/${cartMenuItemId}/${quantity}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
