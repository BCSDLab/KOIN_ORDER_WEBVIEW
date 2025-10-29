import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Page } from '@playwright/test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SITEMAP = join(__dirname, './sitemap.json');

const staticRoutes = [
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
];

const dynamicRoutes = [
  { path: '/orderCancel/:paymentId', name: 'OrderCancel' },
  { path: '/result/:paymentId', name: 'OrderFinish' },
];

async function fetchInProgressPaymentId(page: Page, baseURL: string): Promise<string | null> {
  try {
    console.log('    → 진행 중인 주문 조회 중...');

    // 홈 페이지로 이동 (로그인된 상태)
    const currentUrl = page.url();
    if (!currentUrl.includes('/home')) {
      await page.goto(`${baseURL}/home`);
    }

    const result = await page.evaluate(async () => {
      try {
        // @ts-expect-error - 브라우저에서만 사용 가능
        const { getInProgressOrder } = await import('/src/api/order/index.ts');

        const data = await getInProgressOrder();

        if (Array.isArray(data) && data.length > 0) {
          return { success: true, paymentId: String(data[0].payment_id) };
        }

        return { success: false, error: '진행 중인 주문 없음' };
      } catch (error) {
        console.error('[Browser] Error:', error);
        return { success: false, error: String(error) };
      }
    });

    if (result.success && result.paymentId) {
      console.log(`      - paymentId 찾음: ${result.paymentId}`);
      return result.paymentId;
    }

    console.warn(`      [경고] ${result.error}`);
    return null;
  } catch (error) {
    console.error('      [실패] 조회 실패:', error);
    return null;
  }
}

export async function createSiteMap(baseURL: string, page: Page) {
  console.log('  ▶ Sitemap 만드는 중...\n');

  const routes: string[] = [];

  // 1. 정적 라우트
  for (const route of staticRoutes) {
    let path = route.path;

    if (route.testParams) {
      Object.entries(route.testParams).forEach(([key, value]) => {
        path = path.replace(`:${key}`, String(value));
      });
    }

    routes.push(path);
  }

  // 2. 조건부 라우트 (로그인 필요한 경우만 추가)
  const paymentId = await fetchInProgressPaymentId(page, baseURL);

  if (paymentId) {
    for (const route of dynamicRoutes) {
      const path = route.path.replace(':paymentId', paymentId);
      routes.push(path);
      console.log(`    ✓ ${route.name}: ${path}`);
    }
  } else {
    const fallbackPaymentId = process.env.TEST_PAYMENT_ID;

    if (fallbackPaymentId) {
      console.log('    -  fallback paymentId 사용');
      for (const route of dynamicRoutes) {
        const path = route.path.replace(':paymentId', fallbackPaymentId);
        routes.push(path);
        console.log(`    ✓ ${route.name}: ${path} (fallback)`);
      }
    } else {
      console.log('        -  payment 관련 라우트 제외');
    }
  }

  writeFileSync(SITEMAP, JSON.stringify(routes, null, 4));

  console.log(`\n  [성공] 총 ${routes.length}개 라우트 생성`);
  console.log('    Routes:');
  routes.forEach((route) => console.log(`      - ${route}`));
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
