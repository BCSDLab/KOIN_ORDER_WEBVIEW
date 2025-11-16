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
  RelatedSearchResponse,
  RelatedSearchParams,
  ShopCategoriesResponse,
  OrderableShopsResponse,
  OrderableShopsParams,
  ShopListResponse,
  ShopListParams,
  NearbyStoresRelateSearchResponse,
  NearbyStoresRelateSearchParams,
  UnorderableShopReviewsResponse,
  ReportReviewRequest,
  ReviewReportCategoriesResponse,
  GetShopTotalReviewParams,
  GetMyShopReviewsParams,
} from './entity';
import { getAuthHeader } from '@/util/ts/auth';

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
  const response = await apiClient.get<UnorderableShopDetailInfoResponse>(`v2/shops/${UnorderableShopId}`);
  return response;
};

export const getUnorderableShopInfoSummary = async ({ UnorderableShopId }: UnorderableShopInfoParams) => {
  const response = await apiClient.get<ShopInfoSummaryResponse>(`shops/${UnorderableShopId}/summary`);
  return response;
};

export const getRelateSearch = async ({ keyword }: RelatedSearchParams) => {
  const response = await apiClient.get<RelatedSearchResponse>(`order/shop/search/related`, {
    params: { keyword },
  });
  return response;
};

export const getShopCategories = async () => {
  return await apiClient.get<ShopCategoriesResponse>('shops/categories');
};

export const getOrderableShops = async (params: OrderableShopsParams) => {
  const response = await apiClient.get<OrderableShopsResponse[], OrderableShopsParams>(`/order/shops`, {
    params,
  });
  return response;
};

export const getShopList = async (params: ShopListParams) => {
  const response = await apiClient.get<ShopListResponse, ShopListParams>(`/v3/shops`, {
    params,
  });
  return response;
};

export const getNearbyStoresRelateSearch = async ({ keyword }: NearbyStoresRelateSearchParams) => {
  const response = await apiClient.get<NearbyStoresRelateSearchResponse>('v2/shops/search/related', {
    params: { keyword },
  });
  return response;
};

export const getShopTotalReview = async ({ shopId, page, limit, sorter }: GetShopTotalReviewParams) => {
  const params = { page, limit, sorter };

  const response = await apiClient.get<UnorderableShopReviewsResponse>(`/shops/${shopId}/reviews`, { params });

  return response;
};

export const reportReview = async (shopId: number, reviewId: number, body: ReportReviewRequest) => {
  return await apiClient.post(`/shops/${shopId}/reviews/${reviewId}/reports`, {
    body,
    headers: getAuthHeader(),
  });
};

export const getReviewReportCategories = async () => {
  const response = await apiClient.get<ReviewReportCategoriesResponse>('/shops/reviews/reports/categories');
  return response;
};

export const getMyShopReviews = async ({ shopId, params }: GetMyShopReviewsParams) => {
  const response = await apiClient.get<UnorderableShopReviewsResponse>(`/shops/${shopId}/reviews/me`, { params });

  return response;
};
