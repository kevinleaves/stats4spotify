import { test, expect } from '@playwright/test';

test('already logged in state', async ({ page }) => {
  await page.goto('https://spotifygpt.vercel.app/');

  //* page should already be authenticated. can start clicking around
  await page.getByRole('link', { name: 'Top Artists' }).click();
  await page.getByRole('link', { name: 'last 6 months' }).click();
  await page.getByRole('link', { name: 'all time' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page
    .locator('li')
    .filter({
      hasText:
        'Drakecanadian hip hop, canadian pop, hip hop, pop rappopularity: 95',
    })
    .getByRole('link')
    .click();
  const page1 = await page1Promise;
  await page.getByRole('link', { name: 'last 6 months' }).click();
  await page.getByRole('link', { name: 'Top Tracks' }).click();
  await page
    .locator('div')
    .filter({ hasText: "FantanoBot's response will show up here..." })
    .click();
  await page.getByRole('button', { name: 'Judge your music taste' }).click();
  const page2Promise = page.waitForEvent('popup');
  await page
    .locator('li')
    .filter({ hasText: '3Loveeeeeee SongRihanna, FutureBPM/Tempo: 120' })
    .getByRole('link')
    .click();
  const page2 = await page2Promise;
  await page
    .locator('section')
    .filter({
      hasText:
        'last 4 weekslast 6 monthsall timeHi everyone. Anthony Fantano here, the internet',
    })
    .locator('section')
    .click();
  await page.getByRole('link', { name: 'last 6 months' }).click();
  await page.getByRole('link', { name: 'SpotifyGPT' }).click();
  await page.getByText('SpotifyGPTTop ArtistsTop TracksSign out').click();
  await page.getByRole('button', { name: 'Sign out' }).click();
});
