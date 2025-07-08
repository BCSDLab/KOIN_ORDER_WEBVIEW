export interface ShopDetailInfoParams {
  orderableShopId: number;
}

interface DeliveryTips {
  from_amount: number;
  to_amount: number;
  fee: number;
}

interface OwnerInfo {
  name: string;
  shop_name: string;
  address: string;
  company_registration_number: string;
}

interface OriginInfo {
  ingredient: string;
  origin: string;
}

export type Day = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';

export interface ShopDetailInfoResponse {
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
}

export interface ShopDeliveryInfoResponse {
  campus_delivery: boolean;
  off_campus_delivery: boolean;
}

export interface ShopInfoParams {
  orderableShopId: number;
  orderableShopMenuId?: number;
}

export interface Price {
  id: number;
  name: string | null;
  price: number;
}

interface Menu {
  id: number;
  name: string;
  description: string;
  thumbnail_image: string;
  is_sold_out: boolean;
  prices: Price[];
}

export interface ShopInfoResponse {
  menu_group_id: number;
  menu_group_name: string;
  menus: Menu[];
}

interface Image {
  image_url: string;
  is_thumbnail: boolean;
}

export interface ShopInfoSummaryResponse {
  shop_id: number;
  orderable_shop_id: number;
  name: string;
  introduction: string | null;
  pay_card: boolean;
  pqy_bank: boolean;
  is_delivery_available: boolean;
  is_takeout_available: boolean;
  minimum_order_amount: number;
  rating_average: number;
  review_count: number;
  minimum_delivery_tip: number;
  maximum_delivery_tip: number;
  images: Image[];
}

interface MenuGroup {
  id: number;
  name: string;
}

export interface ShopMenuGroupsResponse {
  count: number;
  menu_groups: MenuGroup[];
}

export interface OptionGroup {
  id: number;
  name: string;
  description?: string | null;
  is_required: boolean;
  min_select: number;
  max_select: number;
  options: Price[];
}

export interface ShopMenuDetailResponse {
  id: number;
  name: string;
  description: string | null;
  images: string[];
  prices: Price[];
  option_groups: OptionGroup[];
}
