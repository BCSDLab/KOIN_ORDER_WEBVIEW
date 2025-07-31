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
  delivery_tips: DeliveryTips[] | [];
  owner_info: OwnerInfo;
  origins: OriginInfo[] | [];
}

export interface Time {
  day_of_week: Day;
  closed: boolean;
  open_time: string | null;
  close_time: string | null;
}

export interface CategoryGroup {
  id: number;
  name: string;
}

export interface UnOrderableShopDetailInfoResponse {
  address: string;
  delivery: boolean;
  delivery_price: number;
  description: string;
  id: number;
  image_urls: string[];
  menu_categories: MenuGroup[];
  name: string;
  open: Time[];
  pay_bank: boolean;
  pay_card: boolean;
  phone: string;
  main_category_id: number;
  shop_categories: CategoryGroup[];
  updated_at: string;
  is_event: boolean;
  bank: string | null;
  account_number: string | null;
}

interface Rating {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
}

interface ReviewStatistics {
  average_rating: number;
  ratings: Rating;
}

interface Review {
  review_id: number;
  rating: number;
  nick_name: string;
  content: string;
  image_urls: string[];
  menu_names: string[];
  is_mine: boolean;
  is_modified: boolean;
  is_reported: boolean;
  created_at: string;
}

export interface UnOrderableShopReviewsResponse {
  total_count: number;
  current_count: number;
  total_page: number;
  current_page: number;
  statistics: ReviewStatistics;
  reviews: Review[];
}

export interface ShopDeliveryInfoResponse {
  campus_delivery: boolean;
  off_campus_delivery: boolean;
}

export interface OrderableShopInfoParams {
  orderableShopId: number;
  orderableShopMenuId?: number;
}

export interface UnOrderableShopInfoParams {
  UnOrderableShopId: number;
}

export interface Price {
  id: number;
  name: string | null;
  price: number;
  is_selected: boolean;
}

export interface Menu {
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

interface UnOrderableOptions {
  option: string;
  price: number;
}

export interface UnOrderableMenu {
  id: number;
  name: string;
  is_hidden: boolean;
  is_single: boolean;
  single_price: number;
  option_prices: UnOrderableOptions[];
  description: string | null;
  image_urls: string[];
}

interface UnOrderableMenuCategory {
  id: number;
  name: string;
  menus: UnOrderableMenu[];
}

export interface UnOrderableShopMenusResponse {
  count: number;
  menu_categories: UnOrderableMenuCategory[];
  updated_at: string;
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
