import { test, expect } from '@playwright/test';

test.describe('Admin Panel E2E', () => {
    test('redirects unauthenticated user to login screen', async ({ page }) => {
        await page.goto('/admin');
        await expect(page).toHaveURL(/.*login/);
        await expect(page.locator('text=Administrative Terminal')).toBeVisible();
    });

    test('logs in admin user and navigates dashboard metrics', async ({ page }) => {
        await page.goto('/admin/login');

        await page.fill('input[type="email"]', 'warrdev08@gmail.com');
        await page.fill('input[type="password"]', 'password');
        await page.click('button[type="submit"]');

        // Verify Dashboard lands
        await expect(page).toHaveURL(/.*admin/);
        await expect(page.locator('h1')).toContainText('Overview & Analytics');
        await expect(page.locator('text=Unread Inquiries')).toBeVisible();
        await expect(page.locator('text=Featured Projects')).toBeVisible();
    });

    test('updates site settings and reflects dynamically on public portfolio', async ({ page }) => {
        // Login
        await page.goto('/admin/login');
        await page.fill('input[type="email"]', 'warrdev08@gmail.com');
        await page.fill('input[type="password"]', 'password');
        await page.click('button[type="submit"]');

        // Wait for login to complete and dashboard to load
        await expect(page).toHaveURL(/.*admin$/);
        await expect(page.locator('text=Unread Inquiries')).toBeVisible();

        // Navigate to settings directly
        await page.goto('/admin/settings');
        await expect(page.locator('h1')).toContainText('Site & Profile Settings');

        // Update status pill to dynamic value
        const updatedStatus = 'Available for Principal Architecture Roles';
        await page.fill('[data-testid="settings-status-badge"]', updatedStatus);

        // Submit form
        await page.click('button:has-text("Save Settings")');

        // Verify toast
        await expect(page.locator('text=Profile and site settings updated successfully.')).toBeVisible({ timeout: 10000 });

        // Visit public portfolio and assert updated status is live
        await page.goto('/');
        await expect(page.locator(`text=${updatedStatus}`)).toBeVisible();
    });

    test('verifies specialized capability section hides when empty and displays when entries exist', async ({ page }) => {
        await page.goto('/admin/login');
        await page.fill('input[type="email"]', 'warrdev08@gmail.com');
        await page.fill('input[type="password"]', 'password');
        await page.click('button[type="submit"]');
        await expect(page).toHaveURL(/.*admin$/);

        // Go to settings and verify Specialized Capabilities section is present
        await page.goto('/admin/settings');
        await expect(page.locator('text=03 / Specialized Capabilities')).toBeVisible();

        // Check if there are existing entries, delete them to test hiding
        const deleteButtons = page.locator('button[title="Delete capability entry"]');
        const count = await deleteButtons.count();
        for (let i = 0; i < count; i++) {
            await page.locator('button[title="Delete capability entry"]').first().click();
        }

        // Save settings with 0 entries
        await page.click('button:has-text("Save Settings")');
        await expect(page.locator('text=Profile and site settings updated successfully.')).toBeVisible({ timeout: 10000 });

        // Visit public portfolio: #hardware-systems must NOT exist
        await page.goto('/');
        await expect(page.locator('#hardware-systems')).not.toBeVisible();

        // Return to admin, re-add an entry and save
        await page.goto('/admin/settings');
        await page.click('button:has-text("Add Capability")');
        await page.fill('input[placeholder="e.g. Casino Terminal Hardware Integration"]', 'Casino Terminal Hardware Integration');
        await page.fill('textarea[placeholder="Explain technical systems, hardware drivers, low-level architecture, or edge protocols..."]', 'Wrote low-level C++ drivers interfacing physical bill acceptors, ticket validators, LED controllers, and thermal printers.');
        await page.click('button:has-text("Save Settings")');
        await expect(page.locator('text=Profile and site settings updated successfully.')).toBeVisible({ timeout: 10000 });

        // Visit public portfolio: #hardware-systems must now be visible with the new capability
        await page.goto('/');
        await expect(page.locator('#hardware-systems')).toBeVisible();
        await expect(page.locator('text=Casino Terminal Hardware Integration')).toBeVisible();
    });

    test('verifies mobile hamburger menu drawer toggle in admin panel', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/admin/login');

        await page.fill('input[type="email"]', 'warrdev08@gmail.com');
        await page.fill('input[type="password"]', 'password');
        await page.click('button[type="submit"]');

        await expect(page).toHaveURL(/.*admin$/);

        const drawerButton = page.locator('button[aria-label="Toggle navigation drawer"]');
        await expect(drawerButton).toBeVisible();

        // Open mobile navigation drawer
        await drawerButton.click();
        const drawer = page.locator('[data-testid="admin-mobile-drawer"]');
        await expect(drawer).toBeVisible();
        await expect(page.locator('[data-testid="admin-mobile-nav-projects"]')).toBeVisible();
        await expect(page.locator('[data-testid="admin-mobile-nav-skills-arsenal"]')).toBeVisible();

        // Close mobile drawer
        await drawerButton.click();
        await expect(drawer).not.toBeVisible();
    });
});
