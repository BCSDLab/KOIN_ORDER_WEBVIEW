import { apiClient } from '..';
import {
  ShopDeliveryInfoResponse,
  ShopDetailInfoParams,
  ShopDetailInfoResponse,
  ShopInfoResponse,
  OrderableShopInfoParams,
  UnorderableShopInfoParams,
  ShopInfoSummaryResponse,
  ShopMenuGroupsResponse,
  ShopMenuDetailResponse,
  UnorderableShopDetailInfoResponse,
  UnorderableShopMenusResponse,
  StoreCategoriesResponse,
  OrderableShopsResponse,
  OrderableShopsParams,
  StoreListResponse,
  StoreListParams,
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

export const getUnorderableShopMenus = async ({ UnorderableShopId }: UnorderableShopInfoParams) => {
  const response = await apiClient.get<UnorderableShopMenusResponse>(`shops/${UnorderableShopId}/menus`);
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

export const getUnorderableShopInfo = async ({ UnorderableShopId }: UnorderableShopInfoParams) => {
  const response = await apiClient.get<UnorderableShopDetailInfoResponse>(`shops/${UnorderableShopId}`);
  return response;
};

export const getUnorderableShopInfoSummary = async ({ UnorderableShopId }: UnorderableShopInfoParams) => {
  const response = await apiClient.get<ShopInfoSummaryResponse>(`shops/${UnorderableShopId}/summary`);
  return response;
};

export const getStoreCategories = async () => {
  return await apiClient.get<StoreCategoriesResponse>('shops/categories');
};

export const getOrderableShops = async (params: OrderableShopsParams) => {
  const response = await apiClient.get<OrderableShopsResponse[], OrderableShopsParams>(`/order/shops`, {
    params,
  });
  return response;
};

export const getStoreList = async (params: StoreListParams) => {
  const response = await apiClient.get<StoreListResponse, StoreListParams>(`/v3/shops`, {
    params,
  });
  return response;
};
