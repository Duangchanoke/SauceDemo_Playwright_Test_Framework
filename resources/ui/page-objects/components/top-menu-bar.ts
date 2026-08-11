import { Locator, Page, expect } from '@playwright/test';

export class TopMenuBar {
    private readonly page: Page;
    private readonly menu_bar_element: Locator;
    private readonly burger_menu_element: Locator;
    private readonly shopping_cart_button: Locator;
    private readonly shopping_cart_badge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.menu_bar_element = page.locator('.header_label');
        this.burger_menu_element = page.locator('#react-burger-menu-btn');
        this.shopping_cart_button = page.locator('[data-test="shopping-cart-link"]');
        this.shopping_cart_badge = page.locator('[data-test="shopping-cart-badge"]');
    }

    public async verifyBarLoaded() {
        await this.verifyTopBarElement();
        await this.verifyBurgerMenuButton();
        await this.verifyShoppingCartButton();
    }

    public async verifyTopBarElement() {
        await expect(this.menu_bar_element).toBeVisible();
    }

    public async verifyBurgerMenuButton() {
        await expect(this.burger_menu_element).toBeEnabled();
    }

    public async verifyShoppingCartButton() {
        await expect(this.shopping_cart_button).toBeEnabled();
    }

    public async verifyShoppingCartBadge(selected_product_count: number) {
        this.scrollViewToTopBar();
        if (selected_product_count > 0) {
            await expect(this.shopping_cart_badge).toBeVisible();
            await expect(this.shopping_cart_badge).toHaveText(selected_product_count.toString());
        }
        else {
            await expect(this.shopping_cart_badge).not.toBeVisible();
        }
    }

    public async scrollViewToTopBar() {
        await this.verifyTopBarElement();
        await expect(this.menu_bar_element).toBeInViewport({ ratio: 1 });
    }

    public async clickBurgerMenuButton() {
        await this.burger_menu_element.click({ timeout: 3000 });
    }

    public async clickShoppingCartButton() {
        await this.shopping_cart_button.click();
    }
}