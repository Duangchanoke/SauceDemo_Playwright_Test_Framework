import { Locator, Page, expect } from '@playwright/test';

export class LogInPage {
    private readonly header_element_message   = 'Swag Labs';
    private readonly title_element_message    = this.header_element_message;
    private readonly username_textbox_message = 'Username';
    private readonly password_textbox_message = 'Password';
    private readonly login_button_message     = 'Login';
    
    private readonly page: Page;
    private readonly header_element: Locator;
    private readonly username_textbox: Locator;
    private readonly password_textbox: Locator;
    private readonly login_button: Locator;
    private readonly error_messages_alert: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.header_element = page.locator('.login_logo');
        this.username_textbox = page.getByPlaceholder(this.username_textbox_message);
        this.password_textbox = page.getByPlaceholder(this.password_textbox_message);
        this.login_button = page.locator('#login-button');
        this.error_messages_alert = page.locator('[data-test="error"]');
    }

    public async navigateToLogInPage() {
        await this.page.goto('https://www.saucedemo.com', { waitUntil: "load" });
    }

    public async verifyPageLoaded() {
        await expect(this.page).toHaveTitle(this.title_element_message);
        await expect(this.header_element).toBeVisible();
        await expect(this.header_element).toHaveText(this.header_element_message);
    }

    public async verifyErrorMessagesAlert(error_messages: string) {
        await expect(this.error_messages_alert).toBeVisible();
        await expect(this.error_messages_alert).toHaveText(error_messages);
    }

    public async enterUsername(username: string) {
        await expect(this.username_textbox).toBeVisible();
        await this.username_textbox.fill(username);
    }

    public async enterPassword(password: string) {
        await expect(this.password_textbox).toBeVisible();
        await this.password_textbox.fill(password);
    }

    public async clickLogInButton() {
        await expect(this.login_button).toBeEnabled();
        await expect(this.login_button).toHaveText(this.login_button_message);
        await this.login_button.click();
    }

    public async submitUserCredentials(username: string, password: string) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogInButton();
    }
}