import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('navigation', () => {
  test('navigate to top artists', async ({ page }) => {
    await page.goto('/artists/top');
    expect(
      page.getByRole('heading', { name: 'Top Artists: last 4 weeks' })
    ).toBeVisible();
  });
  test('navigate to top tracks', async ({ page }) => {
    await page.goto('/tracks/top');
    expect(
      page.getByRole('heading', { name: 'Top Tracks: last 4 weeks' })
    ).toBeVisible();
  });
});
