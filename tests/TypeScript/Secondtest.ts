import {chromium} from '@playwright/test';

//Asynchronous function to run the test

(async()=>{

const browser = await chromium.launch({
    headless: false
});

//browser instance

const browserInstance = await browser.newContext();

//new page
const page = await browserInstance.newPage();

//navigate to the url
await page.goto('http://eaapp.somee.com/');
//console.log('Page title:', await page.title());
await page.locator("a[id='loginLink']",{hasText : 'Login'}).click();
console
//close the browser instance    
await browser.close();
console.log('Browser closed.');

})();