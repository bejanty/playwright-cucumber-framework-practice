import { setDefaultTimeout } from "@cucumber/cucumber";

//Load env vaiables from .env file
import {config as loadEnv } from "dotenv";
const env = loadEnv({path: './env/.env'});

const customTimeout = parseInt(env.parsed?.CUCUMBER_CUSTOM_TIMEOUT || '60000'); //60 seconds

//If too low this will affect playwright timeouts
// Example exception: Error: function timed out, ensure the promise resolves within 2000 milliseconds
setDefaultTimeout(customTimeout); //60 seconds