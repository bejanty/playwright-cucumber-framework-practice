import { BasePage } from "./base/BasePage";

export class LoginPage extends BasePage {

    //navigate to login page
    public async navigateToLoginPage(): Promise<void> {
        await this.navigate("https://www.webdriveruniversity.com/Login-Portal/index.html");
    }

    //type a username
    public async typeUsername(username: string): Promise<void> {
        await this.page.getByPlaceholder('Username').fill(username);
    }

    //type a password
    public async typePassword(password: string): Promise<void> {
        await this.page.getByPlaceholder('Password').fill(password);
    }

    //click on the login button
    public async clickOnLoginButton(): Promise<void> {
        // await this.page.on('dialog', async (alert) => {
        //     //const alertText = alert.message();
        //     //console.log(alertText);
        //     await alert.accept();
        // })
        const loginBtn = await this.page.locator('#login-button');
        await loginBtn.hover();
        await loginBtn.click({ force: true });
    }

    //Check the alert box text
    // public async getAlertText(alertText: string): Promise<string> {
    //     //let alertText: string = '';
    //     await this.page.on('dialog', async (alert) => {
    //         alertText = alert.message();
    //         await alert.accept();
    //     });
    //     return alertText;
    // }
}