import { setDefaultTimeout } from "@cucumber/cucumber";

//If too low this will affect playwright timeouts
setDefaultTimeout(60000); //60 seconds