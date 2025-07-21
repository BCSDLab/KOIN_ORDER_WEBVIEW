import { apiClient } from '..';
import { ShopMenuDetailResponse } from '../shop/entity';
import { AddCartRequest, CartResponse, CartSummaryResponse, UpdateCartItemRequest } from '@/api/cart/entity';
import { getAuthHeader } from '@/util/ts/auth';

export const getCart = async (type: 'DELIVERY' | 'TAKE_OUT') => {
  return await apiClient.get<CartResponse>('cart', {
    headers: getAuthHeader(),
    params: {
      type: type,
    },
  });
};

export const validateCart = async () => {
  return await apiClient.get<CartResponse>('cart/validate', {
    headers: getAuthHeader(),
  });
};

export const resetCart = async () => {
  return await apiClient.delete('cart/reset', {
    headers: getAuthHeader(),
  });
};

export const deleteCartItem = async (cartMenuItemId: number) => {
  return await apiClient.delete(`cart/delete/${cartMenuItemId}`, {
    headers: getAuthHeader(),
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
    headers: getAuthHeader(),
  });
};

export const addCart = async ({ menuInfo }: AddCartRequest) => {
  return await apiClient.post('cart/add', {
    body: menuInfo,
    headers: getAuthHeader(),
  });
};

export const getCartSummary = async ({ orderableShopId }: { orderableShopId: number }) => {
  return await apiClient.get<CartSummaryResponse>(`cart/summary/${orderableShopId}`, {
    headers: getAuthHeader(),
  });
};

export const getCartItemOptions = async (cartMenuItemId: number) => {
  return await apiClient.get<ShopMenuDetailResponse>(`cart/item/${cartMenuItemId}/edit`, {
    headers: getAuthHeader(),
  });
};

export const updateCartItemOptions = async (cartMenuItemId: number, body: UpdateCartItemRequest) => {
  return await apiClient.put(`cart/item/${cartMenuItemId}`, {
    body,
    headers: getAuthHeader(),
  });
};
