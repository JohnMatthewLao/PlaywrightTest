const { expect } = require('@playwright/test');

exports.Projects = class Projects {

  /**
    @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async navigateToProject(projName) {
    await this.page.getByRole('button', { name: projName }).click();
  }
  
};