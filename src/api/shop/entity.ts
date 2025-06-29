export type ShopDetailInfoParams = {
  orderableShopId: number;
};

type DeliveryTips = {
  from_amount: number;
  to_amount: number;
  fee: number;
};

type OwnerInfo = {
  name: string;
  shop_name: string;
  address: string;
  company_registration_number: string;
};

type OriginInfo = {
  ingredient: string;
  origin: string;
};

export type Day = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';

export type ShopDetailInfoResponse = {
  shop_id: number;
  orderable_shop_id: number;
  name: string;
  address: string;
  open_time: string | null;
  close_time: string | null;
  closed_days: Day[];
  phone: string;
  introduction: string | null;
  notice: string | null;
  delivery_tips: DeliveryTips[];
  owner_info: OwnerInfo;
  origins: OriginInfo[];
};
