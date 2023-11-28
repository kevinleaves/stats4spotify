import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('dev homepage tests', () => {
  test('user should be logged in after setup complete', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Sign out' })).toBeVisible({
      timeout: 30000,
    });
  });

  test('page header is visible', async ({ page }) => {
    // header is visible
    await expect(
      page.getByRole('heading', { name: 'SpotifyGPT - Music Taste Analyzer' })
    ).toBeVisible();
  });

  test('chatgpt output works as intended', async ({ page }) => {
    // chatgpt initial output is visible
    await expect(
      page.getByText(
        "SpotifyGPT's response will show up here.. This sample response is using dummy da"
      )
    ).toBeVisible();

    // judge button is aria compliant before and after click
    await expect(
      page.getByRole('button', { name: 'Judge your music taste' })
    ).toHaveAttribute('aria-busy', 'false');
    await page.getByRole('button', { name: 'Judge your music taste' }).click();
    await expect(page.locator('[aria-busy="true"]')).toBeVisible();

    // chatgpt display box generates output on click
    await expect(
      page.getByText(
        "Hi everyone. Anthony Fantano here, the internet's busiest music nerd"
      )
    ).toBeVisible({ timeout: 40000 });
  });

  test('demo top tracks widget', async ({ page }) => {
    // top tracks widget header is visible
    await expect(
      page.getByRole('heading', { name: 'Top Tracks: last 4 weeks (sample)' })
    ).toBeVisible();

    // top tracks list is visible
    await expect(
      page.getByText(
        '1LevitatingDua LipaBPM/Tempo: 1032STAY (with Justin Bieber)The Kid LAROI, Justin'
      )
    ).toBeVisible();
  });

  test('contact form', async ({ page }) => {
    // contact form is visible
    await expect(
      page.locator('form').filter({ hasText: 'Send me an email' })
    ).toBeVisible();
  });
});
