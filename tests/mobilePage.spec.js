// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import mobileTestData from '../test-data/mobileTestData.json';
import { MobileAppPage } from '../pages/mobileAppPage';
import { Projects } from '../pages/project';

test.beforeEach(async ({ page }) => {
  // Login into the application 
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login();

  //Navigate to mobile application project type
  const proj = new Projects(page);
  await proj.navigateToProject(mobileTestData[0].applicationType);

  //Ensure that current page(mobile application page) contain certain text
  const mobileAppPage = new MobileAppPage(page);
  await expect(mobileAppPage.header).toContainText([mobileTestData[0].applicationType]);
});


// do the data driven test case using .json file
// iterate each object (which contain data for application) within the json file 
for(let data of mobileTestData){
  //group the test together
  test.describe('Data Driven Mobile application test', function(){
    test(`Verify ${data.title} is in the ${data.column} column.`, async ({ page }, testInfo) => {
      const mobileAppPage = new MobileAppPage(page);
      let toDo = await mobileAppPage.getParentColumn(data.column);
      // Happy path (Postive testing)
      await expect(toDo).toContainText([data.title]);
      // Unhappy path (Negative testing)
      await expect(toDo).not.toContainText([data.invalidTitle])
      const screenshot = await page.screenshot();
      await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
    });

    test(`Confirm tags: ${data.tags1} & ${data.tags2}`, async({page}, testInfo) => {
      const mobileAppPage = new MobileAppPage(page);
      let card = await mobileAppPage.getParentCard(data.title);
      // Happy path (Postive testing)
      await expect(card).toContainText([data.tags1]);
      // if there is second tag check for it
      if(data.tags2 !== "None"){
        await expect(card).toContainText([data.tags2]);
      }
      // Unhappy path (Negative testing)
      await expect(card).not.toContainText([data.invalidTag])
      const screenshot = await page.screenshot();
      await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
    })
  })
}




