import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 1,
  workers: 3,
  timeout: 60000,
  reporter: [['html', { outputFolder: 'reports' }]],

  use: {
    baseURL: 'https://rahulshettyacademy.com/client/#/auth/login',
    headless: true,
  },


  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'edge',
      use: { ...devices['Desktop Edge'] },
    },


  ],


});
