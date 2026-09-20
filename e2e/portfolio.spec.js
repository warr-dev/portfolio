import { test, expect } from '@playwright/test';

test.describe('Warren Dalawampu Portfolio E2E', () => {
    test('loads home page with title, hero typography, and recruiter metrics', async ({ page }) => {
        await page.goto('/');

        // Verify Hero & Header elements
        await expect(page).toHaveTitle(/Warren Dalawampu/);
        await expect(page.locator('h1')).toContainText('Warren Dalawampu');
        await expect(page.locator('text=Senior Backend Developer & Systems Software Engineer').first()).toBeVisible();

        // Verify Status Badge (flexible matcher for updated dynamic values)
        await expect(page.getByText(/Open to Senior|Available for/).first()).toBeVisible();

        // Verify Recruiter Hub & metric cards
        await expect(page.locator('#recruiter-hub')).toBeVisible();
        await expect(page.locator('text=NTT Limited Philippines').first()).toBeVisible();
        await expect(page.getByText(/\d+\+\s*Years/i).first()).toBeVisible();
    });

    test('verifies single active downloadable CV and LinkedIn section', async ({ page }) => {
        await page.goto('/');

        // Single chosen CV download button is visible
        const cvDownload = page.locator('a[download*=".pdf"]').first();
        await expect(cvDownload).toBeVisible();

        // Verify LinkedIn Section is rendered
        await expect(page.locator('#linkedin')).toBeVisible();
        await expect(page.locator('text=LinkedIn Profile & Network')).toBeVisible();
        await expect(page.locator('text=Connect on LinkedIn')).toBeVisible();
    });

    test('displays featured projects and hardware sections', async ({ page }) => {
        await page.goto('/');

        // Projects
        await expect(page.locator('#projects')).toBeVisible();
        await expect(page.locator('text=Casino Gaming Kiosk Hardware Bridge')).toBeVisible();
        await expect(page.locator('text=Autoffiliate AI Syndication Studio')).toBeVisible();

        // Hardware & C++ Section
        await expect(page.locator('#hardware-systems')).toBeVisible();
        await expect(page.locator('text=Casino Terminal Hardware Integration')).toBeVisible();

        // Navigate to dedicated project page
        const casinoProjectLink = page.locator('a[href*="/projects/casino-kiosk-hardware-bridge"]').first();
        await expect(casinoProjectLink).toBeVisible();
        await casinoProjectLink.click();

        await expect(page).toHaveURL(/.*projects\/casino-kiosk-hardware-bridge/);
        await expect(page.locator('h1')).toContainText('Casino Gaming Kiosk Hardware Bridge');
        await expect(page.locator('text=Back to All Works')).toBeVisible();
    });

    test('submits contact form and verifies successful submission toast', async ({ page }) => {
        await page.goto('/#contact');

        // Fill out contact form
        await page.fill('input[placeholder="Recruiter / Engineering Manager"]', 'Playwright Tester');
        await page.fill('input[placeholder="manager@company.com"]', 'playwright@testcompany.com');
        await page.fill('input[placeholder="Senior Backend / Full-Stack Engineer Role"]', 'Senior Systems Architect Inquiry');
        await page.fill('textarea[placeholder="Share role details, scope, team structure, or contract requirements..."]', 'Hello Warren, testing automated E2E inquiry transmission.');

        // Submit form
        await page.click('button[type="submit"]');

        // Assert success message displays
        await expect(page.locator('text=Message received. Warren will reply promptly within 24 hours.')).toBeVisible({ timeout: 10000 });
    });

    test('verifies mobile hamburger menu toggle on client portfolio', async ({ page }) => {
        // Set mobile viewport
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/');

        const menuButton = page.locator('button[aria-label="Toggle navigation menu"]');
        await expect(menuButton).toBeVisible();

        // Open menu
        await menuButton.click();
        const mobileDrawer = page.locator('[data-testid="mobile-menu-drawer"]');
        await expect(mobileDrawer).toBeVisible();

        const mobileRecruiterHubLink = page.locator('[data-testid="mobile-nav-recruiter-hub"]');
        await expect(mobileRecruiterHubLink).toBeVisible();
        await expect(page.locator('[data-testid="mobile-nav-experience"]')).toBeVisible();

        // Close menu by clicking again
        await menuButton.click();
        await expect(mobileDrawer).not.toBeVisible();
    });
});
