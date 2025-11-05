import { mkdirSync } from 'fs';
import { dirname } from 'path';
import { chromium, devices } from '@playwright/test';
import { BASE_URL } from '../playwright.config.ts';
import { createSiteMap, readSiteMap } from './sitemap.ts';

export default async function globalSetup() {
  console.log('\n▶ globalSetup 시작\n');

  // .auth 디렉토리가 없다면 자동 생성
  const authPath = 'tests/.auth/user.json';
  try {
    mkdirSync(dirname(authPath), { recursive: true });
  } catch {
    // 이미 있으면 무시
  }

  // 브라우저 생성
  const browser = await chromium.launch();
  const context = await browser.newContext(devices['Pixel 5']);
  const page = await context.newPage();

  try {
    await page.goto(BASE_URL + '/');

    // 1. 로그인 시도 (env 파일에 TEST 계정 넣어둠)
    console.log('1. 로그인 시도');
    console.log('  1) 아이디, 비밀번호 입력 중...');
    await page.fill('input[placeholder="아이디"]', process.env.TEST_USER_ID || '');
    await page.fill('input[placeholder="비밀번호"]', process.env.TEST_USER_PASSWORD || '');

    console.log('  2) 로그인 버튼 클릭 시도...');
    await page.click('button:has-text("로그인")');

    // 로그인 완료 대기
    await page.waitForURL('**/home', { timeout: 30000 });

    // 토큰이 제대로 저장되었는지 확인
    const cookies = await context.cookies();
    const authToken = cookies.find((c) => c.name === 'AUTH_TOKEN_KEY');

    if (authToken) {
      console.log(`     [성공] Auth token 토큰 찾음: ${authToken.value.substring(0, 15)}...`);
    } else {
      console.warn('     [경고] 토큰 못 찾음');
    }

    console.log('     [성공] 로그인 완료\n');

    // 2. Sitemap 생성 (로그인 후)
    try {
      const routes = readSiteMap();
      console.log(`2. Sitemap이 이미 존재합니다. (${routes})`);
    } catch {
      console.log('2. Sitemap을 찾을 수 없습니다. 새로운 Sitemap을 생성합니다.\n');
      await createSiteMap(BASE_URL, page);
      console.log();
    }

    // 3. 인증 상태 저장
    console.log('\n3. 인증 상태 저장 중...');
    await context.storageState({ path: 'tests/.auth/user.json' });
    console.log('   [성공] 인증 상태 저장됨\n');
  } catch (error) {
    console.error('   [실패] globalSetup 실패:', error);
    console.log('     -> 현재 URL:', page.url());
    throw error;
  } finally {
    await browser.close();
  }

  /*
  ▶ 네이티브 브릿지 mock 
    - 웹 로그인 페이지 없을 때 사용
    - 네이티브에서 토큰 주입하는 것을 테스트 (env에 TEST_ACCESS_TOKEN 추가해야 함)

  await page.addInitScript(() => {
    const testToken = process.env.TEST_ACCESS_TOKEN || '';

    window.Android = {
      getUserTokens: () => {
        console.log('Android 브릿지 호출');
        return JSON.stringify({
          access: 'testToken',
          refresh: '',
          userType: 'STUDENT',
        });
      },
    };

    window.webkit = {
      messageHandlers: {
        tokenBridge: {
          postMessage: (message: string) => {
            console.log('iOS 브릿지 호출', message);
          },
        },
      },
    };

    ▶ 쿠키/로컬스토리지에 직접 주입
    document.cookie = `AUTH_TOKEN_KEY=${testToken}; path=/`;
  });
   */
}
