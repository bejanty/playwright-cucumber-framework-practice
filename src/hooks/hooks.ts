import { After, AfterAll, Before, BeforeAll, Status } from "@cucumber/cucumber";
import { Browser, BrowserType, chromium, firefox, webkit } from "@playwright/test";
import { pageFixture } from "./browserContextFixture";
import { setGlobalSettings } from "../utils/playwright-timeout";
import { PageManager } from "../page-objects/base/PageManager";

//Load env variables from .env file
import {config as loadEnv} from "dotenv";
const  env = loadEnv({path: './env/.env', quiet: true});

//Create a configuration object for easy access to env variables
const config = {
    headless: env.parsed?.HEADLESS === 'true',
    browser: process.env.BROWSER_CHOICE || env.parsed?.UI_AUTOMATION_BROWSER || 'chromium',
    width: parseInt(process.env.WIDTH ||env.parsed?.BROWSER_WIDTH || '1920'),
    height: parseInt(process.env.HEIGHT ||env.parsed?.BROWSER_HEIGHT || '1080')
}

//Create dictionary mapping browser names to their launch functions
const browsers: { [key:string]: BrowserType } = {
    'chromium': chromium,
    'firefox': firefox,
    'webkit': webkit
}

let browserInstance: Browser | null = null;

async function initializeBrowserContext(selectedBrowser: string): Promise<Browser> {
    const launchBrowser = browsers[selectedBrowser];
    if(!launchBrowser) {
        throw new Error(`Invalid browser selected: ${selectedBrowser}`);
    }

    return await launchBrowser.launch( {headless: config.headless});
}

async function initializePage(): Promise<void> {
    if(!browserInstance) {
        throw new Error('Browser instance is null');
    }
    pageFixture.context = await browserInstance.newContext({
        ignoreHTTPSErrors: true,

    });
    pageFixture.page = await pageFixture.context.newPage();
    setGlobalSettings(pageFixture.page);
    await pageFixture.page.setViewportSize({width: config.width, height: config.height});
}

BeforeAll(async function() {
    console.log("\nExecuting test suite...");
    // Launch the browser ONCE per worker process instead of once per scenario.
    // A full browser process launch is the most expensive part of a Playwright
    // run (especially headed) - reusing it and only creating a fresh
    // BrowserContext/Page per scenario keeps isolation while cutting most of
    // that cost out of every scenario.
    try {
        browserInstance = await initializeBrowserContext(config.browser);
        console.log(`Broswer context initialized for: ${config.browser}`);
    } catch (error) {
        console.error('Browser initialisation failed: ', error);
    }
})

AfterAll(async function () {
    if (browserInstance) {
        await browserInstance.close();
    }
    console.log("\nFinished execution of test suite!");
})

Before(async function() {
    try{
        await initializePage();

        this.pageManager = new PageManager();
        this.basePage = this.pageManager.createBasePage();
        this.homePage = this.pageManager.createHomePage();
        this.contactUsPage = this.pageManager.createContactUsPage();
        this.loginPage = this.pageManager.createLoginPage();
    } catch (error) {
        console.error('Page initialisation failed: ', error);
    }
})

After(async function ({pickle, result}) {
    if(result?.status === Status.FAILED) {
        if(pageFixture.page) {
            const screenshotPath = `./reports/screenshots/${pickle.name}-${Date.now()}.png`;
            const image = await pageFixture.page.screenshot({
                path: screenshotPath,
                type: 'png',
                //timeout: 60000
            });
            await this.attach(image, 'image/png');
        } else {
            console.error('pageFixture.page is undefined');
        }
    }

    // if(browserInstance) {
    //     await pageFixture.page?.close();
    //     await browserInstance.close();
    // }
    // Only tear down the context/page here; the browser itself stays alive
    // for the rest of this worker's scenarios and is closed in AfterAll.
    await pageFixture.context?.close();
})