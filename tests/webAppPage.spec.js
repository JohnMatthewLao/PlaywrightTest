// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import webAppTestData from '../test-data/webAppTestData.json';
import { WebAppPage } from '../pages/webAppPage';
import { Projects } from '../pages/project';

//Before each Test case 
test.beforeEach(async ({ page }) => {
  // Login into the application 
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login();

  //Navigate to web application project type
  const proj = new Projects(page);
  await proj.navigateToProject(webAppTestData[0].applicationType);

  //Ensure that current page(web application page) contain certain text
  const webAppPage = new WebAppPage(page);
  await expect(webAppPage.header).toContainText([webAppTestData[0].applicationType]);
});


// do the data driven test case using .json file
// iterate each object (which contain data for application) within the json file 
for(let data of webAppTestData){
  //group the test together
  test.describe('Data Driven Web application test', function(){

    test(`Verify ${data.title} is in the ${data.column} column.`, async ({ page }, testInfo) => {
      const webAppPage = new WebAppPage(page);
      let toDo = await webAppPage.getParentColumn(data.column);
      // Happy path (Postive testing)
      await expect(toDo).toContainText([data.title]);
      // Unhappy path (Negative testing)
      await expect(toDo).not.toContainText([data.invalidTitle])
      const screenshot = await page.screenshot();
      await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
    });

    // loop through each tag of each card and designated each tag to separate test
    for(let tag of data.tags){
      test(`Confirm tags: ${tag}`, async({page}, testInfo) => {
        const webAppPage = new WebAppPage(page);
        let card = await webAppPage.getParentCard(data.title);
        // Happy path (Postive testing)
        await expect(card).toContainText([tag]);
        // Unhappy path (Negative testing)
        await expect(card).not.toContainText([data.invalidTag])
        const screenshot = await page.screenshot();
        await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
      })
    }

  })
}
