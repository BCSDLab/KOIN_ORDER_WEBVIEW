import { useSuspenseQuery } from '@tanstack/react-query';
import {
  getShopInfo,
  getShopInfoSummary,
  getShopMenuDetail,
  getShopMenuGroups,
  getUnOrderableShopInfo,
  getUnOrderableShopReviews,
  getUnOrderableShopMenus,
} from '@/api/shop';

export const useGetShopInfo = (orderableShopId: number) => {
  return useSuspenseQuery({
    queryKey: ['shopInfo', orderableShopId],
    queryFn: () => getShopInfo({ orderableShopId }),
  });
};

export const useGetShopInfoSummary = (orderableShopId: number) => {
  return useSuspenseQuery({
    queryKey: ['shopInfoSummary', orderableShopId],
    queryFn: () => getShopInfoSummary({ orderableShopId }),
  });
};

export const useGetShopMenuGroups = (orderableShopId: number) => {
  return useSuspenseQuery({
    queryKey: ['shopMenuGroups', orderableShopId],
    queryFn: () => getShopMenuGroups({ orderableShopId }),
  });
};

export const useGetUnOrderableShopMenuGroups = (UnOrderableShopId: number) => {
  return useSuspenseQuery({
    queryKey: ['unOrderableShopMenuGroups', UnOrderableShopId],
    queryFn: () => getUnOrderableShopInfo({ UnOrderableShopId }),
  });
};

export const useGetShopMenuDetail = (orderableShopId: number, orderableShopMenuId: number) => {
  return useSuspenseQuery({
    queryKey: ['shopMenuDetail', orderableShopId],
    queryFn: () => getShopMenuDetail({ orderableShopId, orderableShopMenuId }),
  });
};

export const useGetUnOrderableShopInfo = (UnOrderableShopId: number) => {
  return useSuspenseQuery({
    queryKey: ['unOrderableShopInfo', UnOrderableShopId],
    queryFn: () => getUnOrderableShopInfo({ UnOrderableShopId }),
  });
};

export const useGetUnOrderableShopReviews = (UnOrderableShopId: number) => {
  return useSuspenseQuery({
    queryKey: ['unOrderableShopReviews', UnOrderableShopId],
    queryFn: () => getUnOrderableShopReviews({ UnOrderableShopId }),
  });
};

export const useGetUnOrderableShopMenus = (UnOrderableShopId: number) => {
  return useSuspenseQuery({
    queryKey: ['unOrderableShopMenus', UnOrderableShopId],
    queryFn: () => getUnOrderableShopMenus({ UnOrderableShopId }),
  });
};
