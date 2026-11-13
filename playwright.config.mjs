import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './browser-tests',
  timeout: 30000,
  use: { baseURL: 'http://127.0.0.1:4331', viewport: { width: 1280, height: 900 } },
  webServer: {
    command: 'node server.mjs',
    env: { PORT: '4331' },
    url: 'http://127.0.0.1:4331',
    reuseExistingServer: false,
  },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
});
