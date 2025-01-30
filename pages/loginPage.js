const { expect } = require('@playwright/test');

exports.LoginPage = class LoginPage {

  /**
    @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.username = page.locator("//input[@id='username']");
    this.password = page.locator("//input[@id='password']");
    this.loginButton = page.getByRole('button', { name: 'Sign in' });
  }


  async goto() {
    await this.page.goto('https://animated-gingersnap-8cf7f2.netlify.app/');
  }

  async login() {
    //fill username and password into the textbox
    await this.username.fill('admin');
    await this.password.fill('password123');
    //clicking the login button
    await this.loginButton.click();
  }

};