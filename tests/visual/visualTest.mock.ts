import { StudentUserResponse } from '@/api/auth/entity';
import { CartResponse, CartSummaryResponse } from '@/api/cart/entity';
import { AddressSearchResponse, CampusDeliveryAddressResponse, RiderRequestResponse } from '@/api/delivery/entity';
import { InProgressOrder, OrderResponse } from '@/api/order/entity';
import {
  OrderableShopsResponse,
  RelatedSearchResponse,
  ShopCategoriesResponse,
  ShopDeliveryInfoResponse,
  ShopDetailInfoResponse,
  ShopInfoResponse,
  ShopInfoSummaryResponse,
  ShopListResponse,
  ShopMenuDetailResponse,
  ShopMenuGroupsResponse,
  UnorderableShopDetailInfoResponse,
  UnorderableShopMenusResponse,
} from '@/api/shop/entity';

interface MOCK_IMAGESType {
  [key: string]: string;
}

const MOCK_SHOPS_CATEGORIES_IMAGES: MOCK_IMAGESType = {
  all: '/src/assets/test/all.webp',
  chicken: '/src/assets/test/chicken.webp',
  pizzaAndBurger: '/src/assets/test/pizzaAndBurger.webp',
  meat: '/src/assets/test/meat.webp',
  packedLunchAndSnackFood: '/src/assets/test/packedLunchAndSnackFood.webp',
  bar: '/src/assets/test/bar.webp',
  koreanFood: '/src/assets/test/koreanFood.webp',
  chineseFood: '/src/assets/test/chineseFood.webp',
  jokbal: '/src/assets/test/jokbal.webp',
  cafe: '/src/assets/test/cafe.webp',
  callBen: '/src/assets/test/callBen.webp',
  others: '/src/assets/test/others.webp',
};

const MOCK_ORDER_TEST_IMAGE: string = '/src/assets/test/kimbapHeaven.webp';

const MOCK_ORDER_SHOP_2_IMAGE: string = '/src/assets/test/goodMorningSalomanChicken.webp';

const MOCK_ORDER_SHOP_2_MENU_IMAGE: string = '/src/assets/test/menu.webp';

const MOCK_ORDER_SHOPS_IMAGES: MOCK_IMAGESType = {
  kimbapHeaven: '/src/assets/test/kimbapHeaven.webp',
  maslen: '/src/assets/test/maslen.webp',
  byeongcheonRawFishRestaurant: '/src/assets/test/byeongcheonRawFishRestaurant.webp',
};

const MOCK_SHOP_21_IMAGE: string = '/src/assets/test/stoneGrilledPorkBelly.webp';

const MOCK_SHOP_IMAGES: MOCK_IMAGESType = {
  universityStore: '/src/assets/test/universityStore.webp',
  bungBungCallBen: '/src/assets/test/bungBungCallBen.webp',
};

export const MOCK_ORDER_SHOP_SEARCH_RELATED_RESULTS: RelatedSearchResponse = {
  search_keyword: '피자',
  processed_search_keyword: '피자',
  shop_name_search_result_count: 1,
  menu_name_search_result_count: 12,
  shop_name_search_results: [
    {
      orderable_shop_id: 8,
      orderable_shop_name: '오구쌀피자',
    },
  ],
  menu_name_search_results: [
    {
      orderable_shop_id: 8,
      orderable_shop_name: '오구쌀피자',
      menu_name: '불고기 쌀피자',
    },
    {
      orderable_shop_id: 8,
      orderable_shop_name: '오구쌀피자',
      menu_name: '포테이토 쌀피자',
    },
    {
      orderable_shop_id: 8,
      orderable_shop_name: '오구쌀피자',
      menu_name: '고구마 쌀피자',
    },
    {
      orderable_shop_id: 8,
      orderable_shop_name: '오구쌀피자',
      menu_name: '콤비네이션 쌀피자',
    },
    {
      orderable_shop_id: 8,
      orderable_shop_name: '오구쌀피자',
      menu_name: '핫치킨 쌀피자',
    },
    {
      orderable_shop_id: 8,
      orderable_shop_name: '오구쌀피자',
      menu_name: '반반피자',
    },
    {
      orderable_shop_id: 8,
      orderable_shop_name: '오구쌀피자',
      menu_name: '페퍼로니 피자',
    },
    {
      orderable_shop_id: 8,
      orderable_shop_name: '오구쌀피자',
      menu_name: '치즈 피자',
    },
    {
      orderable_shop_id: 8,
      orderable_shop_name: '오구쌀피자',
      menu_name: '하와이안 피자',
    },
    {
      orderable_shop_id: 8,
      orderable_shop_name: '오구쌀피자',
      menu_name: '쉬림프 골드 피자',
    },
    {
      orderable_shop_id: 8,
      orderable_shop_name: '오구쌀피자',
      menu_name: '스테이크 피자',
    },
    {
      orderable_shop_id: 8,
      orderable_shop_name: '오구쌀피자',
      menu_name: '1인 피자 세트',
    },
  ],
};

export const MOCK_SHOPS_CATEGORIES_RESULTS: ShopCategoriesResponse = {
  total_count: 12,
  shop_categories: [
    {
      id: 1,
      image_url: MOCK_SHOPS_CATEGORIES_IMAGES.all,
      name: '전체보기',
    },
    {
      id: 2,
      image_url: MOCK_SHOPS_CATEGORIES_IMAGES.chicken,
      name: '치킨',
    },
    {
      id: 3,
      image_url: MOCK_SHOPS_CATEGORIES_IMAGES.pizzaAndBurger,
      name: '피자/버거',
    },
    {
      id: 7,
      image_url: MOCK_SHOPS_CATEGORIES_IMAGES.meat,
      name: '고깃집',
    },
    {
      id: 4,
      image_url: MOCK_SHOPS_CATEGORIES_IMAGES.packedLunchAndSnackFood,
      name: '도시락/분식',
    },
    {
      id: 9,
      image_url: MOCK_SHOPS_CATEGORIES_IMAGES.bar,
      name: '주점',
    },
    {
      id: 8,
      image_url: MOCK_SHOPS_CATEGORIES_IMAGES.koreanFood,
      name: '한식',
    },
    {
      id: 6,
      image_url: MOCK_SHOPS_CATEGORIES_IMAGES.chineseFood,
      name: '중국집',
    },
    {
      id: 5,
      image_url: MOCK_SHOPS_CATEGORIES_IMAGES.jokbal,
      name: '족발',
    },
    {
      id: 10,
      image_url: MOCK_SHOPS_CATEGORIES_IMAGES.cafe,
      name: '카페',
    },
    {
      id: 11,
      image_url: MOCK_SHOPS_CATEGORIES_IMAGES.callBen,
      name: '콜밴',
    },
    {
      id: 12,
      image_url: MOCK_SHOPS_CATEGORIES_IMAGES.others,
      name: '기타',
    },
  ],
};

export const MOCK_ORDER_RESULTS1: OrderResponse = {
  total_count: 10,
  current_count: 5,
  total_page: 2,
  current_page: 1,
  orders: [
    {
      id: 1,
      payment_id: 1,
      orderable_shop_id: 1,
      orderable_shop_name: '김밥 천국',
      open_status: false,
      orderable_shop_thumbnail: MOCK_ORDER_TEST_IMAGE,
      order_date: '2025-11-02',
      order_status: 'DELIVERED',
      order_title: '김밥 외 1건',
      total_amount: 12300,
    },
  ],
};

export const MOCK_ORDER_RESULTS2: OrderResponse = {
  total_count: 10,
  current_count: 5,
  total_page: 2,
  current_page: 2,
  orders: [
    {
      id: 2,
      payment_id: 2,
      orderable_shop_id: 2,
      orderable_shop_name: '김밥 천국ㅁㅁ',
      open_status: false,
      orderable_shop_thumbnail: MOCK_ORDER_TEST_IMAGE,
      order_date: '2025-11-02',
      order_status: 'DELIVERED',
      order_title: '김밥 외 1건',
      total_amount: 12300,
    },
  ],
};

export const MOCK_ORDER_IN_PROGRESS_RESULTS: InProgressOrder[] = [
  {
    id: 1,
    orderable_shop_id: 14,
    payment_id: 1,
    order_type: 'TAKE_OUT',
    orderable_shop_name: '김밥 천국',
    orderable_shop_thumbnail: MOCK_ORDER_TEST_IMAGE,
    estimated_at: '17:45',
    order_status: 'COOKING',
    order_title: '라면 외 1건',
    total_amount: 10000,
  },
];

export const MOCK_ORDER_SHOP_2_SUMMARY_RESULTS: ShopInfoSummaryResponse = {
  shop_id: 11,
  orderable_shop_id: 2,
  name: '굿모닝살로만치킨',
  introduction:
    '안녕하세요, 굿모닝 살로만 치킨입니다!\n최상급 국내산 닭고기를 사용해 바삭하고 촉촉한 치킨을 제공합니다.\n매일 신선한 재료로 정성껏 요리하며, 고객님의 행복한 식사를 위해 최선을 다하겠습니다.\n가족, 친구와 함께 즐기는 맛있는 치킨으로 특별한 순간을 만들어 보세요!\n언제나 굿모닝처럼 상쾌한 기분을 드리겠습니다.',
  is_delivery_available: true,
  is_takeout_available: true,
  pay_card: true,
  pay_bank: true,
  minimum_order_amount: 14000,
  rating_average: 4,
  review_count: 22,
  minimum_delivery_tip: 1500,
  maximum_delivery_tip: 3500,
  images: [
    {
      image_url: MOCK_ORDER_SHOP_2_IMAGE,
      is_thumbnail: true,
    },
  ],
};

export const MOCK_SUMMARY_2_RESULTS: CartSummaryResponse = {
  orderable_shop_id: 101,
  shop_minimum_order_amount: 20000,
  cart_items_amount: 17500,
  is_available: true,
};

export const MOCK_SHOP_2_MENUS_GROUPS_RESULTS: ShopMenuGroupsResponse = {
  count: 5,
  menu_groups: [
    {
      id: 7,
      name: '메인메뉴',
    },
    {
      id: 8,
      name: '추천메뉴',
    },
    {
      id: 9,
      name: '세트메뉴ㅁ',
    },
    {
      id: 10,
      name: '사이드메뉴',
    },
    {
      id: 11,
      name: '반반치킨',
    },
  ],
};

export const MOCK_ORDER_SHOP_2_MENUS_RESULTS: ShopInfoResponse[] = [
  {
    menu_group_id: 7,
    menu_group_name: '메인메뉴',
    menus: [
      {
        id: 11,
        name: '후라이드 치킨',
        description: '바삭하고 고소한 오리지널 후라이드',
        thumbnail_image: MOCK_ORDER_SHOP_2_MENU_IMAGE,
        is_sold_out: false,
        prices: [
          {
            id: 23,
            name: null,
            price: 19000,
            is_selected: false,
          },
        ],
      },
      {
        id: 12,
        name: '양념 치킨',
        description: '달콤매콤한 특제 양념 소스',
        thumbnail_image: MOCK_ORDER_SHOP_2_MENU_IMAGE,
        is_sold_out: false,
        prices: [
          {
            id: 24,
            name: null,
            price: 20000,
            is_selected: false,
          },
        ],
      },
      {
        id: 13,
        name: '간장마늘 치킨',
        description: '짭쪼름한 간장과 알싸한 마늘의 조화',
        thumbnail_image: MOCK_ORDER_SHOP_2_MENU_IMAGE,
        is_sold_out: true,
        prices: [
          {
            id: 25,
            name: null,
            price: 20000,
            is_selected: false,
          },
        ],
      },
    ],
  },
  {
    menu_group_id: 8,
    menu_group_name: '추천메뉴',
    menus: [
      {
        id: 14,
        name: '반반치킨',
        description: '두 가지 맛을 한 번에!',
        thumbnail_image: MOCK_ORDER_SHOP_2_MENU_IMAGE,
        is_sold_out: false,
        prices: [
          {
            id: 26,
            name: null,
            price: 21000,
            is_selected: false,
          },
        ],
      },
      {
        id: 15,
        name: '치떡세트',
        description: '치킨 한마리와 매콤달콤 떡볶이',
        thumbnail_image: MOCK_ORDER_SHOP_2_MENU_IMAGE,
        is_sold_out: false,
        prices: [
          {
            id: 27,
            name: null,
            price: 25000,
            is_selected: false,
          },
        ],
      },
    ],
  },
  {
    menu_group_id: 9,
    menu_group_name: '세트메뉴',
    menus: [
      {
        id: 14,
        name: '반반치킨',
        description: '두 가지 맛을 한 번에!',
        thumbnail_image: MOCK_ORDER_SHOP_2_MENU_IMAGE,
        is_sold_out: false,
        prices: [
          {
            id: 26,
            name: null,
            price: 21000,
            is_selected: false,
          },
        ],
      },
      {
        id: 15,
        name: '치떡세트',
        description: '치킨 한마리와 매콤달콤 떡볶이',
        thumbnail_image: MOCK_ORDER_SHOP_2_MENU_IMAGE,
        is_sold_out: false,
        prices: [
          {
            id: 27,
            name: null,
            price: 25000,
            is_selected: false,
          },
        ],
      },
    ],
  },
  {
    menu_group_id: 10,
    menu_group_name: '사이드메뉴',
    menus: [
      {
        id: 16,
        name: '감자튀김',
        description: '치킨과 함께 먹으면 더욱 맛있는 바삭한 감자튀김',
        thumbnail_image: MOCK_ORDER_SHOP_2_MENU_IMAGE,
        is_sold_out: true,
        prices: [
          {
            id: 28,
            name: '중',
            price: 4000,
            is_selected: false,
          },
          {
            id: 29,
            name: '대',
            price: 6000,
            is_selected: false,
          },
        ],
      },
      {
        id: 17,
        name: '치즈볼',
        description: '쫀득한 찹쌀 안에 고소한 치즈가 듬뿍',
        thumbnail_image: MOCK_ORDER_SHOP_2_MENU_IMAGE,
        is_sold_out: false,
        prices: [
          {
            id: 30,
            name: '5개',
            price: 5000,
            is_selected: false,
          },
          {
            id: 31,
            name: '10개',
            price: 8500,
            is_selected: false,
          },
        ],
      },
      {
        id: 18,
        name: '콜라 1.25L',
        description: '',
        thumbnail_image: MOCK_ORDER_SHOP_2_MENU_IMAGE,
        is_sold_out: false,
        prices: [
          {
            id: 32,
            name: null,
            price: 2500,
            is_selected: false,
          },
        ],
      },
      {
        id: 19,
        name: '사이다 1.25L',
        description: '',
        thumbnail_image: MOCK_ORDER_SHOP_2_MENU_IMAGE,
        is_sold_out: false,
        prices: [
          {
            id: 33,
            name: null,
            price: 2500,
            is_selected: false,
          },
        ],
      },
    ],
  },
  {
    menu_group_id: 11,
    menu_group_name: '반반치킨',
    menus: [
      {
        id: 14,
        name: '반반치킨',
        description: '두 가지 맛을 한 번에!',
        thumbnail_image: MOCK_ORDER_SHOP_2_MENU_IMAGE,
        is_sold_out: false,
        prices: [
          {
            id: 26,
            name: null,
            price: 21000,
            is_selected: false,
          },
        ],
      },
    ],
  },
];

export const MOCK_CART_RESULTS: CartResponse = {
  shop_name: '굿모닝살로만치킨',
  shop_thumbnail_image_url: MOCK_ORDER_SHOP_2_IMAGE,
  orderable_shop_id: 2,
  is_delivery_available: true,
  is_takeout_available: true,
  shop_minimum_order_amount: 14000,
  items: [
    {
      cart_menu_item_id: 1002,
      orderable_shop_menu_id: 11,
      name: '후라이드 치킨',
      menu_thumbnail_image_url: MOCK_ORDER_SHOP_2_MENU_IMAGE,
      quantity: 1,
      total_amount: 19000,
      price: {
        name: null,
        price: 19000,
      },
      options: [],
      is_modified: false,
    },
  ],
  items_amount: 19000,
  delivery_fee: 3500,
  total_amount: 22500,
  final_payment_amount: 22500,
};

export const MOCK_ORDER_SHOP_2_MENUS_11_RESULTS: ShopMenuDetailResponse = {
  id: 11,
  quantity: 1,
  name: '후라이드 치킨',
  description: '바삭하고 고소한 오리지널 후라이드',
  images: [MOCK_ORDER_SHOP_2_MENU_IMAGE],
  prices: [
    {
      id: 23,
      name: null,
      price: 19000,
      is_selected: false,
    },
  ],
  option_groups: [
    {
      id: 4,
      name: '뼈/순살 변경',
      description: '뼈 또는 순살을 선택하세요.',
      is_required: false,
      min_select: 0,
      max_select: 1,
      options: [
        {
          id: 10,
          name: '순살로 변경',
          price: 2000,
          is_selected: false,
        },
      ],
    },
    {
      id: 5,
      name: '음료 추가',
      description: '음료를 추가할 수 있습니다.',
      is_required: false,
      min_select: 0,
      max_select: 3,
      options: [
        {
          id: 11,
          name: '콜라 1.25L',
          price: 2500,
          is_selected: false,
        },
        {
          id: 12,
          name: '사이다 1.25L',
          price: 2500,
          is_selected: false,
        },
        {
          id: 13,
          name: '생맥주 1000cc',
          price: 8000,
          is_selected: false,
        },
      ],
    },
  ],
};

export const MOCK_ORDER_SHOP_2_DETAIL_RESULTS: ShopDetailInfoResponse = {
  shop_id: 11,
  orderable_shop_id: 2,
  name: '굿모닝살로만치킨',
  address: '충청남도 천안시 동남구 병천면 충절로 1638 (신한아파트)',
  open_time: '16:00',
  close_time: '23:00',
  closed_days: [],
  phone: '041-557-7942',
  introduction:
    '안녕하세요, 굿모닝 살로만 치킨입니다!\n최상급 국내산 닭고기를 사용해 바삭하고 촉촉한 치킨을 제공합니다.\n매일 신선한 재료로 정성껏 요리하며, 고객님의 행복한 식사를 위해 최선을 다하겠습니다.\n가족, 친구와 함께 즐기는 맛있는 치킨으로 특별한 순간을 만들어 보세요!\n언제나 굿모닝처럼 상쾌한 기분을 드리겠습니다.',
  notice:
    '*굿모닝 치킨 이벤트*\n치킨 2마리 주문 시 콜라 1.25L 무료 증정!\n50,000원 이상 주문 시 감자튀김 서비스 제공!\n매주 월요일은 치킨 10% 할인 데이!\n포장 주문 시 추가 5% 할인!\n배달 주문은 빠르고 따뜻하게 도착합니다.',
  delivery_tips: [
    {
      from_amount: 15000,
      to_amount: 20000,
      fee: 3500,
    },
    {
      from_amount: 20000,
      to_amount: 50000,
      fee: 1500,
    },
  ],
  owner_info: {
    name: 'null',
    shop_name: 'null',
    address: 'null',
    company_registration_number: 'null',
  },
  origins: [
    {
      ingredient: '소고기',
      origin: '국내산 한우',
    },
    {
      ingredient: '쌀',
      origin: '국내산',
    },
    {
      ingredient: '배추',
      origin: '국내산',
    },
    {
      ingredient: '고추',
      origin: '국내산',
    },
    {
      ingredient: '마늘',
      origin: '국내산',
    },
  ],
};

export const MOCK_ADDRESS_SEARCH_RESULTS: AddressSearchResponse = {
  total_count: '1',
  current_page: 1,
  count_per_page: 10,
  addresses: [
    {
      road_address: '충청남도 천안시 동남구 병천면 충절로 1600',
      jibun_address: '충청남도 천안시 동남구 병천면 가전리 307 한국기술교육대학교',
      eng_address: '1600 Chungjeol-ro, Byeongcheon-myeon, Dongnam-gu, Cheonan-si, Chungcheongnam-do',
      zip_no: '31253',
      bd_nm: '한국기술교육대학교',
      si_nm: '충청남도',
      sgg_nm: '천안시 동남구',
      emd_nm: '병천면',
      li_nm: '가전리',
      rn: '충절로',
    },
  ],
};

export const MOCK_ADDRESS_DELIVERY_CAMPUS_DORMITORY_RESULTS: CampusDeliveryAddressResponse = {
  count: 11,
  addresses: [
    {
      id: 1,
      type: '기숙사',
      full_address: '충청남도 천안시 동남구 병천면 충절로 1600 한국기술교육대학교 제1캠퍼스 생활관 101동',
      short_address: '101동(해울)',
      address: '충청남도 천안시 동남구 병천면 충절로 1600 한국기술교육대학교 제1캠퍼스 생활관rr',
      latitude: 36.76125794,
      longitude: 127.28372942,
    },
    {
      id: 2,
      type: '기숙사',
      full_address: '충청남도 천안시 동남구 병천면 충절로 1600 한국기술교육대학교 제1캠퍼스 생활관 102동',
      short_address: '102동(예지)',
      address: '충청남도 천안시 동남구 병천면 충절로 1600 한국기술교육대학교 제1캠퍼스 생활관',
      latitude: 36.76156794,
      longitude: 127.28315659,
    },
    {
      id: 3,
      type: '기숙사',
      full_address: '충청남도 천안시 동남구 병천면 충절로 1600 한국기술교육대학교 제1캠퍼스 생활관 103동',
      short_address: '103동(예솔)',
      address: '충청남도 천안시 동남구 병천면 충절로 1600 한국기술교육대학교 제1캠퍼스 생활관',
      latitude: 36.76186385,
      longitude: 127.28376805,
    },
    {
      id: 4,
      type: '기숙사',
      full_address: '충청남도 천안시 동남구 병천면 충절로 1600 한국기술교육대학교 제1캠퍼스 생활관 104동',
      short_address: '104동(다솔)',
      address: '충청남도 천안시 동남구 병천면 충절로 1600 한국기술교육대학교 제1캠퍼스 생활관',
      latitude: 36.76242319,
      longitude: 127.28349572,
    },
    {
      id: 5,
      type: '기숙사',
      full_address: '충청남도 천안시 동남구 병천면 충절로 1600 한국기술교육대학교 제1캠퍼스 생활관 105동',
      short_address: '105동(함지)',
      address: '충청남도 천안시 동남구 병천면 충절로 1600 한국기술교육대학교 제1캠퍼스 생활관',
      latitude: 36.76202833,
      longitude: 127.28281109,
    },
    {
      id: 6,
      type: '기숙사',
      full_address: '충청남도 천안시 동남구 병천면 충절로 1600 한국기술교육대학교 제1캠퍼스 생활관 106동',
      short_address: '106동(한울)',
      address: '충청남도 천안시 동남구 병천면 충절로 1600 한국기술교육대학교 제1캠퍼스 생활관',
      latitude: 36.76163337,
      longitude: 127.28216566,
    },
    {
      id: 7,
      type: '기숙사',
      full_address: '충청남도 천안시 동남구 병천면 충절로 1600 한국기술교육대학교 제1캠퍼스 생활관 201동',
      short_address: '201동(솔빛)',
      address: '충청남도 천안시 동남구 병천면 충절로 1600 한국기술교육대학교 제1캠퍼스 생활관',
      latitude: 36.7613011,
      longitude: 127.28168287,
    },
    {
      id: 8,
      type: '기숙사',
      full_address: '충청남도 천안시 동남구 병천면 충절로 1600 한국기술교육대학교 제1캠퍼스 생활관 202동',
      short_address: '202동(청솔)',
      address: '충청남도 천안시 동남구 병천면 충절로 1600 한국기술교육대학교 제1캠퍼스 생활관',
      latitude: 36.76084201,
      longitude: 127.2814796,
    },
    {
      id: 9,
      type: '기숙사',
      full_address: '충청남도 천안시 동남구 병천면 충절로 1600 한국기술교육대학교 제1캠퍼스 생활관 203동',
      short_address: '203동(IH)',
      address: '충청남도 천안시 동남구 병천면 충절로 1600 한국기술교육대학교 제1캠퍼스 생활관',
      latitude: 36.76049078,
      longitude: 127.28139432,
    },
    {
      id: 10,
      type: '기숙사',
      full_address: '충청남도 천안시 동남구 병천면 충절로 1600 한국기술교육대학교 제1캠퍼스 생활관 204동',
      short_address: '204동(은솔)',
      address: '충청남도 천안시 동남구 병천면 충절로 1600 한국기술교육대학교 제1캠퍼스 생활관',
      latitude: 36.76015392,
      longitude: 127.28094511,
    },
    {
      id: 11,
      type: '기숙사',
      full_address: '충청남도 천안시 동남구 병천면 충절로 1600 한국기술교육대학교 제1캠퍼스 생활관 205동',
      short_address: '205동(참빛)',
      address: '충청남도 천안시 동남구 병천면 충절로 1600 한국기술교육대학교 제1캠퍼스 생활관',
      latitude: 36.76083418,
      longitude: 127.28098119,
    },
  ],
};

export const MOCK_ADDRESS_DELIVERY_CAMPUS_COLLEGE_BUILDING_RESULTS: CampusDeliveryAddressResponse = {
  count: 7,
  addresses: [
    {
      id: 12,
      type: '공학관',
      full_address: '충청남도 천안시 동남구 병천면 충절로 1600 한국기술교육대학교 공학 1관',
      short_address: '공학 1관',
      address: '충청남도 천안시 동남구 병천면 충절로 1600 한국기술교육대학교rr',
      latitude: 36.7654853,
      longitude: 127.28040455,
    },
    {
      id: 13,
      type: '공학관',
      full_address: '충청남도 천안시 동남구 병천면 충절로 1600 한국기술교육대학교 공학 2관',
      short_address: '공학 2관',
      address: '충청남도 천안시 동남구 병천면 충절로 1600 한국기술교육대학교',
      latitude: 36.76674321,
      longitude: 127.28194918,
    },
    {
      id: 14,
      type: '공학관',
      full_address: '충청남도 천안시 동남구 병천면 충절로 1600 한국기술교육대학교 공학 3관',
      short_address: '공학 3관',
      address: '충청남도 천안시 동남구 병천면 충절로 1600 한국기술교육대학교',
      latitude: 36.7648384,
      longitude: 127.27959579,
    },
    {
      id: 15,
      type: '공학관',
      full_address: '충청남도 천안시 동남구 병천면 충절로 1600 한국기술교육대학교 공학4관 A동',
      short_address: '공학4관 A동',
      address: '충청남도 천안시 동남구 병천면 충절로 1600 한국기술교육대학교',
      latitude: 36.76146765,
      longitude: 127.27984115,
    },
    {
      id: 16,
      type: '공학관',
      full_address: '충청남도 천안시 동남구 병천면 충절로 1600 한국기술교육대학교 공학4관 B동',
      short_address: '공학4관 B동',
      address: '충청남도 천안시 동남구 병천면 충절로 1600 한국기술교육대학교',
      latitude: 36.76174156,
      longitude: 127.28023413,
    },
    {
      id: 17,
      type: '공학관',
      full_address: '충청남도 천안시 동남구 병천면 충절로 1600 한국기술교육대학교 담헌실학관',
      short_address: '담헌실학관',
      address: '충청남도 천안시 동남구 병천면 충절로 1600 한국기술교육대학교',
      latitude: 36.76590843,
      longitude: 127.28247253,
    },
    {
      id: 18,
      type: '공학관',
      full_address: '충청남도 천안시 동남구 병천면 충절로 1600 한국기술교육대학교 인문경영관',
      short_address: '인문경영관',
      address: '충청남도 천안시 동남구 병천면 충절로 1600 한국기술교육대학교',
      latitude: 36.76498642,
      longitude: 127.28178594,
    },
  ],
};

export const MOCK_ADDRESS_DELIVERY_CAMPUS_ETC_RESULTS: CampusDeliveryAddressResponse = {
  count: 4,
  addresses: [
    {
      id: 19,
      type: '그 외',
      full_address: '충청남도 천안시 동남구 병천면 충절로 1600 한국기술교육대학교 테니스장',
      short_address: '테니스장',
      address: '충청남도 천안시 동남구 병천면 충절로 1600 한국기술교육대학교rr',
      latitude: 36.76282473,
      longitude: 127.2832676,
    },
    {
      id: 20,
      type: '그 외',
      full_address: '충청남도 천안시 동남구 병천면 충절로 1600 한국기술교육대학교 학생회관',
      short_address: '학생회관',
      address: '충청남도 천안시 동남구 병천면 충절로 1600 한국기술교육대학교',
      latitude: 36.76302056,
      longitude: 127.28238914,
    },
    {
      id: 21,
      type: '그 외',
      full_address: '충청남도 천안시 동남구 병천면 충절로 1600 한국기술교육대학교 다산정보관',
      short_address: '다산정보관',
      address: '충청남도 천안시 동남구 병천면 충절로 1600 한국기술교육대학교',
      latitude: 36.76362895,
      longitude: 127.28042579,
    },
    {
      id: 22,
      type: '그 외',
      full_address: '충청남도 천안시 동남구 병천면 충절로 1600 한국기술교육대학교 복지관',
      short_address: '복지관',
      address: '충청남도 천안시 동남구 병천면 충절로 1600 한국기술교육대학교',
      latitude: 36.76303229,
      longitude: 127.28124121,
    },
  ],
};

export const MOCK_USER_STUDENT_ME_RESULT: StudentUserResponse = {
  id: 6675,
  login_id: 'visualtest',
  anonymous_nickname: 'TdJktTfxnIdPU',
  email: 'null',
  gender: 0,
  major: '컴퓨터공학부',
  name: 'bcsdLabVisualTest',
  nickname: 'null',
  phone_number: 'null',
  student_number: '2022136000',
  user_type: 'STUDENT',
};

export const MOCK_ORDER_SHOPS_RESULTS: OrderableShopsResponse[] = [
  {
    shop_id: 11,
    orderable_shop_id: 2,
    name: '굿모닝살로만치킨',
    is_delivery_available: true,
    is_takeout_available: true,
    service_event: false,
    minimum_order_amount: 14000,
    rating_average: 3.9,
    review_count: 23,
    minimum_delivery_tip: 1500,
    maximum_delivery_tip: 3500,
    is_open: true,
    category_ids: [1, 2],
    images: [
      {
        image_url: MOCK_ORDER_SHOP_2_IMAGE,
        is_thumbnail: true,
      },
    ],
    open_status: 'OPERATING',
  },
  {
    shop_id: 13,
    orderable_shop_id: 3,
    name: '김밥천국',
    is_delivery_available: false,
    is_takeout_available: true,
    service_event: false,
    minimum_order_amount: 16000,
    rating_average: 4.7,
    review_count: 3,
    minimum_delivery_tip: 0,
    maximum_delivery_tip: 2500,
    is_open: true,
    category_ids: [2, 8],
    images: [
      {
        image_url: MOCK_ORDER_SHOPS_IMAGES.kimbapHeaven,
        is_thumbnail: true,
      },
      {
        image_url: MOCK_ORDER_SHOPS_IMAGES.kimbapHeaven,
        is_thumbnail: false,
      },
    ],
    open_status: 'OPERATING',
  },
  {
    shop_id: 28,
    orderable_shop_id: 5,
    name: '마슬랜',
    is_delivery_available: true,
    is_takeout_available: false,
    service_event: false,
    minimum_order_amount: 30000,
    rating_average: 0,
    review_count: 0,
    minimum_delivery_tip: 2500,
    maximum_delivery_tip: 4500,
    is_open: true,
    category_ids: [1],
    images: [
      {
        image_url: MOCK_ORDER_SHOPS_IMAGES.maslen,
        is_thumbnail: true,
      },
    ],
    open_status: 'OPERATING',
  },
  {
    shop_id: 39,
    orderable_shop_id: 6,
    name: '병천수산',
    is_delivery_available: true,
    is_takeout_available: false,
    service_event: false,
    minimum_order_amount: 12000,
    rating_average: 4.5,
    review_count: 2,
    minimum_delivery_tip: 1500,
    maximum_delivery_tip: 3500,
    is_open: true,
    category_ids: [1, 7],
    images: [
      {
        image_url: MOCK_ORDER_SHOPS_IMAGES.byeongcheonRawFishRestaurant,
        is_thumbnail: true,
      },
      {
        image_url: MOCK_ORDER_SHOPS_IMAGES.byeongcheonRawFishRestaurant,
        is_thumbnail: false,
      },
    ],
    open_status: 'OPERATING',
  },
  {
    shop_id: 34,
    orderable_shop_id: 10,
    name: '천안문',
    is_delivery_available: true,
    is_takeout_available: true,
    service_event: false,
    minimum_order_amount: 10000,
    rating_average: 0,
    review_count: 0,
    minimum_delivery_tip: 0,
    maximum_delivery_tip: 3000,
    is_open: true,
    category_ids: [1, 6],
    images: [],
    open_status: 'OPERATING',
  },
];

export const MOCK_SHOP_RESULTS: ShopListResponse = {
  count: 120,
  shops: [
    {
      category_ids: [1],
      delivery: false,
      id: 41,
      name: '복지관 매점',
      pay_bank: false,
      pay_card: true,
      phone: '041-560-1279',
      open: [
        {
          day_of_week: 'MONDAY',
          closed: false,
          open_time: '00:00',
          close_time: '00:00',
        },
        {
          day_of_week: 'TUESDAY',
          closed: false,
          open_time: '00:00',
          close_time: '00:00',
        },
        {
          day_of_week: 'WEDNESDAY',
          closed: false,
          open_time: '00:00',
          close_time: '00:00',
        },
        {
          day_of_week: 'THURSDAY',
          closed: false,
          open_time: '00:00',
          close_time: '00:00',
        },
        {
          day_of_week: 'FRIDAY',
          closed: false,
          open_time: '00:00',
          close_time: '00:00',
        },
        {
          day_of_week: 'SATURDAY',
          closed: false,
          open_time: '00:00',
          close_time: '00:00',
        },
        {
          day_of_week: 'SUNDAY',
          closed: false,
          open_time: '00:00',
          close_time: '00:00',
        },
      ],
      is_event: false,
      is_open: true,
      average_rate: 0,
      review_count: 0,
      benefit_details: 'test',
      images: [MOCK_SHOP_IMAGES.universityStore],
    },
    {
      category_ids: [1],
      delivery: false,
      id: 46,
      name: '붕붕콜밴',
      pay_bank: true,
      pay_card: true,
      phone: '010-8553-8222',
      open: [
        {
          day_of_week: 'MONDAY',
          closed: false,
          open_time: '00:00',
          close_time: '00:00',
        },
        {
          day_of_week: 'TUESDAY',
          closed: false,
          open_time: '00:00',
          close_time: '00:00',
        },
        {
          day_of_week: 'WEDNESDAY',
          closed: false,
          open_time: '00:00',
          close_time: '00:00',
        },
        {
          day_of_week: 'THURSDAY',
          closed: false,
          open_time: '00:00',
          close_time: '00:00',
        },
        {
          day_of_week: 'FRIDAY',
          closed: false,
          open_time: '00:00',
          close_time: '00:00',
        },
        {
          day_of_week: 'SATURDAY',
          closed: false,
          open_time: '00:00',
          close_time: '00:00',
        },
        {
          day_of_week: 'SUNDAY',
          closed: false,
          open_time: '00:00',
          close_time: '00:00',
        },
      ],
      is_event: false,
      is_open: true,
      average_rate: 0,
      review_count: 0,
      benefit_details: 'test',
      images: [MOCK_SHOP_IMAGES.bungBungCallBen],
    },
    {
      category_ids: [1],
      delivery: false,
      id: 55,
      name: '승천콜밴',
      pay_bank: true,
      pay_card: true,
      phone: '080-566-0055',
      open: [
        {
          day_of_week: 'MONDAY',
          closed: false,
          open_time: '00:00',
          close_time: '00:00',
        },
        {
          day_of_week: 'TUESDAY',
          closed: false,
          open_time: '00:00',
          close_time: '00:00',
        },
        {
          day_of_week: 'WEDNESDAY',
          closed: false,
          open_time: '00:00',
          close_time: '00:00',
        },
        {
          day_of_week: 'THURSDAY',
          closed: false,
          open_time: '00:00',
          close_time: '00:00',
        },
        {
          day_of_week: 'FRIDAY',
          closed: false,
          open_time: '00:00',
          close_time: '00:00',
        },
        {
          day_of_week: 'SATURDAY',
          closed: false,
          open_time: '00:00',
          close_time: '00:00',
        },
        {
          day_of_week: 'SUNDAY',
          closed: false,
          open_time: '00:00',
          close_time: '00:00',
        },
      ],
      is_event: false,
      is_open: true,
      average_rate: 0,
      review_count: 0,
      benefit_details: 'test',
      images: [],
    },
  ],
};

export const MOCK_SHOPS_21_RESULTS: UnorderableShopDetailInfoResponse = {
  address: '충청남도 천안시 동남구 목천읍 충절로 876',
  delivery: false,
  delivery_price: 0,
  description: '-',
  id: 21,
  image_urls: [MOCK_SHOP_21_IMAGE],
  menu_categories: [
    {
      id: 24,
      name: '추천 메뉴',
    },
    {
      id: 151,
      name: '메인 메뉴',
    },
    {
      id: 405,
      name: '세트 메뉴',
    },
    {
      id: 278,
      name: '사이드 메뉴',
    },
  ],
  name: '돈가네 돌판 삼겹살',
  open: [
    {
      day_of_week: 'MONDAY',
      closed: false,
      open_time: '16:30',
      close_time: '22:00',
    },
    {
      day_of_week: 'TUESDAY',
      closed: false,
      open_time: '16:30',
      close_time: '22:00',
    },
    {
      day_of_week: 'WEDNESDAY',
      closed: false,
      open_time: '16:30',
      close_time: '22:00',
    },
    {
      day_of_week: 'THURSDAY',
      closed: false,
      open_time: '16:30',
      close_time: '22:00',
    },
    {
      day_of_week: 'FRIDAY',
      closed: false,
      open_time: '16:30',
      close_time: '22:00',
    },
    {
      day_of_week: 'SATURDAY',
      closed: false,
      open_time: '16:30',
      close_time: '22:00',
    },
    {
      day_of_week: 'SUNDAY',
      closed: false,
      open_time: '16:30',
      close_time: '22:00',
    },
  ],
  pay_bank: true,
  pay_card: true,
  phone: '010-3748-4269',
  main_category_id: 3,
  shop_categories: [
    {
      id: 1,
      name: '전체보기',
    },
    {
      id: 7,
      name: '고깃집',
    },
  ],
  updated_at: '2025-09-05',
  is_event: false,
  bank: null,
  account_number: null,
};

export const MOCK_SHOPS_21_SUMMARY_RESULTS: ShopInfoSummaryResponse = {
  shop_id: 21,
  name: '돈가네 돌판 삼겹살',
  introduction: null,
  pay_card: false,
  pay_bank: false,
  rating_average: 5,
  review_count: 2,
  images: [
    {
      image_url: MOCK_SHOP_21_IMAGE,
      is_thumbnail: true,
    },
  ],
};

export const MOCK_ORDER_SHOP_2_DELIVERY_RESULTS: ShopDeliveryInfoResponse = {
  campus_delivery: false,
  off_campus_delivery: true,
};

export const MOCK_DELIVERY_RIDER_MESSAGE_RESULTS: RiderRequestResponse = {
  count: 5,
  contents: [
    {
      content: '문 앞에 놔주세요 (벨 눌러주세요)',
    },
    {
      content: '문 앞에 놔주세요 (노크해주세요)',
    },
    {
      content: '문 앞에 놔주세요 (벨X, 노크 X)',
    },
    {
      content: '직접 받을게요',
    },
    {
      content: '전화주시면 마중 나갈게요',
    },
  ],
};

export const MOCK_SHOPS_21_MENUS_RESULTS: UnorderableShopMenusResponse = {
  count: 9,
  menu_categories: [
    {
      id: 151,
      name: '메인 메뉴a',
      menus: [
        {
          id: 395,
          name: '육개장',
          is_hidden: false,
          is_single: true,
          single_price: 6000,
          option_prices: [
            {
              option: '타입 맞추기용',
              price: 0,
            },
          ],
          description: null,
          image_urls: [],
        },
        {
          id: 396,
          name: '갈비탕',
          is_hidden: false,
          is_single: true,
          single_price: 6000,
          option_prices: [
            {
              option: '타입 맞추기용',
              price: 0,
            },
          ],
          description: null,
          image_urls: [],
        },
        {
          id: 397,
          name: '돈까스',
          is_hidden: false,
          is_single: true,
          single_price: 6000,
          option_prices: [
            {
              option: '타입 맞추기용',
              price: 0,
            },
          ],
          description: null,
          image_urls: [],
        },
        {
          id: 398,
          name: '시원 물막국수',
          is_hidden: false,
          is_single: true,
          single_price: 6000,
          option_prices: [
            {
              option: '타입 맞추기용',
              price: 0,
            },
          ],
          description: null,
          image_urls: [],
        },
        {
          id: 399,
          name: '매콤 비빔막국수',
          is_hidden: false,
          is_single: true,
          single_price: 6000,
          option_prices: [
            {
              option: '타입 맞추기용',
              price: 0,
            },
          ],
          description: null,
          image_urls: [],
        },
        {
          id: 400,
          name: '고기만두 or 김치만두',
          is_hidden: false,
          is_single: false,
          single_price: 5000,
          option_prices: [
            {
              option: '1인',
              price: 3000,
            },
            {
              option: '2인',
              price: 5000,
            },
          ],
          description: null,
          image_urls: [],
        },
        {
          id: 401,
          name: '셋트 1',
          is_hidden: false,
          is_single: true,
          single_price: 14000,
          option_prices: [
            {
              option: '타입 맞추기용',
              price: 0,
            },
          ],
          description: null,
          image_urls: [],
        },
        {
          id: 402,
          name: '셋트 2',
          is_hidden: false,
          is_single: true,
          single_price: 14000,
          option_prices: [
            {
              option: '타입 맞추기용',
              price: 0,
            },
          ],
          description: null,
          image_urls: [],
        },
        {
          id: 403,
          name: '셋트3',
          is_hidden: false,
          is_single: true,
          single_price: 14000,
          option_prices: [
            {
              option: '타입 맞추기용',
              price: 0,
            },
          ],
          description: null,
          image_urls: [],
        },
      ],
    },
  ],
  updated_at: '2018-09-29',
};
