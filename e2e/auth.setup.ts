import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  // await page.goto('https://spotifygpt.vercel.app/');
  await page.goto(
    'https://spotifygpt.vercel.app/api/auth/signin?callbackUrl=https%3A%2F%2Fspotifygpt.vercel.app%2F'
  );
  // await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'Sign in with Spotify' }).click();
  await page.getByTestId('login-username').click();
  await page.getByTestId('login-username').fill(process.env.SPOTIFYACC);
  await page.getByTestId('login-password').click();
  await page.getByTestId('login-password').press('Meta+a');
  await page.getByTestId('login-password').fill(process.env.SPOTIFYPASS);

  //! adding waitForLoadState fixes flaky button press
  await page.waitForLoadState('networkidle'); // <-  until there are no network connections for at least 500 ms.
  await page.getByTestId('login-button').click({ force: true });

  //! boilerplate

  //* Wait until the page receives the cookies.
  //* Sometimes login flow sets cookies in the process of several redirects.
  //* Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL('https://spotifygpt.vercel.app/', { timeout: 30000 });
  // Alternatively, you can wait until the page reaches a state where all cookies are set.

  // Wait for network to be idle, if we save storage too early, needed storage values might not yet be available
  // await page.waitForLoadState('networkidle');

  // await expect(page.getByRole('button', { name: 'Sign out' })).toBeVisible({
  //   timeout: 30000,
  // });

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});
