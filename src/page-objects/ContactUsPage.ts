import { BasePage } from "./base/BasePage";

export class ContactUsPage extends BasePage {
    //type a first name
    public async typeFirstName(firstName: string): Promise<void> {
        await this.page.getByPlaceholder('First Name').fill(firstName);
    }

    //type a last name
    public async typeLastName(lastName: string): Promise<void> {
        await this.page.getByPlaceholder('Last Name').fill(lastName);
    }

    //type an email address
    public async typeEmailAddress(emailAddress: string): Promise<void> {
        await this.page.getByPlaceholder('Email Address').fill(emailAddress);
    }

    //type a comment
    public async typeComment(comment: string): Promise<void> {
        await this.page.getByPlaceholder('Comments').fill(comment);
    }

    //click on submit button
    public async clickOnSubmitButton(): Promise<void> {
        await this.page.waitForSelector('input[value="SUBMIT"]');
        await this.page.click('input[value="SUBMIT"]');
    }

    //get successful submission message
    public async getSuccessfulMessage(): Promise<string> {
        await this.page.waitForSelector('#contact_reply h1', { state: 'visible' });
        return await this.page.innerText('#contact_reply h1');
    }

    //get error page
    public async getErrorMessage(): Promise<string> {
        await this.page.waitForSelector('body');
        const bodyElement = await this.page.locator('body');
        const bodyText = await bodyElement.textContent();
        return bodyText ?? ''; //If bodyText is null, return an empty string
    }

    //get header text
    public async getHeaderText(message: string): Promise<string> {
          //Wait for the target element
          await this.page.waitForSelector("//body | // h1", { state: 'visible' });
        
          //Get all elements
          const elements = await this.page.locator("//body | // h1").elementHandles();
        
          let foundElementText = '';
        
          //Loop through each of the elements
          for (let element of elements) {
            //Get the inner text of the element
            let text = await element.innerText();
        
            //if statement to check whether text includes expected text
            if (text.includes(message)) {
              foundElementText = text;
              break;
            }
          }
          return foundElementText;
    }
}