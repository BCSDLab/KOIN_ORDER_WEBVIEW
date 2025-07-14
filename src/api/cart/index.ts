import { apiClient } from '..';
import { ShopMenuDetailResponse } from '../shop/entity';
import { AddCartRequest, CartResponse, CartSummaryResponse, UpdateCartItemRequest } from '@/api/cart/entity';
import { useTokenStore } from '@/stores/auth';

function authHeader() {
  const token = useTokenStore.getState().token;
  return { Authorization: `Bearer ${token}` };
}

// const token = useTokenStore.getState().token;

// const token = localStorage.getItem('token'); // 개발용

export const getCart = async (type: 'DELIVERY' | 'TAKE_OUT') => {
  return await apiClient.get<CartResponse>('cart', {
    headers: authHeader(),
    params: {
      type: type,
    },
  });
};

export const validateCart = async () => {
  return await apiClient.get<CartResponse>('cart/validate', {
    headers: authHeader(),
  });
};

export const resetCart = async () => {
  return await apiClient.delete('cart/reset', {
    headers: authHeader(),
  });
};

export const deleteCartItem = async (cartMenuItemId: number) => {
  return await apiClient.delete(`cart/delete/${cartMenuItemId}`, {
    headers: authHeader(),
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
    headers: authHeader(),
  });
};

export const addCart = async ({ menuInfo }: AddCartRequest) => {
  return await apiClient.post('cart/add', {
    body: menuInfo,
    headers: authHeader(),
  });
};

export const getCartSummary = async ({ orderableShopId }: { orderableShopId: number }) => {
  return await apiClient.get<CartSummaryResponse>(`cart/summary/${orderableShopId}`, {
    headers: authHeader(),
  });
};

export const getCartItemOptions = async (cartMenuItemId: number) => {
  return await apiClient.get<ShopMenuDetailResponse>(`cart/item/${cartMenuItemId}/edit`, {
    headers: authHeader(),
  });
};

export const updateCartItemOptions = async (cartMenuItemId: number, body: UpdateCartItemRequest) => {
  return await apiClient.put(`cart/item/${cartMenuItemId}`, {
    body,
    headers: authHeader(),
  });
};
