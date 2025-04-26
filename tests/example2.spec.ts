// filepath: i:\Coding_journey\End-to-End-Test-Automation-with-Playwright-Learning\tests\example.spec.ts
import { test } from '@playwright/test';

test('open browser in non-headless mode', async ({ page }) => {
  await page.goto('https://www.google.com');
  await page.waitForTimeout(5000); // Wait for 5 seconds to observe the browser
});