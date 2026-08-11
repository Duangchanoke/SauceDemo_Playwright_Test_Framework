import { Locator, Page, expect } from '@playwright/test';
import { Constants } from '../../../../models/constants';
import { ProductItemPanel } from '../components/product-item-panel';

export class PurchaseSuccess {
    private readonly header_element_message          = Constants.purchase_success_page_header_element_message;
    private readonly thank_you_label_element_message = 'Thank you for your order!';
    private readonly delivery_label_element_message  = 'Your order has been dispatched, and will arrive just as fast as the pony can get there!';
    private readonly back_home_button_message        = 'Back Home';

    private readonly page: Page;
    private readonly thank_you_label_element: Locator;
    private readonly delivery_label_element: Locator;
    private readonly back_home_button: Locator;

    private product_item_panel: ProductItemPanel;

    constructor(page: Page) {
        this.page = page;
        this.thank_you_label_element = page.locator('[data-test="complete-header"]');
        this.delivery_label_element = page.locator('[data-test="complete-text"]');
        this.back_home_button = page.locator('[data-test="back-to-products"]');
        this.product_item_panel = new ProductItemPanel(page);
    }

    public async verifyPageLoaded() {
        await this.verifyPageHeader();
        await this.verifyNoProductOrCartList();
        await this.verifySuccessfulOrderPurchaseMessages();
        await this.verifyBackHomeButton();
    }

    public async verifyPageHeader() {
        const page_header_element = this.product_item_panel.getHeaderElement();
        await expect(page_header_element).toBeVisible();
        await expect(page_header_element).toHaveText(this.header_element_message);
    }

    public async verifyNoProductOrCartList() {
        await this.product_item_panel.verifyPanelLoaded(this.header_element_message);
    }

    public async verifySuccessfulOrderPurchaseMessages() {
        await this.verifyThankYouMessage();
        await this.verifyDeliveryMessage();
    }

    public async verifyThankYouMessage() {
        await expect(this.thank_you_label_element).toBeVisible();
        await expect(this.thank_you_label_element).toHaveText(this.thank_you_label_element_message);
    }

    public async verifyDeliveryMessage() {
        await expect(this.delivery_label_element).toBeVisible();
        await expect(this.delivery_label_element).toHaveText(this.delivery_label_element_message);
    }

    public async verifyBackHomeButton() {
        await expect(this.back_home_button).toBeEnabled();
        await expect(this.back_home_button).toHaveText(this.back_home_button_message);
    }

    public async clickBackHomeButton() {
        await this.back_home_button.click();
    }
}