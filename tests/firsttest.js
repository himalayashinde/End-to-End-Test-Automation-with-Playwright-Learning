const {chromium} = require('@playwright/test');

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
await page.goto('https://www.google.com/');
console.log('Page title:', await page.title());


//close the browser instance    
await browser.close();
console.log('Browser closed.');

})();