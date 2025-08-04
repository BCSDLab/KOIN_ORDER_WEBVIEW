import { useSuspenseQuery } from '@tanstack/react-query';
import { getShopInfo, getShopInfoSummary, getShopMenuDetail, getShopMenuGroups } from '@/api/shop';
import { deleteCookie } from '@/util/ts/cookie';

function isErrorWithStatus(error: unknown, statusCode: number): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    typeof (error as Record<string, unknown>).status === 'number' &&
    (error as Record<string, unknown>).status === statusCode
  );
}

export const useGetShopInfo = (orderableShopId: number) => {
  return useSuspenseQuery({
    queryKey: ['shopInfo', orderableShopId],
    queryFn: () => getShopInfo({ orderableShopId }),
  });
};

export const useGetShopInfoSummary = (orderableShopId: number) => {
  return useSuspenseQuery({
    queryKey: ['shopInfoSummary', orderableShopId],
    queryFn: async () => {
      try {
        return await getShopInfoSummary({ orderableShopId });
      } catch (error: unknown) {
        if (isErrorWithStatus(error, 401)) {
          deleteCookie('AUTH_TOKEN_KEY');
          try {
            return await getShopInfoSummary({ orderableShopId });
          } catch (retryError) {
            throw retryError;
          }
        }
        throw error;
      }
    },
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
