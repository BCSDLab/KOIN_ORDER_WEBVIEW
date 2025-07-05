import { apiClient } from '..';
import { CartResponse } from '@/api/cart/entity';
// import { useTokenStore } from '@/stores/auth';

// const token = useTokenStore.getState().token; // 배포 시 또는 브릿지 테스트 시 사용
const token = localStorage.getItem('token'); // 개발용

export const getCart = async () => {
  return await apiClient.get<CartResponse>('cart', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const validateCart = async () => {
  return await apiClient.get<CartResponse>('cart/validate', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const resetCart = async () => {
  return await apiClient.delete('cart/reset', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteCartItem = async (cartMenuItemId: number) => {
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
  return await apiClient.post(`cart/quantity/${cartMenuItemId}/${quantity}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
