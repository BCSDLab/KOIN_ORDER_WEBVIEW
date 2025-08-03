import { useGetUnOrderableShopInfo } from '../hooks/useGetShopInfo';
import ShopDetail from '.';

interface UnOrderableShopDetailProps {
  shopId: string;
}

export default function UnOrderableShopDetail({ shopId }: UnOrderableShopDetailProps) {
  const { data: shopInfo } = useGetUnOrderableShopInfo(Number(shopId));

  const data = {
    shop_id: shopInfo.id,
    orderable_shop_id: 0,
    name: shopInfo.name,
    address: shopInfo.address,
    open_time: shopInfo.open[0].open_time ?? '',
    close_time: shopInfo.open[0].close_time ?? '',
    closed_days: shopInfo.open.filter((time) => time.closed).map((time) => time.day_of_week),
    phone: shopInfo.phone,
    introduction: shopInfo.description as string | null,
    notice: '',
    delivery_tips: [],
    owner_info: {
      name: '',
      shop_name: '',
      address: '',
      company_registration_number: '',
    },
    origins: [],
  };

  return <ShopDetail shopInfo={data} />;
}
