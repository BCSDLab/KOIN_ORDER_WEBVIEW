import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SITEMAP = join(__dirname, './sitemap.json');

const routes = [
  // HomeLayout 그룹
  { path: '/home', name: 'Home' },
  { path: '/shops', name: 'NearbyShops' },
  { path: '/orders', name: 'OrderList' },
  { path: '/search', name: 'Search' },

  // Shop 관련 (standalone)
  { path: '/shop/true/:shopId', name: 'OrderableShopView', testParams: { shopId: '1' } },
  { path: '/shop/false/:shopId', name: 'UnorderableShopView', testParams: { shopId: '1' } },
  { path: '/shop/true/:shopId/menus/:menuId', name: 'MenuDetail', testParams: { shopId: '1', menuId: '1' } },

  // Payment 관련 (standalone)
  { path: '/payment/return', name: 'PaymentConfirm' },

  // AppLayout 그룹
  { path: '/shop-detail/true/:shopId', name: 'OrderableShopDetail', testParams: { shopId: '1' } },
  { path: '/shop-detail/false/:shopId', name: 'UnorderableShopDetail', testParams: { shopId: '1' } },
  { path: '/cart', name: 'Cart' },

  // Delivery 하위 라우트
  { path: '/delivery/outside/detail', name: 'DetailAddress' },
  { path: '/delivery/outside', name: 'DeliveryOutside' },
  { path: '/delivery/campus', name: 'Campus' },

  { path: '/payment', name: 'Payment' },
  { path: '/orderCancel/:paymentId', name: 'OrderCancel', testParams: { paymentId: '444' } },
  { path: '/result/:paymentId', name: 'OrderFinish', testParams: { paymentId: '444' } },
];

export function createSiteMap() {
  console.log('▶ Sitemap 만드는 중...\n');

  const testRoutes = routes.map((route) => {
    let path = route.path;

    if (route.testParams) {
      Object.entries(route.testParams).forEach(([key, value]) => {
        path = path.replace(`:${key}`, String(value));
      });
    }
    return path;
  });

  writeFileSync(SITEMAP, JSON.stringify(testRoutes, null, 4));

  console.log(`  [성공] ${testRoutes.length}개 Sitemap 생성 완료\n`);
  console.log('  Routes:');
  testRoutes.forEach((route) => console.log(`    - ${route}`));
}

export function readSiteMap() {
  try {
    const data = readFileSync(SITEMAP, { encoding: 'utf-8' });
    return JSON.parse(data);
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      throw new Error('Sitemap을 찾지 못 하였습니다.');
    }
    throw error;
  }
}
