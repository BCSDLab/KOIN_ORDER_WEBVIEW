import { test, expect } from '@playwright/test';
import { readSiteMap } from '../sitemap';

//테스트 계정에 장바구니에 살로몬 후라이드 치킨 1마리 넣으셔야 합니다.
//pr에 push할 때 마다 실행됩니다.
test.describe('비주얼테스트', () => {
  const routes: string[] = readSiteMap();

  routes.forEach((route) => {
    switch (route) {
      case '/shops':
        test(`${route} Visual Test`, async ({ page }) => {
          await page.goto(route);
          await page.waitForLoadState('networkidle');

          await expect(page).toHaveScreenshot(`${route}-lastOrder.png`);
        });
        break;

      case '/orders':
        test(`${route}-lastOrder Visual Test`, async ({ page }) => {
          await page.goto(route);
          await page.waitForLoadState('networkidle');

          await expect(page).toHaveScreenshot(`${route}-lastOrder.png`);
        });

        test(`${route}-preparing Visual Test`, async ({ page }) => {
          await page.goto(route);
          await page.waitForLoadState('networkidle');

          await page.getByRole('button', { name: '준비 중' }).click();

          await expect(page).toHaveScreenshot(`${route}-preparing.png`);
        });
        break;

      case '/search':
        test(`${route} Visual Test`, async ({ page }) => {
          await page.goto(route);
          await page.waitForLoadState('networkidle');

          await page.getByPlaceholder('검색어를 입력해주세요.').fill('피자');
          await page.getByText('고구마 쌀피자').waitFor({ state: 'visible' });

          await expect(page).toHaveScreenshot(`${route}.png`);
        });
        break;

      case '/shop/true/2':
        test(`${route} Visual Test`, async ({ page }) => {
          await page.goto(route);
          await page.waitForLoadState('networkidle');

          await expect(page).toHaveScreenshot(`${route}.png`, { fullPage: true });
        });
        break;

      case '/shop/true/2/menus/11':
        test(`${route} Visual Test`, async ({ page }) => {
          await page.goto('shop/true/2');
          await page.waitForLoadState('networkidle');

          await page.getByRole('button', { name: '후라이드 치킨' }).click();
          await page.getByText('뼈/순살 변경').waitFor();

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
          await page.goto(route);
          await page.waitForLoadState('networkidle');

          await expect(page).toHaveScreenshot(`${route}.png`, { fullPage: true });
        });
        break;

      case '/cart':
        test(`${route}-delivery Visual Test`, async ({ page }) => {
          await page.goto(route);
          await page.waitForLoadState('networkidle');

          await expect(page).toHaveScreenshot(`${route}-delivery.png`);
        });
        test(`${route}-pickUp Visual Test`, async ({ page }) => {
          //픽업으로 안찍힘 ㅂ달로 찍힘
          await page.goto(route);
          await page.waitForLoadState('networkidle');

          await page.getByRole('button', { name: '포장' }).click();
          await page.getByText('주문 가능').waitFor();

          await expect(page).toHaveScreenshot(`${route}-pickUp.png`);
        });
        break;

      case '/delivery/outside':
        test(`${route} Visual Test`, async ({ page }) => {
          await page.goto(route);
          await page.waitForLoadState('networkidle');
          await expect(page).toHaveScreenshot(`${route}.png`);

          await page.getByPlaceholder('주소를 입력해주세요.').fill('충절로 1600');
          await page.keyboard.press('Enter');

          await page.waitForTimeout(500);

          await expect(page).toHaveScreenshot(`${route}-search.png`);
        });
        break;

      case '/delivery/campus':
        test(`${route} Visual Test`, async ({ page }) => {
          await page.goto(route);
          await page.waitForLoadState('networkidle');

          await page.getByRole('button', { name: '기숙사' }).click();
          await expect(page).toHaveScreenshot(`${route}.png`, { fullPage: true });
        });
        break;

      case '/payment': // 여기도 주문하는 이미지가 안찍힘
        test(`${route}?orderType=DELIVERY Visual Test`, async ({ page }) => {
          await page.goto(`/cart`);
          await page.waitForLoadState('networkidle');

          await page.getByText('주문하기').click();
          await page.getByText('배달 받을 위치를 선택해주세요.').waitFor();

          await expect(page).toHaveScreenshot(`${route}.png`, { fullPage: true });

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
        break;

      default:
        test(`${route} Visual Test`, async ({ page }) => {
          await page.goto(route);
          await page.waitForLoadState('networkidle');

          await expect(page).toHaveScreenshot(`${route}.png`);
        });
    }
  });
});
