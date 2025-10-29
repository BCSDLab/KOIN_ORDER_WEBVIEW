import { test, expect } from '@playwright/test';
import { readSiteMap } from './sitemap';

const routes = readSiteMap();

for (const route of routes) {
  test(`[Sitemap 라우트 테스트] ${route}`, async ({ page }) => {
    await page.goto(route);

    await expect(page).toHaveTitle(/.+/); // 제목이 있는지(페이지가 제대로 로드 되었는지 확인)

    // 에러 페이지가 아닌 지 확인(흰 화면 감지)
    const root = page.locator('#root');
    await expect(root).not.toBeEmpty();
  });
}
