import { Locator, Page, expect } from '@playwright/test';
import { Product } from '../../../../models/product';
import { Constants } from '../../../../models/constants';
import { ProductItemPanel } from '../components/product-item-panel';

export class CartPage {
    private readonly header_element_message           = Constants.cart_page_header_element_message;
    private readonly continue_shopping_button_message = 'Continue Shopping';
    private readonly checkout_button_message          = 'Checkout';

    private readonly page: Page;
    private readonly continue_shopping_button: Locator;
    private readonly checkout_button: Locator;

    private product_item_panel: ProductItemPanel;

    constructor(page: Page) {
        this.page = page;
        this.continue_shopping_button = page.locator('#continue-shopping');
        this.checkout_button = page.locator('#checkout');
        this.product_item_panel = new ProductItemPanel(page);
    }

    public async verifyPageLoaded() {
        await this.verifyPageHeader();
        await this.verifyCartList();
        await this.verifyContinueShoppingButton();
        await this.verifyCheckoutButton();
    }

    public async verifyPageHeader() {
        const page_header_element = this.product_item_panel.getHeaderElement();
        await expect(page_header_element).toBeVisible();
        await expect(page_header_element).toHaveText(this.header_element_message);
    }

    public async verifyCartList() {
        await this.product_item_panel.verifyPanelLoaded(this.header_element_message);
    }

    public async verifyProductDetailsInCart(selected_product_list: Array<Product>) {
        await this.product_item_panel.verifyProductTableHeader();
        await this.product_item_panel.verifyProductTableBody(selected_product_list, true);
    }

    public async verifyContinueShoppingButton() {
        await expect(this.continue_shopping_button).toBeEnabled();
        await expect(this.continue_shopping_button).toHaveText(this.continue_shopping_button_message);
    }

    public async verifyCheckoutButton() {
        await expect(this.checkout_button).toBeEnabled();
        await expect(this.checkout_button).toHaveText(this.checkout_button_message);
    }

    public async scrollViewToSelectedButton(selected_cart_button: Locator) {
        await selected_cart_button.evaluate((element) => {
            element.scrollIntoView({ block: 'center' });
        });
    }

    public async scrollViewToContinueShoppingButton() {
        await this.verifyContinueShoppingButton();
        await this.scrollViewToSelectedButton(this.continue_shopping_button);
    }

    public async scrollViewToCheckoutButton() {
        await this.verifyCheckoutButton();
        await this.scrollViewToSelectedButton(this.checkout_button);
    }

    public async clickContinueShoppingButton() {
        await this.scrollViewToContinueShoppingButton();
        await this.continue_shopping_button.click();
    }

    public async clickCheckoutButton() {
        await this.scrollViewToCheckoutButton();
        await this.checkout_button.click();
    }
}