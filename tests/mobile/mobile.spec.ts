import { test, expect } from '@playwright/test';

test('hamburger menu displays on mobile screens', async ({ page }) => {
  await page.goto('https://spotifygpt.vercel.app/');
  await page.getByRole('navigation').getByRole('button').click();
  await expect(page.getByRole('button', { name: 'Sign out' })).toBeVisible();
});
