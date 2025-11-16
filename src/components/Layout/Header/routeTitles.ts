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
    match: (pathname) => pathname.startsWith('/shop-detail'),
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
    match: (pathname) => pathname.startsWith('/shops'),
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
  {
    match: (pathname) => pathname.startsWith('/review/true/') || pathname.startsWith('/review/false/'),
    title: '리뷰',
  },
  {
    match: (pathname) => pathname.startsWith('/review/report/'),
    title: '리뷰 신고하기',
  },
  {
    match: (pathname) => pathname.startsWith('/review/new/'),
    title: '리뷰 작성하기',
  },
  {
    match: (pathname) => pathname.startsWith('/review/edit/'),
    title: '리뷰 수정하기',
  },
];
