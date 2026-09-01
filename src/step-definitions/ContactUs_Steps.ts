import { Given, When, Then } from "@cucumber/cucumber";
import { pageFixture } from "../hooks/browserContextFixture";
import { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { CucumberWorld } from "./world/CucumberWorld";
import logger from "../logger/logger";

When('I type a first name', async function (this: CucumberWorld) {
  logger.info(`Base URL stored in CucumberWorld: ${this.getUrl()}`);
  await pageFixture.page.getByPlaceholder('First Name').fill("Joe");
  this.setFirstName("Joe");
});

When('I type a last name', async () => {
  await pageFixture.page.getByPlaceholder('Last Name').fill("Blogs");

});

When('I enter an email address', async () => {
  await pageFixture.page.getByPlaceholder('Email Address').fill("JBlogs@email.com");

});

When('I type a comment', async () => {
  await pageFixture.page.getByPlaceholder('Comments').fill("Hello World");

});

When('I click on the submit button', async () => {
  await pageFixture.page.waitForSelector('input[value="SUBMIT"]');

  //Once loaded, click on the button
  await pageFixture.page.click('input[value="SUBMIT"]');
});

Then('I should be presented with a successful contact us submission message', async () => {
  // Waiting for the header text element
  await pageFixture.page.waitForSelector('#contact_reply h1', { state: 'visible' });

  //Get text from h1
  const text = await pageFixture.page.innerText('#contact_reply h1');
  expect(text).toBe("Thank You for your Message!");
});

Then('I should be presented with a unsuccessful contact us submission message', async () => {
  // Waiting for the <body> element
  await pageFixture.page.waitForSelector('body');

  //Locate the <body> element
  const bodyElement = await pageFixture.page.locator('body');

  const bodyText = await bodyElement.textContent();
  expect(bodyText).toMatch(/Error: (all fields are required|Invalid email address)/);
});

//Cucumber Expression: 
When('I type a specific first name {string}', async (firstName: string) => {
  await pageFixture.page.getByPlaceholder('First Name').fill(firstName);
});

When('I type a specific last name {string}', async (lastName: string) => {
  await pageFixture.page.getByPlaceholder('Last Name').fill(lastName);
});

When('I enter a specific email address {string}', async (emailAddress: string) => {
  await pageFixture.page.getByPlaceholder('Email Address').fill(emailAddress);
});

When('I type a specific comment {string} and a number {int} within the comment input field', async (words: string, number: number) => {
  await pageFixture.page.getByPlaceholder('Comments').fill(words + " " + number);
});

//Random Data - Faker
When('I type a random first name', async function (this: CucumberWorld) {
  const randomFirstName = faker.person.firstName();
  this.setFirstName(randomFirstName); // Store the random first name in the CucumberWorld instance
  await pageFixture.page.getByPlaceholder('First Name').fill(randomFirstName);

});

When('I type a random last name', async function (this: CucumberWorld) {
  const randomLastName = faker.person.lastName();
  this.setLastName(randomLastName); // Store the random last name in the CucumberWorld instance
  await pageFixture.page.getByPlaceholder('Last Name').fill(randomLastName);

});

When('I enter a random email address', async function (this: CucumberWorld) {
  const randomEmail = faker.internet.email();
  this.setEmailAddress(randomEmail); // Store the random email address in the CucumberWorld instance
  await pageFixture.page.getByPlaceholder('Email Address').fill(randomEmail);
});


When('I type a random comment', async function (this: CucumberWorld) {
  // const randomComment = faker.lorem.sentence();
  // this.setComment(randomComment); // Store the random comment in the CucumberWorld instance
  await pageFixture.page.getByPlaceholder('Comments').fill(`Please contact me. \n Thanks 
    ${this.getFirstName()} ${this.getLastName()} \n Email: ${this.getEmailAddress()}`);
});

When('I type a first name {word} and a last name {word}', async (firstName: string, lastName: string) => {
  await pageFixture.page.getByPlaceholder('First Name').fill(firstName);
  await pageFixture.page.getByPlaceholder('Last Name').fill(lastName);

});

When('I type an email address {string} and a comment {string}', async (email: string, comment: string) => {
  await pageFixture.page.getByPlaceholder('Email Address').fill(email);
  await pageFixture.page.getByPlaceholder('Comments').fill(comment);
});

Then('I should be presented with a header message {string}', async (message: string) => {
  //Wait for the target element
  await pageFixture.page.waitForSelector("//body | // h1", { state: 'visible' });

  //Get all elements
  const elements = await pageFixture.page.locator("//body | // h1").elementHandles();

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

  //Perform an assertion
  expect(foundElementText).toContain(message);
});