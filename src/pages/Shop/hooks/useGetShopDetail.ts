import { useSuspenseQuery } from '@tanstack/react-query';
import { getShopDetailInfo, getUnOrderableShopInfo } from '@/api/shop';

export const useGetShopDetail = (orderableShopId: number) => {
  return useSuspenseQuery({
    queryKey: ['shopDetail', orderableShopId],
    queryFn: () => getShopDetailInfo({ orderableShopId }),
  });
};

export const useGetUnOrderableShopDetail = (UnOrderableShopId: number) => {
  return useSuspenseQuery({
    queryKey: ['unOrderableShopDetail', UnOrderableShopId],
    queryFn: () => getUnOrderableShopInfo({ UnOrderableShopId }),
    select: (data) => ({
      shop_id: data.id,
      orderable_shop_id: 0,
      name: data.name,
      address: data.address,
      open_time: data.open[0].open_time ?? '',
      close_time: data.open[0].close_time ?? '',
      closed_days: data.open.filter((time) => time.closed).map((time) => time.day_of_week),
      phone: data.phone,
      introduction: data.description as string | null,
      notice: '',
      delivery_tips: [],
      owner_info: {
        name: '',
        shop_name: '',
        address: '',
        company_registration_number: '',
      },
      origins: [],
    }),
  });
};
