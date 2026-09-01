import { Given, When } from "@cucumber/cucumber";
import { pageFixture } from "../hooks/browserContextFixture";
import { CucumberWorld } from "./world/CucumberWorld";

When('I switch to the new browser tab', async function (this:CucumberWorld) {

    // if(!pageFixture.newPagePromise) {
    //     throw new Error('newPagePromise was not set - did the previous step trigger a new tab?');
    // }

    // //Await the "page" event listener that was attached before the triggering click
    // pageFixture.page = await pageFixture.newPagePromise;
    // pageFixture.newPagePromise = undefined;

    //  // Bring the newly assigned tab to the front (make it active)
    // await pageFixture.page.bringToFront();

    // // Contact Us needs the popup sized correctly for the form; some popups
    // // (e.g. Login Portal's window.open() with a fixed size) can make
    // // setViewportSize() hang indefinitely in Firefox, so guard it with a
    // // timeout instead of skipping it outright or letting it block forever.
    // try {
    //     await Promise.race([
    //         pageFixture.page.setViewportSize({ width: config.width, height: config.height }),
    //         new Promise((_, reject) => setTimeout(() => reject(new Error('setViewportSize timed out')), 5000))
    //     ]);
    // } catch (err) {
    //     console.warn(`Could not resize new tab, continuing without it: ${err}`);
    // }
    await this.basePage.switchToNewTab();

});


Given('I wait for {int} seconds', async (seconds: number) => {
    await pageFixture.page.waitForTimeout(seconds * 1000);
});