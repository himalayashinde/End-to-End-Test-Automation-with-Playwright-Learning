import { test, expect } from '@playwright/test';

test("Navigating to Launge of Warehouse website", async ({page}) => {

    //navigate google
    await page.goto("https://www.thewarehouse.co.nz/", { waitUntil: 'domcontentloaded' });
    await expect.soft(page).toHaveURL("https://www.thewarehouse.co.nz/");

    //hover

    var categoryRoot = await page.locator("data-test-id=category-root");

    categoryRoot.hover();
    await expect.soft(categoryRoot).toBeVisible();
    await page.locator('.mega-menu-content-wrapper >> #category-homegarden').hover();

    await expect.soft(page.locator('.mega-menu-wrapper >> #category-homegarden')).toHaveAttribute("data-targets", "#mega-menu-category-homegarden");
    await expect.soft(page.locator('.mega-menu-wrapper >> #category-homegarden')).toHaveId("category-homegarde");

    await page.locator('a[role="menuitem"]:has-text("Lounge")').click();
    await expect(page.locator('.mega-menu-wrapper >> #category-homegarden')).not.toBeVisible();

    await expect(page.locator('.mega-menu-wrapper >> #category-homegarden')).toBeHidden();

    await expect(await page.locator(".title")).toHaveText("Lounge");

    await expect(page).toHaveTitle("Lounge Suites - Couches, Lounge Chairs & Furniture");


});



