import { test, expect } from '@playwright/test';
import { chromium } from '@playwright/test';

const authFile = 'playwright/.auth/devUser.json';

test.beforeEach('log in', async ({ page }) => {
  // const browser = await chromium.launch();
  // const page = await browser.newPage();

  await page.goto(
    'http://localhost:3000/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F'
  );
  await page.getByRole('button', { name: 'Sign in with Spotify' }).click();

  //! adding waitForLoadState fixes flaky button press
  await page.waitForLoadState('networkidle'); // <-  until there are no network connections for at least 500 ms.
  //! boilerplate

  //* Wait until the page receives the cookies.
  //* Sometimes login flow sets cookies in the process of several redirects.
  //* Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL('**/', { timeout: 30000 });
  // Alternatively, you can wait until the page reaches a state where all cookies are set.

  // Wait for network to be idle, if we save storage too early, needed storage values might not yet be available
  await page.waitForLoadState('networkidle');

  // End of authentication steps.
  // await page.context().storageState({ path: authFile });

  // assert
  await expect(page.getByRole('button', { name: 'Sign out' })).toBeVisible({
    timeout: 30000,
  });
});

test.describe('dev homepage tests', () => {
  // test.use({ storageState: authFile });
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
