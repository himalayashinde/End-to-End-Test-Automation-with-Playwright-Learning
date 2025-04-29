import { test, expect } from '@playwright/test';

test("Navigating to Lounge of Warehouse website", async ({ page }) => {
    // Navigate to the website
    await page.goto("https://www.thewarehouse.co.nz/", { waitUntil: 'domcontentloaded' });
    await expect.soft(page).toHaveURL("https://www.thewarehouse.co.nz/");

    // Hover over the category menu
    var categoryRoot = page.locator("data-test-id=category-root");
    var categoryHomeGarden = page.locator('.mega-menu-content-wrapper >> #category-homegarden').first(); // Use .first() to resolve strict mode violation
    await categoryRoot.hover();
    await expect.soft(categoryRoot).toBeVisible();
    await categoryHomeGarden.hover();

    // Validate attributes and IDs
    await expect.soft(categoryHomeGarden).toHaveAttribute("data-target", "#mega-menu-category-homegarden");
    await expect.soft(categoryHomeGarden).toHaveId("category-homegarden");

    // Click on "Lounge" and validate navigation
    await page.locator('a[role="menuitem"]:has-text("Lounge")').click();
    await expect(page.locator('.mega-menu-wrapper >> #category-homegarden')).not.toBeVisible();
    await expect(page.locator('.mega-menu-wrapper >> #category-homegarden')).toBeHidden();
    await expect(page.locator(".title")).toHaveText("Lounge");
    await expect(page).toHaveTitle("Lounge Suites - Couches, Lounge Chairs & Furniture");
});



