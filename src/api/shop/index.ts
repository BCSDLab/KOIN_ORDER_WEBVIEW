import { apiClient } from '..';
import { shopDeliveryInfoResponse, ShopDetailInfoParams, ShopDetailInfoResponse } from './entity';

export const getShopDetailInfo = async ({ orderableShopId }: ShopDetailInfoParams) => {
  const response = await apiClient.get<ShopDetailInfoResponse>(`order/shop/${orderableShopId}/detail`);
  return response;
};

export const getShopDeliveryInfo = async ({ orderableShopId }: ShopDetailInfoParams) => {
  const response = await apiClient.get<shopDeliveryInfoResponse>(`order/shop/${orderableShopId}/delivery`);
  return response;
};
