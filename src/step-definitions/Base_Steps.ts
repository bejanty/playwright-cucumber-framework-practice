import { Given, When } from "@cucumber/cucumber";
import { pageFixture } from "../hooks/browserContextFixture";

//Load env vaiables from .env file
import {config as loadEnv } from "dotenv";
const env = loadEnv({path: './env/.env'});

//Create a configuration object for easy access to env variables
const config = {
    width: parseInt(env.parsed?.BROWSER_WIDTH || '1920'),
    height: parseInt(env.parsed?.BROWSER_HEIGHT || '1080')
}
When('I switch to the new browser tab', async () => {
//     if(!pageFixture.newPagePromise) {
//         throw new Error('newPagePromise was not set - did the previous step trigger a new tab?');
//     }

//     //Await the "page" event listener that was attached before the triggering click
//     pageFixture.page = await pageFixture.newPagePromise;
//     pageFixture.newPagePromise = undefined;

//     //Bring the newly assigned tab to the front (Make it active)
//     await pageFixture.page.bringToFront();

//     //Note: setViewportSize() is intentionally skipped here - the Login Portal opens via
//     //window.open() with a fixed size, and Firefox hangs indefinitely trying to resize that
//     //kind of popup window.

    await pageFixture.context.waitForEvent("page"); //reintialise the page > new tab > page

    //Retrieve all current open pages (tabs)
    const allPages = await pageFixture.context.pages();

    //Assign the most recent tab to pageFixture.page
    pageFixture.page = allPages[allPages.length - 1];

    //Bring the newly assigned tab to the front (Make it active)
    await pageFixture.page.bringToFront();

    //Ensure the newly assigned tab is also fully maximised 
    await pageFixture.page.setViewportSize({ width: config.width, height: config.height });
});


Given('I wait for {int} seconds', async (seconds: number) => {
    await pageFixture.page.waitForTimeout( seconds * 1000);
})