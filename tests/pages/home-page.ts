import { type Locator, type Page } from '@playwright/test';

export default class HomePage {
  // extract all page locators into Page Object Model
  readonly page: Page;
  readonly email: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly signInButton: Locator;
  readonly submittedMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.email = page.getByPlaceholder(
      'Email Address that you use to log into Spotify'
    );
    this.firstName = page.getByPlaceholder('First Name');
    this.lastName = page.getByPlaceholder('Last Name');
    this.signInButton = page.getByRole('button', { name: 'Send me an email' });
    this.submittedMessage = page.getByText(
      'Thank you for submitting! You will be contacted shortly.'
    );
  }

  // actions we want to take in this page = our function names
  async goto() {
    await this.page.goto('https://spotifygpt.vercel.app/');
  }
  async sendWhiteListRequest(
    email: string,
    firstName: string,
    lastName: string
  ) {
    await this.email.fill(email);
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.signInButton.click();
  }
}
