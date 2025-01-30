const { expect } = require('@playwright/test');

exports.MobileAppPage = class MobileAppPage {

  /**
    @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.header = page.locator("//header[@class='bg-white border-b border-gray-200 sticky top-0 z-10']")
  }

  async getParentColumn(header) {
    // get column locator using columns header, for example:TodoColumn
    let parent = await this.page.getByText(header).locator('..');
    return parent;
  }

  async getParentCard(title) {
    // get card locator using card's title
    let parent = await this.page.getByText(title).locator('..');
    return parent;
  }
};