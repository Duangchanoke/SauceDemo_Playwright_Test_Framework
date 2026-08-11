import { Locator, Page, expect } from '@playwright/test';

export class SideMenuBar {
    private readonly menu_option_all_items_message       = 'All Items';
    private readonly menu_option_about_message           = 'About';
    private readonly menu_option_logout_message          = 'Logout';
    private readonly menu_option_reset_app_state_message = 'Reset App State';

    private readonly page: Page;
    private readonly menu_bar_element: Locator;
    private readonly menu_option_all_items_button: Locator;
    private readonly menu_option_about_button: Locator;
    private readonly menu_option_logout_button: Locator;
    private readonly menu_option_reset_app_state_button: Locator;

    constructor(page: Page) {
        this.page = page;
        this.menu_bar_element = page.locator('.bm-menu-wrap');
        this.menu_option_all_items_button = page.locator('#inventory_sidebar_link');
        this.menu_option_about_button = page.locator('#about_sidebar_link');
        this.menu_option_logout_button = page.locator('#logout_sidebar_link');
        this.menu_option_reset_app_state_button = page.locator('#reset_sidebar_link');
    }

    public async verifyBarLoaded() {
        this.verifySideBarElement();
        this.verifyAllItemsButton();
        this.verifyAboutButton();
        this.verifyLogOutButton();
    }

    public async verifySideBarElement() {
        await expect(this.menu_bar_element).toBeVisible();
        await expect(this.menu_bar_element).toBeInViewport( { ratio: 0.85, timeout: 50000 });
    }

    public async verifyAllItemsButton() {
        await expect(this.menu_option_all_items_button).toBeEnabled();
        await expect(this.menu_option_all_items_button).toHaveText(this.menu_option_all_items_message);
    }

    public async verifyAboutButton() {
        await expect(this.menu_option_about_button).toBeEnabled();
        await expect(this.menu_option_about_button).toHaveText(this.menu_option_about_message);
    }

    public async verifyLogOutButton() {
        await expect(this.menu_option_logout_button).toBeEnabled();
        await expect(this.menu_option_logout_button).toHaveText(this.menu_option_logout_message);
    }

    public async verifyResetAppStateButton() {
        await expect(this.menu_option_reset_app_state_button).toBeEnabled();
        await expect(this.menu_option_reset_app_state_button).toHaveText(this.menu_option_reset_app_state_message);
    }

    public async clickLogOutButton() {
        await this.menu_option_logout_button.click();
    }
}