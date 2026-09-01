import { Given, When } from "@cucumber/cucumber";
import { pageFixture } from "../hooks/browserContextFixture";
import logger from "../logger/logger";
import {CucumberWorld} from "./world/CucumberWorld";

const url = "https://www.webdriveruniversity.com/";

Given('I navigate to WebdriverUniversity homepage', async function (this:CucumberWorld) {
    try {
        //Access URL
        //await pageFixture.page.goto(url);
        await this.basePage.navigate(url);
        logger.info('Accessing URL: ' + url);
        //throw new Error('Simulating an error during navigation'); 
        this.setUrl(url); // Store the URL in the CucumberWorld instance
    } catch (error: any) {
        logger.error('An error has occurred: ' + error.message);
    }
});

When('I click on the Contact Us Page', async function (this:CucumberWorld) {
    // const contactUs_Button = await pageFixture.page.getByRole('link', { name: 'CONTACT US Contact Us Form' });
    // pageFixture.newPagePromise = pageFixture.context.waitForEvent('page');
    // await contactUs_Button.click();
    this.basePage.waitAndClickByRole('link', 'Contact Us Form');

});

When('I click on the Login Portal button', async function (this:CucumberWorld) {
    // const login_Button = await pageFixture.page.getByRole('link', { name: 'LOGIN PORTAL Login Portal' });
    // pageFixture.newPagePromise = pageFixture.context.waitForEvent('page');
    // await login_Button.click();
    this.basePage.waitAndClickByRole('link', 'Login Portal');

});



