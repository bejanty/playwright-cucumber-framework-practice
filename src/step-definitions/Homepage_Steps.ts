import { Given, When } from "@cucumber/cucumber";
import { pageFixture } from "../hooks/browserContextFixture";

const url = "https://www.webdriveruniversity.com/";

Given('I navigate to WebdriverUniversity homepage', async () =>  {
    //Access URL
    await pageFixture.page.goto(url);

});

When('I click on the Contact Us Page', async () => {
    const contactUs_Button = await pageFixture.page.getByRole('link', { name: 'CONTACT US Contact Us Form' });
    contactUs_Button.click();
});

When('I click on the Login Portal button', async () => {
    const login_Button = await pageFixture.page.getByRole('link', { name: 'LOGIN PORTAL Login Portal' });
    //pageFixture.newPagePromise = pageFixture.context.waitForEvent('page');
    await login_Button.click();
});



