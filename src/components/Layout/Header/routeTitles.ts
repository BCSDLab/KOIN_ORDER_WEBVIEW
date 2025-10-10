import { matchPath } from '@/util/ts/matchPath';

export interface RouteTitle {
  match: (pathname: string) => boolean;
  title: string;
}

export const ROUTE_TITLES: RouteTitle[] = [
  {
    match: (pathname) => pathname.startsWith('/delivery'),
    title: '주소 상세',
  },
  {
    match: (pathname) => pathname === '/payment' || pathname === '/home' || pathname === '/stores',
    title: '주문',
  },
  {
    match: (pathname) => matchPath('/shop-detail/true/:id', pathname) || matchPath('/shop-detail/false/:id', pathname),
    title: '가게정보·원산지',
  },
  {
    match: (pathname) => pathname.startsWith('/orderCancel'),
    title: '주문 취소하기',
  },
  {
    match: (pathname) => pathname === '/cart',
    title: '장바구니',
  },
  {
    match: (pathname) => pathname === '/shops',
    title: '주변상점',
  },
  {
    match: (pathname) => pathname === '/orders',
    title: '주문 내역',
  },
  {
    match: (pathname) => pathname === '/search',
    title: '검색',
  },
];
