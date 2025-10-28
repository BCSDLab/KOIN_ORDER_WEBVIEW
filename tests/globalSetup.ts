import { mkdirSync } from 'fs';
import { dirname } from 'path';
import { chromium, devices } from '@playwright/test';
import { BASE_URL } from '../playwright.config.ts';
import { createSiteMap, readSiteMap } from './sitemap.ts';

export default async function globalSetup() {
  console.log('\n▶ globalSetup 시작');

  // .auth 디렉토리가 없다면 자동 생성
  const authPath = 'tests/.auth/user.json';
  try {
    mkdirSync(dirname(authPath), { recursive: true });
  } catch {
    // 이미 있으면 무시
  }

  try {
    const routes = readSiteMap();
    console.log(`Sitemap이 이미 존재합니다. (${routes})`);
  } catch {
    console.log('Sitemap을 찾을 수 없습니다. 새로운 Sitemap을 생성합니다.\n');
    createSiteMap();
  }

  // 2. 테스트용 토큰 설정 (네이티브 브릿지 mock)
  console.log('\n▶ 네이티브 브릿지 mock 설정 시작');

  const browser = await chromium.launch();
  const context = await browser.newContext(devices['iPhone 14 Pro']);
  const page = await context.newPage();

  // 네이티브 브릿지 mock (로그인 전에 필요)
  await page.addInitScript(() => {
    window.Android = {
      getUserTokens: () =>
        JSON.stringify({
          access: '',
          refresh: '',
          userType: 'STUDENT',
        }),
    };
  });

  try {
    await page.goto(BASE_URL + '/');

    // 로그인 시도 (env 파일에 TEST 계정 넣어둠)
    console.log('  1) 아이디, 비밀번호 입력 중...');
    await page.fill('input[placeholder="아이디"]', process.env.TEST_USER_ID || '');
    await page.fill('input[placeholder="비밀번호"]', process.env.TEST_USER_PASSWORD || '');

    console.log('  2) 로그인 버튼 클릭 시도...');
    await page.click('button:has-text("로그인")');

    // 로그인 완료 대기
    await page.waitForURL('**/home', { timeout: 10000 });

    // 토큰이 제대로 저장되었는지 확인
    const cookies = await context.cookies();
    const authToken = cookies.find((c) => c.name === 'AUTH_TOKEN_KEY');

    if (authToken) {
      console.log(`    [성공] Auth token 토큰 찾음: ${authToken.value.substring(0, 15)}...`);
    } else {
      console.warn('    [경고] 토큰 못 찾음');
    }

    // 인증 상태 저장
    console.log('\n  3) 인증 상태 저장 중...');
    await context.storageState({ path: 'tests/.auth/user.json' });

    console.log('    [성공] 로그인 성공 및 인증 상태 저장됨\n');
  } catch (err) {
    console.error('    [실패] 로그인 실패:', err);
    console.log('      -> 현재 잔류 URL:', page.url());
    throw err;
  } finally {
    await browser.close();
  }
}
