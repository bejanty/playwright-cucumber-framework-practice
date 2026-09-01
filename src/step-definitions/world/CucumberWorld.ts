import { World, setWorldConstructor, IWorldOptions } from "@cucumber/cucumber";
import { PageManager } from "../../page-objects/base/PageManager";
import { BasePage } from "../../page-objects/base/BasePage";

export class CucumberWorld extends World {
    public pageManager: PageManager;
    public basePage: BasePage;

    //Base URL
    private url?: string;

    //Person
    private firstName?: string;
    private lastName?: string;
    private emailAddress?: string;

    //{ attach, log, parameters }: IWorldOptions are required in the constructor of your CucumberWorld class to 
    //inherit functionalities from the base World class and to initialize your PageManager and BasePage.
    constructor({ attach, log, parameters, link }: IWorldOptions) {
        super({ attach, log, parameters, link }); //Pass the options to the world constructor
        this.pageManager = new PageManager(); // Initialize PageManager
        this.basePage = this.pageManager.createBasePage();
    }
    //Setter methods for first name, last name, and email address
    setUrl(url: string) {
        this.url = url;
    }
    setFirstName(firstName: string) {
        this.firstName = firstName;
    }
    setLastName(lastName: string) {
        this.lastName = lastName;
    }
    setEmailAddress(emailAddress: string) {
        this.emailAddress = emailAddress;
    }

    //Getter methods for first name, last name, and email address
    getUrl() {
        return this.url;
    }
    getFirstName() {
        return this.firstName;
    }
    getLastName() {
        return this.lastName;
    }
    getEmailAddress() {
        return this.emailAddress;
    }

}

//Tell Cucumber World to use the custom world constructor
setWorldConstructor(CucumberWorld);