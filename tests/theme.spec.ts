import { test, expect } from '@playwright/test';

test.describe('Theme Stability', () => {
    test.beforeEach(async ({ page }) => {
        // Clear localStorage and cookies before each test to ensure isolation
        await page.goto('es');
        await page.evaluate(() => localStorage.clear());
        await page.context().clearCookies();
    });

    test('should respect system dark mode preference on initial load', async ({ page }) => {
        // Set system preference to dark
        await page.emulateMedia({ colorScheme: 'dark' });

        // Go to the Spanish home page
        await page.goto('es');

        // Check if the html element has the 'dark' class
        const html = page.locator('html');
        // Wait for next-themes hydration if necessary
        // Wait for next-themes hydration if necessary
        await expect(html).toHaveClass(/dark/, { timeout: 10000 });

        // Check if the dark logo is visible
        const darkLogo = page.locator('img.theme-logo-dark');
        await expect(darkLogo).toBeVisible({ timeout: 10000 });

        // Check if the light logo is hidden
        const lightLogo = page.locator('img.theme-logo-light');
        await expect(lightLogo).toBeHidden({ timeout: 10000 });

        // Check if the toggle icon matches (dark mode -> sun icon should be visible)
        const sunIcon = page.locator('.sun-icon');
        const moonIcon = page.locator('.moon-icon');
        await expect(sunIcon).toBeVisible({ timeout: 10000 });
        await expect(moonIcon).toBeHidden({ timeout: 10000 });
    });

    test('should respect system light mode preference on initial load', async ({ page }) => {
        // Set system preference to light
        await page.emulateMedia({ colorScheme: 'light' });

        // Go to the Spanish home page
        await page.goto('es');

        // Check if the html element does NOT have the 'dark' class
        const html = page.locator('html');
        await expect(html).not.toHaveClass(/dark/, { timeout: 10000 });

        // Check if the light logo is visible
        const lightLogo = page.locator('img.theme-logo-light');
        await expect(lightLogo).toBeVisible({ timeout: 10000 });

        // Check if the dark logo is hidden
        const darkLogo = page.locator('img.theme-logo-dark');
        await expect(darkLogo).toBeHidden({ timeout: 10000 });

        // Check if the toggle icon matches (light mode -> moon icon should be visible)
        const sunIcon = page.locator('.sun-icon');
        const moonIcon = page.locator('.moon-icon');
        await expect(sunIcon).toBeHidden({ timeout: 10000 });
        await expect(moonIcon).toBeVisible({ timeout: 10000 });
    });

    test('should persist theme selection across navigations', async ({ page }) => {
        await page.goto('es');

        // Wait for hydration to be ready (ThemeToggle should be interactive)
        await page.waitForLoadState('networkidle');

        // Toggle theme (assuming ThemeToggle is accessible)
        // We can click the button with aria-label="Toggle theme"
        const toggleButton = page.getByLabel('Toggle theme');
        await expect(toggleButton).toBeVisible();
        await toggleButton.click();

        // Determine the state after toggle
        const isDark = await page.locator('html').evaluate(el => el.classList.contains('dark'));

        // Navigate to another page
        await page.click('text=Servicios');
        await expect(page).toHaveURL(/.*\/services/);

        // Verify theme persisted
        const html = page.locator('html');
        if (isDark) {
            await expect(html).toHaveClass(/dark/, { timeout: 10000 });
        } else {
            await expect(html).not.toHaveClass(/dark/, { timeout: 10000 });
        }
    });
});
