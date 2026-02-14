import { test, expect } from '@playwright/test';

test.describe('Language Detection and Redirection', () => {
    test('should redirect to Spanish for es-ES browser language', async ({ page, context }) => {
        // Mock browser language
        await context.addInitScript(() => {
            Object.defineProperty(navigator, 'language', { get: () => 'es-ES' });
            Object.defineProperty(navigator, 'languages', { get: () => ['es-ES', 'es'] });
        });

        // Go to the root page
        await page.goto('');

        // Wait for redirection
        await page.waitForURL(/.*\/es/, { timeout: 10000 });

        // Final URL verification
        expect(page.url()).toContain('/es');

        // Verify content
        await page.waitForSelector('text=Ingeniería de Valor Añadido', { state: 'visible', timeout: 10000 });
    });

    test('should redirect to English for en-US browser language', async ({ page, context }) => {
        // Mock browser language
        await context.addInitScript(() => {
            Object.defineProperty(navigator, 'language', { get: () => 'en-US' });
            Object.defineProperty(navigator, 'languages', { get: () => ['en-US', 'en'] });
        });

        await page.goto('');

        // Wait for redirection
        await page.waitForURL(/.*\/en/, { timeout: 10000 });

        expect(page.url()).toContain('/en');

        await page.waitForSelector('text=Value-Added Engineering', { state: 'visible', timeout: 10000 });
    });

    test('should redirect to Portuguese for pt-BR browser language', async ({ page, context }) => {
        // Mock browser language
        await context.addInitScript(() => {
            Object.defineProperty(navigator, 'language', { get: () => 'pt-BR' });
            Object.defineProperty(navigator, 'languages', { get: () => ['pt-BR', 'pt'] });
        });

        await page.goto('');

        // Wait for redirection
        await page.waitForURL(/.*\/pt/, { timeout: 10000 });

        expect(page.url()).toContain('/pt');

        await page.waitForSelector('text=Engenharia de Valor Agregado', { state: 'visible', timeout: 10000 });
    });

    test('should redirect to Spanish (default) for unsupported languages', async ({ page, context }) => {
        // Mock an unsupported language
        await context.addInitScript(() => {
            Object.defineProperty(navigator, 'language', { get: () => 'fr-FR' });
        });

        await page.goto('');

        // Verify redirection to /es
        await expect(page).toHaveURL(/.*\/es/);
    });
});
