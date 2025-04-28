import { test, expect } from '@playwright/test';

let extractedPassword: string; // Variable to store the extracted password

test('should navigate to Forgot Password page', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/locatorspractice/');
  await page.getByRole('link', { name: 'Forgot your password?' }).click();
  await expect(page.getByRole('heading', { name: 'Forgot password' })).toBeVisible();
});

test('should reset login with valid details and extract password', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/locatorspractice/');
  await page.getByRole('link', { name: 'Forgot your password?' }).click();
  await page.getByRole('textbox', { name: 'Name', exact: true }).fill('himalaya');
  await page.getByRole('textbox', { name: 'Email' }).fill('himalayashinde@gmail.com');
  await page.getByRole('textbox', { name: 'Phone Number' }).fill('8987656789');
  await page.getByRole('button', { name: 'Reset Login' }).click();

  // Extract the password from the message
  const message = await page.getByText(/Please use temporary password/).textContent();
  extractedPassword = message?.match(/'([^']+)'/)?.[1] || ''; // Extract text between single quotes
  console.log('Extracted Password:', extractedPassword);

  await expect(message).toContain('Please use temporary password');
});


test('should navigate back to login page', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/locatorspractice/');
  await page.getByRole('link', { name: 'Forgot your password?' }).click();
  await page.getByRole('button', { name: 'Go to Login' }).click();
  await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
});


test('should log in with extracted password', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/locatorspractice/');
  await page.getByRole('textbox', { name: 'Username' }).fill('himalaya');
  await page.getByRole('textbox', { name: 'Password' }).fill(extractedPassword); // Use extracted password
  await page.getByRole('checkbox', { name: 'Remember my username' }).check();
  await page.getByRole('checkbox', { name: 'I agree to the terms and' }).check();
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByText('You are successfully logged in.')).toBeVisible();
});

test('should show error for invalid credentials', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/locatorspractice/');
  await page.getByRole('textbox', { name: 'Username' }).fill('invalidUser');
  await page.getByRole('textbox', { name: 'Password' }).fill('invalidPassword');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByText('* Incorrect username or password')).toBeVisible();
});


test('should log out successfully', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/locatorspractice/');
  await page.getByRole('textbox', { name: 'Username' }).fill('himalaya');
  await page.getByRole('textbox', { name: 'Password' }).fill(extractedPassword);
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('button', { name: 'Log Out' }).click();
  await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
});

