import { apiClient } from '..';
import {
  ShopDeliveryInfoResponse,
  ShopDetailInfoParams,
  ShopDetailInfoResponse,
  ShopInfoResponse,
  OrderableShopInfoParams,
  UnOrderableShopInfoParams,
  ShopInfoSummaryResponse,
  ShopMenuGroupsResponse,
  ShopMenuDetailResponse,
  UnOrderableShopDetailInfoResponse,
  UnOrderableShopMenusResponse,
} from './entity';

export const getShopDetailInfo = async ({ orderableShopId }: ShopDetailInfoParams) => {
  const response = await apiClient.get<ShopDetailInfoResponse>(`order/shop/${orderableShopId}/detail`);
  return response;
};

export const getShopDeliveryInfo = async ({ orderableShopId }: ShopDetailInfoParams) => {
  const response = await apiClient.get<ShopDeliveryInfoResponse>(`order/shop/${orderableShopId}/delivery`);
  return response;
};

export const getShopInfo = async ({ orderableShopId }: OrderableShopInfoParams) => {
  const response = await apiClient.get<ShopInfoResponse[]>(`order/shop/${orderableShopId}/menus`);
  return response;
};

export const getUnOrderableShopMenus = async ({ UnOrderableShopId }: UnOrderableShopInfoParams) => {
  const response = await apiClient.get<UnOrderableShopMenusResponse>(`shops/${UnOrderableShopId}/menus`);
  return response;
};

export const getShopInfoSummary = async ({ orderableShopId }: OrderableShopInfoParams) => {
  const response = await apiClient.get<ShopInfoSummaryResponse>(`order/shop/${orderableShopId}/summary`);
  return response;
};

export const getShopMenuGroups = async ({ orderableShopId }: OrderableShopInfoParams) => {
  const response = await apiClient.get<ShopMenuGroupsResponse>(`order/shop/${orderableShopId}/menus/groups`);
  return response;
};

export const getShopMenuDetail = async ({ orderableShopId, orderableShopMenuId }: OrderableShopInfoParams) => {
  const response = await apiClient.get<ShopMenuDetailResponse>(
    `order/shop/${orderableShopId}/menus/${orderableShopMenuId}`,
  );
  return response;
};

export const getUnOrderableShopInfo = async ({ UnOrderableShopId }: UnOrderableShopInfoParams) => {
  const response = await apiClient.get<UnOrderableShopDetailInfoResponse>(`shops/${UnOrderableShopId}`);
  return response;
};

export const getUnOrderableShopInfoSummary = async ({ UnOrderableShopId }: UnOrderableShopInfoParams) => {
  const response = await apiClient.get<ShopInfoSummaryResponse>(`shops/${UnOrderableShopId}/summary`);
  return response;
};
