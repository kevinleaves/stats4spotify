import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('navigation', () => {
  test('navbar should contain 4 links', async ({ page }) => {
    await expect(page.getByRole('navigation').getByRole('link')).toHaveCount(4);
  });

  test('navigate to top artists', async ({ page }) => {
    await page.goto('/artists/top', { timeout: 30000 });
    await expect(
      page.getByRole('heading', { name: 'Top Artists: last 4 weeks' })
    ).toBeVisible();
  });

  test('navigate to top tracks', async ({ page }) => {
    await page.goto('/tracks/top', { timeout: 30000 });
    await expect(
      page.getByRole('heading', { name: 'Top Tracks: last 4 weeks' })
    ).toBeVisible();
  });

  test('recent tracks page should have a page header', async ({ page }) => {
    await page.goto('/tracks/recent', { timeout: 30000 });
    await expect(page.getByRole('heading')).toHaveCount(1);
  });

  test('recent tracks page should have 3 column headers', async ({ page }) => {
    await page.goto('/tracks/recent', { timeout: 30000 });
    await expect(page.getByRole('columnheader')).toHaveCount(3);
  });

  test('recent tracks page render at least one recently played track', async ({
    page,
  }) => {
    await page.goto('/tracks/recent', { timeout: 30000 });
    await expect(page.getByRole('row')).toHaveCount(51);
  });
});
