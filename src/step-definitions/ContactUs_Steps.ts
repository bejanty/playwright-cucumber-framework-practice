import { Given, When, Then } from "@cucumber/cucumber";
import { pageFixture } from "../hooks/browserContextFixture";
import { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { CucumberWorld } from "./world/CucumberWorld";
import logger from "../logger/logger";

When('I type a first name', async function (this: CucumberWorld) {
  logger.info(`Base URL stored in CucumberWorld: ${this.getUrl()}`);
  //await pageFixture.page.getByPlaceholder('First Name').fill("Joe");
  await this.contactUsPage.typeFirstName("Joe");
  //this.setFirstName("Joe");
});

When('I type a last name', async function (this: CucumberWorld) {
  await this.contactUsPage.typeLastName("Blogs");

});

When('I enter an email address', async function (this: CucumberWorld) {
  await this.contactUsPage.typeEmailAddress("JBlogs@email.com");

});

When('I type a comment', async function (this: CucumberWorld) {
  await this.contactUsPage.typeComment("Hello World");

});

When('I click on the submit button', async function (this: CucumberWorld) {
  await this.contactUsPage.clickOnSubmitButton();
});

Then('I should be presented with a successful contact us submission message', async function (this: CucumberWorld) {
  const successMessage = await this.contactUsPage.getSuccessfulMessage();
  expect(successMessage).toBe("Thank You for your Message!");
});


Then('I should be presented with a unsuccessful contact us submission message', async function (this: CucumberWorld){
  const errorMessage = await this.contactUsPage.getErrorMessage();
  expect(errorMessage).toMatch(/Error: (all fields are required|Invalid email address)/);
});

//Cucumber Expression: 
When('I type a specific first name {string}', async function(this: CucumberWorld, firstName: string) {
  await this.contactUsPage.typeFirstName(firstName);
});

When('I type a specific last name {string}', async function(this: CucumberWorld, lastName: string) {
  await this.contactUsPage.typeLastName(lastName);
});

When('I enter a specific email address {string}', async function(this: CucumberWorld, emailAddress: string) {
  await this.contactUsPage.typeEmailAddress(emailAddress);
});

When('I type a specific comment {string} and a number {int} within the comment input field', async function(this: CucumberWorld, words: string, number: number) {
  await this.contactUsPage.typeComment(words + " " + number);
});

//Random Data - Faker
When('I type a random first name', async function (this: CucumberWorld) {
  const randomFirstName = faker.person.firstName();
  this.setFirstName(randomFirstName); // Store the random first name in the CucumberWorld instance
  await this.contactUsPage.typeFirstName(randomFirstName);
});

When('I type a random last name', async function (this: CucumberWorld) {
  const randomLastName = faker.person.lastName();
  this.setLastName(randomLastName); // Store the random last name in the CucumberWorld instance
  await this.contactUsPage.typeLastName(randomLastName);

});

When('I enter a random email address', async function (this: CucumberWorld) {
  const randomEmail = faker.internet.email();
  this.setEmailAddress(randomEmail); // Store the random email address in the CucumberWorld instance
  await this.contactUsPage.typeEmailAddress(randomEmail);
});


When('I type a random comment', async function (this: CucumberWorld) {
  // const randomComment = faker.lorem.sentence();
  // this.setComment(randomComment); // Store the random comment in the CucumberWorld instance
  await this.contactUsPage.typeComment(`Please contact me. \n Thanks 
    ${this.getFirstName()} ${this.getLastName()} \n Email: ${this.getEmailAddress()}`);
});

When('I type a first name {word} and a last name {word}', async function(this:CucumberWorld, firstName: string, lastName: string){
  await this.contactUsPage.typeFirstName(firstName);
  await this.contactUsPage.typeLastName(lastName);
});

When('I type an email address {string} and a comment {string}', async function(this:CucumberWorld, email: string, comment: string) {
  await this.contactUsPage.typeEmailAddress(email);
  await this.contactUsPage.typeComment(comment);
});

Then('I should be presented with a header message {string}', async function(this:CucumberWorld, message: string) {
  const headerText = await this.contactUsPage.getHeaderText(message);

  //Perform an assertion
  expect(headerText).toContain(message);
});