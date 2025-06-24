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
    match: (pathname) => pathname === '/payment',
    title: '주문',
  },
];
