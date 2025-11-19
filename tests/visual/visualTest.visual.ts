import { test, expect } from '@playwright/test';
import { readSiteMap } from '../sitemap';
import {
  MOCK_ORDER_IN_PROGRESS_RESULTS,
  MOCK_ORDER_SHOP_SEARCH_RELATED_RESULTS,
  MOCK_SHOPS_CATEGORIES_RESULTS,
  MOCK_ORDER_SHOP_2_SUMMARY_RESULTS,
  MOCK_SHOP_2_MENUS_GROUPS_RESULTS,
  MOCK_ORDER_SHOP_2_MENUS_RESULTS,
  MOCK_CART_RESULTS,
  MOCK_ORDER_SHOP_2_MENUS_11_RESULTS,
  MOCK_ORDER_SHOP_2_DETAIL_RESULTS,
  MOCK_ADDRESS_SEARCH_RESULTS,
  MOCK_USER_STUDENT_ME_RESULT,
  MOCK_ORDER_SHOPS_RESULTS,
  MOCK_SHOPS_21_SUMMARY_RESULTS,
  MOCK_SHOPS_21_RESULTS,
  MOCK_SHOPS_21_MENUS_RESULTS,
  MOCK_SHOP_RESULTS,
  MOCK_ORDER_RESULTS1,
  MOCK_ORDER_RESULTS2,
  MOCK_SUMMARY_2_RESULTS,
  MOCK_ADDRESS_DELIVERY_CAMPUS_DORMITORY_RESULTS,
  MOCK_ADDRESS_DELIVERY_CAMPUS_COLLEGE_BUILDING_RESULTS,
  MOCK_ADDRESS_DELIVERY_CAMPUS_ETC_RESULTS,
  MOCK_DELIVERY_RIDER_MESSAGE_RESULTS,
  MOCK_ORDER_SHOP_2_DELIVERY_RESULTS,
} from './visualTest.mock';

test.describe('비주얼테스트', () => {
  test.setTimeout(15_000);
  const routes: string[] = readSiteMap();

  routes.forEach((route) => {
    switch (route) {
      case '/home':
        test(`${route} Visual Test`, async ({ page }) => {
          await page.route('**/shops/categories', async (route) => {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify(MOCK_SHOPS_CATEGORIES_RESULTS),
            });
          });

          await page.route(
            (url) =>
              url.href.includes('/order/shops') &&
              url.searchParams.get('filter') === 'IS_OPEN' &&
              url.searchParams.get('category_filter') === '1',
            async (route) => {
              await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(MOCK_ORDER_SHOPS_RESULTS),
              });
            },
          );

          await page.route('**/cart?type=DELIVERY', async (route) => {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify(MOCK_CART_RESULTS),
            });
          });

          await page.goto(route);
          await page.waitForLoadState('networkidle');

          await expect(page).toHaveScreenshot(`${route}.png`);
        });
        break;

      case '/shops':
        test(`${route} Visual Test`, async ({ page }) => {
          await page.route('**/shops/categories', async (route) => {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify(MOCK_SHOPS_CATEGORIES_RESULTS),
            });
          });

          await page.route('**/cart?type=DELIVERY', async (route) => {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify(MOCK_CART_RESULTS),
            });
          });

          await page.route(
            (url) => url.href.includes('/v3/shops') && url.searchParams.get('filter') === 'OPEN',
            async (route) => {
              await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(MOCK_SHOP_RESULTS),
              });
            },
          );

          await page.goto(route);
          await page.waitForLoadState('networkidle');

          await expect(page).toHaveScreenshot(`${route}.png`);
        });
        break;

      case '/orders':
        test(`${route}-lastOrder Visual Test`, async ({ page }) => {
          await page.route('**/order?page=1&limit=10&period=NONE&status=NONE&type=NONE&query=', async (route) => {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify(MOCK_ORDER_RESULTS1),
            });
          });

          await page.route('**/order?page=2&limit=10&period=NONE&status=NONE&type=NONE&query=', async (route) => {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify(MOCK_ORDER_RESULTS2),
            });
          });

          await page.route('**/order/in-progress', async (route) => {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify(MOCK_ORDER_IN_PROGRESS_RESULTS),
            });
          });

          await page.route('**/cart?type=DELIVERY', async (route) => {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify(MOCK_CART_RESULTS),
            });
          });

          await page.goto(route);
          await page.waitForLoadState('networkidle');

          await expect(page).toHaveScreenshot(`${route}-lastOrder.png`);
        });

        test(`${route}-preparing Visual Test`, async ({ page }) => {
          await page.route('**/order?page=1&limit=10&period=NONE&status=NONE&type=NONE&query=', async (route) => {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify(MOCK_ORDER_RESULTS1),
            });
          });

          await page.route('**/order/in-progress', async (route) => {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify(MOCK_ORDER_IN_PROGRESS_RESULTS),
            });
          });

          await page.route('**/cart?type=DELIVERY', async (route) => {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify(MOCK_CART_RESULTS),
            });
          });

          await page.goto(route);
          await page.waitForLoadState('networkidle');

          await page.getByRole('button', { name: '준비 중' }).click();

          await expect(page).toHaveScreenshot(`${route}-preparing.png`);
        });
        break;

      case '/search':
        test(`${route} Visual Test`, async ({ page }) => {
          await page.route('**/v2/shops/search/related**', async (route) => {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify(MOCK_ORDER_SHOP_SEARCH_RELATED_RESULTS),
            });
          });

          await page.goto(route);
          await page.waitForLoadState('networkidle');

          const input = page.getByPlaceholder('검색어를 입력해주세요.');
          await input.fill('피자');
          await input.press('Enter');

          await page.getByText('고구마 쌀피자').waitFor({ timeout: 5000 });

          await expect(page).toHaveScreenshot(`${route}.png`);
        });
        break;

      case '/shop/true/2':
        test(`${route} Visual Test`, async ({ page }) => {
          await page.route('**/order/shop/2/menus/groups', async (route) => {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify(MOCK_SHOP_2_MENUS_GROUPS_RESULTS),
            });
          });

          await page.route('**/order/shop/2/menus', async (route) => {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify(MOCK_ORDER_SHOP_2_MENUS_RESULTS),
            });
          });

          await page.route('**/order/shop/2/summary', async (route) => {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify(MOCK_ORDER_SHOP_2_SUMMARY_RESULTS),
            });
          });

          await page.route('**/cart/summary/2', async (route) => {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify(MOCK_SUMMARY_2_RESULTS),
            });
          });

          await page.route('**/cart?type=DELIVERY', async (route) => {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify(MOCK_CART_RESULTS),
            });
          });

          await page.goto(route);
          await page.waitForLoadState('networkidle');

          await expect(page).toHaveScreenshot(`${route}.png`, { fullPage: true });
        });
        break;

      case '/shop/false/21':
        test(`${route} Visual Test`, async ({ page }) => {
          await page.route('**/shops/21/summary', async (route) => {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify(MOCK_SHOPS_21_SUMMARY_RESULTS),
            });
          });

          await page.route('**/shops/21/menus', async (route) => {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify(MOCK_SHOPS_21_MENUS_RESULTS),
            });
          });

          await page.route('**/shops/21', async (route) => {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify(MOCK_SHOPS_21_RESULTS),
            });
          });

          await page.route('**/cart?type=DELIVERY', async (route) => {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify(MOCK_CART_RESULTS),
            });
          });

          await page.goto(route);
          await page.waitForLoadState('networkidle');

          await expect(page).toHaveScreenshot(`${route}.png`, { fullPage: true });
        });
        break;

      case '/shop/true/2/menus/11':
        test(`${route} Visual Test`, async ({ page }) => {
          await page.route('**/cart?type=DELIVERY', async (route) => {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify(MOCK_CART_RESULTS),
            });
          });

          await page.route('**/order/shop/2/menus/11', async (route) => {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify(MOCK_ORDER_SHOP_2_MENUS_11_RESULTS),
            });
          });

          await page.goto(route);
          await page.waitForLoadState('networkidle');

          await expect(page).toHaveScreenshot(`${route}.png`);
        });
        break;

      case '/payment/return':
        test(`${route}`, async ({ page }) => {
          await page.goto(route);

          await expect(page).toHaveScreenshot(`${route}.png`, { fullPage: true });
        });
        break;

      case '/shop-detail/true/2':
        test(`${route} Visual Test`, async ({ page }) => {
          await page.route('**/order/shop/2/detail', async (route) => {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify(MOCK_ORDER_SHOP_2_DETAIL_RESULTS),
            });
          });

          await page.goto(route);
          await page.waitForLoadState('networkidle');

          await expect(page).toHaveScreenshot(`${route}.png`, { fullPage: true });
        });
        break;

      case '/shop-detail/false/21':
        test(`${route} Visual Test`, async ({ page }) => {
          await page.route('**/shops/21', async (route) => {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify(MOCK_SHOPS_21_RESULTS),
            });
          });

          await page.goto(route);
          await page.waitForLoadState('networkidle');

          await expect(page).toHaveScreenshot(`${route}.png`, { fullPage: true });
        });
        break;

      case '/cart':
        test(`${route}-delivery Visual Test`, async ({ page }) => {
          await page.route('**/cart?type=DELIVERY', async (route) => {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify(MOCK_CART_RESULTS),
            });
          });

          await page.goto(route);
          await page.waitForLoadState('networkidle');

          await expect(page).toHaveScreenshot(`${route}-delivery.png`);
        });

        test(`${route}-takeOut Visual Test`, async ({ page }) => {
          await page.route('**/cart?type=DELIVERY', async (route) => {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify(MOCK_CART_RESULTS),
            });
          });

          await page.route('**/cart?type=TAKE_OUT', async (route) => {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify(MOCK_CART_RESULTS),
            });
          });

          await page.goto(route);
          await page.waitForLoadState('networkidle');

          await page.getByRole('button', { name: '포장' }).click();
          await page.getByText('주문 가능').waitFor({ timeout: 5000 });

          await expect(page).toHaveScreenshot(`${route}-takeOut.png`);
        });
        break;

      case '/delivery/outside/detail':
        test(`${route} Visual Test`, async ({ page }) => {
          await page.goto(route);
          await page.waitForLoadState('networkidle');
          await expect(page).toHaveScreenshot(`${route}.png`);
        });
        break;

      case '/delivery/outside':
        test(`${route} Visual Test`, async ({ page }) => {
          await page.route('**/address/search*', async (route) => {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify(MOCK_ADDRESS_SEARCH_RESULTS),
            });
          });

          await page.goto(route);
          await page.waitForLoadState('networkidle');
          await expect(page).toHaveScreenshot(`${route}.png`);

          await page.getByPlaceholder('주소를 입력해주세요.').fill('충절로 1600');
          await page.keyboard.press('Enter');

          await page.getByText('한국기술교육대학교').waitFor({ timeout: 5000 });

          await expect(page).toHaveScreenshot(`${route}-search.png`);
        });
        break;

      case '/delivery/campus':
        test(`${route} Visual Test`, async ({ page }) => {
          await page.route('**/address/delivery/campus?filter=DORMITORY', async (route) => {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify(MOCK_ADDRESS_DELIVERY_CAMPUS_DORMITORY_RESULTS),
            });
          });

          await page.route('**/address/delivery/campus?filter=COLLEGE_BUILDING', async (route) => {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify(MOCK_ADDRESS_DELIVERY_CAMPUS_COLLEGE_BUILDING_RESULTS),
            });
          });

          await page.route('**/address/delivery/campus?filter=ETC', async (route) => {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify(MOCK_ADDRESS_DELIVERY_CAMPUS_ETC_RESULTS),
            });
          });

          await page.goto(route);
          await page.waitForLoadState('networkidle');

          await page.getByRole('button', { name: '기숙사' }).click();
          await expect(page).toHaveScreenshot(`${route}.png`, { fullPage: true });
        });
        break;

      case '/payment':
        test(`${route}?orderType=DELIVERY Visual Test`, async ({ page }) => {
          await page.route('**/user/student/me', async (route) => {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify(MOCK_USER_STUDENT_ME_RESULT),
            });
          });

          await page.route('**/cart?type=DELIVERY', async (route) => {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify(MOCK_CART_RESULTS),
            });
          });

          await page.route('**/order/shop/2/delivery', async (route) => {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify(MOCK_ORDER_SHOP_2_DELIVERY_RESULTS),
            });
          });

          await page.route('**/delivery/rider-message', async (route) => {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify(MOCK_DELIVERY_RIDER_MESSAGE_RESULTS),
            });
          });

          await page.goto(`/payment?orderType=DELIVERY`);
          await page.getByText('사장님에게').waitFor({ timeout: 5000 });

          await expect(page).toHaveScreenshot(`${route}-delivery.png`, { fullPage: true });

          await page.getByText('연락처를 입력하세요').click();
          await expect(page).toHaveScreenshot(`${route}-phoneNumber.png`);
          await page.getByTestId('contact-modal-close').click();

          await page.getByText('수저 · 포크 안받기').click();
          await expect(page).toHaveScreenshot(`${route}-owner.png`);
          await page.getByTestId('storeRequest-modal-close').click();

          await page.getByText('요청사항 없음').last().click();
          await expect(page).toHaveScreenshot(`${route}-rider.png`);
          await page.getByTestId('riderRequest-modal-close').click();
        });

        test(`${route}?orderType=TAKE_OUT Visual Test`, async ({ page }) => {
          await page.route('**/user/student/me', async (route) => {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify(MOCK_USER_STUDENT_ME_RESULT),
            });
          });

          await page.route('**/cart?type=TAKE_OUT', async (route) => {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify(MOCK_CART_RESULTS),
            });
          });

          await page.route('**/delivery/rider-message', async (route) => {
            await route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: JSON.stringify(MOCK_DELIVERY_RIDER_MESSAGE_RESULTS),
            });
          });

          await page.goto(`/payment?orderType=TAKE_OUT`);
          await page.getByText('사장님에게').waitFor({ timeout: 5000 });

          await expect(page).toHaveScreenshot(`${route}-takeOut.png`, { fullPage: true });
        });
        break;

      default:
        test(`${route} Visual Test`, async ({ page }) => {
          await page.goto(route);
          await page.waitForLoadState('networkidle');

          await expect(page).toHaveScreenshot(`기존에 없던 페이지(${route}).png`);
        });
    }
  });
});
