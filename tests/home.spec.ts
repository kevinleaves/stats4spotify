import { test, expect } from '@playwright/test';
import HomePage from './pages/home-page';

test('user should be able to send a whitelist request', async ({ page }) => {
  const homepage = new HomePage(page);
  await homepage.goto();
  await homepage.sendWhiteListRequest(
    'test123@gmail.com',
    'testFirstName',
    'testLastName'
  );
  await expect(homepage.submittedMessage).toBeVisible();
  await expect(homepage.signInButton).not.toBeVisible();
});
