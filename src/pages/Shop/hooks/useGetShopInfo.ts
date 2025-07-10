import { useSuspenseQuery } from '@tanstack/react-query';
import { getShopInfo, getShopInfoSummary, getShopMenuDetail, getShopMenuGroups } from '@/api/shop';

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

export const useGetShopMenuDetail = (orderableShopId: number, orderableShopMenuId: number) => {
  return useSuspenseQuery({
    queryKey: ['shopMenuDetail', orderableShopId],
    queryFn: () => getShopMenuDetail({ orderableShopId, orderableShopMenuId }),
  });
};
