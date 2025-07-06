import { apiClient } from '..';
import {
  shopDeliveryInfoResponse,
  ShopDetailInfoParams,
  ShopDetailInfoResponse,
  ShopInfoResponse,
  ShopInfoParams,
  ShopInfoSummaryResponse,
  ShopMenuGroupsResponse,
} from './entity';

export const getShopDetailInfo = async ({ orderableShopId }: ShopDetailInfoParams) => {
  const response = await apiClient.get<ShopDetailInfoResponse>(`order/shop/${orderableShopId}/detail`);
  return response;
};

export const getShopDeliveryInfo = async ({ orderableShopId }: ShopDetailInfoParams) => {
  const response = await apiClient.get<shopDeliveryInfoResponse>(`order/shop/${orderableShopId}/delivery`);
  return response;
};

export const getShopInfo = async ({ orderableShopId }: ShopInfoParams) => {
  const response = await apiClient.get<ShopInfoResponse[]>(`order/shop/${orderableShopId}/menus`);
  return response;
};

export const getShopInfoSummary = async ({ orderableShopId }: ShopInfoParams) => {
  const response = await apiClient.get<ShopInfoSummaryResponse>(`order/shop/${orderableShopId}/summary`);
  return response;
};

export const getShopMenuGroups = async ({ orderableShopId }: ShopInfoParams) => {
  const response = await apiClient.get<ShopMenuGroupsResponse>(`order/shop/${orderableShopId}/menus/groups`);
  return response;
};
