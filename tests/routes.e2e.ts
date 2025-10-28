import { test, expect } from '@playwright/test';
import { readSiteMap } from './sitemap';

const routes = readSiteMap();

for (const route of routes) {
  test(`[Sitemap 라우트 테스트] ${route}`, async ({ page }) => {
    await page.goto(route);

    await expect(page).toHaveTitle(/.+/); // 제목이 있는지(페이지가 제대로 로드 되었는지 확인)

    // 에러 페이지가 아닌지 확인 (404 또는 Error 텍스트가 있는지 확인)
    const bodyText = await page.textContent('body');
    expect(bodyText).not.toContain('404');
    expect(bodyText).not.toContain('Error');
  });
}
