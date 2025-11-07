import path from 'path';
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
export const BROWSERS = ['Mobile Chrome', 'Desktop Firefox', 'Desktop Chrome', 'Desktop Safari'];
const is_CI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  testMatch: ['**/*.e2e.{ts,tsx}', '**/*.visual.{ts,tsx}'], //e2e : end-to-end tests, visual : visual regression tests
  testIgnore: ['**/*.spec.{ts,tsx}', '**/*.test.{ts,tsx}'],

  fullyParallel: true,
  forbidOnly: is_CI,
  retries: is_CI ? 2 : 0,
  workers: is_CI ? 1 : undefined,
  reporter: [['list'], ['html']],
  snapshotPathTemplate: '{testDir}/visual/visualTest.visual.ts-snapshots/{arg}{ext}',
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    storageState: 'tests/.auth/user.json',
  },

  globalSetup: './tests/globalSetup.ts',

  expect: {
    toHaveScreenshot: {
      stylePath: './tests/visual/viz.tweaks.css',
      animations: 'disabled', // 애니메이션 비활성화
      maxDiffPixelRatio: 0.01, // 1% 허용 오차
    },
  },

  projects: [
    {
      name: 'setup db',
      testMatch: /global\.setup\.ts/,
    },
    // 우선 테스트를 위해 모바일 브라우저 중 1개만 활성화, 이후 다른 브라우저도 활성화 예정
    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    // },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },

    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 11'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'pnpm start',
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
  },
});
