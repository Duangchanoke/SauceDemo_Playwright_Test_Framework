import { Locator, Page, expect } from '@playwright/test';
import { Product } from '../../../../models/product';
import { Payments } from '../../../../models/payments';
import { Constants } from '../../../../models/constants';
import { ProductItemPanel } from '../components/product-item-panel';

export class CheckOutPage {
    private readonly header_element_message                 = Constants.checkout_page_header_element_message;
    private readonly payment_label_element_message          = 'Payment Information:';
    private readonly payment_value_element_message          = 'SauceCard #31337';
    private readonly shipping_label_element_message         = 'Shipping Information:';
    private readonly shipping_value_element_message         = 'Free Pony Express Delivery!';
    private readonly total_price_label_element_message      = 'Price Total';
    private readonly item_total_label_element_message       = 'Item total:';
    private readonly tax_amount_label_element_message       = 'Tax:';
    private readonly net_price_label_element_message        = 'Total:';
    private readonly finish_button_message                  = 'Finish';
    private readonly cancel_button_message                  = 'Cancel';

    private readonly page: Page;
    private readonly order_summary_element: Locator;
    private readonly payment_label_element: Locator;
    private readonly payment_value_element: Locator;
    private readonly shipping_label_element: Locator;
    private readonly shipping_value_element: Locator;
    private readonly total_price_label_element: Locator;
    private readonly item_total_label_element: Locator;
    private readonly tax_amount_label_element: Locator;
    private readonly net_price_label_element: Locator;
    private readonly finish_button: Locator;
    private readonly cancel_button: Locator;

    private product_item_panel: ProductItemPanel;

    constructor(page: Page) {
        this.page = page;
        this.order_summary_element = page.locator('.summary_info');
        this.payment_label_element = page.locator('[data-test="payment-info-label"]');
        this.payment_value_element = page.locator('[data-test="payment-info-value"]');
        this.shipping_label_element = page.locator('[data-test="shipping-info-label"]');
        this.shipping_value_element = page.locator('[data-test="shipping-info-value"]');
        this.total_price_label_element = page.locator('[data-test="total-info-label"]');
        this.item_total_label_element = page.locator('[data-test="subtotal-label"]');
        this.tax_amount_label_element = page.locator('[data-test="tax-label"]');
        this.net_price_label_element = page.locator('[data-test="total-label"]');
        this.finish_button = page.locator('#finish');
        this.cancel_button = page.locator('#cancel');
        this.product_item_panel = new ProductItemPanel(page);
    }

    public async verifyPageLoaded() {
        await this.verifyPageHeader();
        await this.verifyProductCheckoutHeader();
        await this.verifyFinishButton();
        await this.verifyCancelButton();
    }

    public async verifyPageHeader() {
        const page_header_element = this.product_item_panel.getHeaderElement();
        await expect(page_header_element).toBeVisible();
        await expect(page_header_element).toHaveText(this.header_element_message);
    }

    public async verifyProductCheckoutHeader() {
        await this.product_item_panel.verifyPanelLoaded(this.header_element_message);
    }

    public async verifyProductCheckoutDetails(selected_product_list: Array<Product>) {
        await this.product_item_panel.verifyProductTableHeader();
        await this.product_item_panel.verifyProductTableBody(selected_product_list, true);
    }

    public async verifyOrderSummaryForCheckoutConfirmation(payment_amounts: Payments) {
        await expect(this.order_summary_element).toBeVisible();
        await this.scrollViewToSelectedElement(this.order_summary_element);
        
        await this.verifyPaymentInformation();
        await this.verifyShippingInformation();
        await this.verifyPaymentSummary(payment_amounts);
    }

    public async verifyPaymentInformation() {
        await expect(this.payment_label_element).toBeVisible();
        await expect(this.payment_label_element).toHaveText(this.payment_label_element_message);
        await expect(this.payment_value_element).toBeVisible();
        await expect(this.payment_value_element).toHaveText(this.payment_value_element_message);
    }

    public async verifyShippingInformation() {
        await expect(this.shipping_label_element).toBeVisible();
        await expect(this.shipping_label_element).toHaveText(this.shipping_label_element_message);
        await expect(this.shipping_value_element).toBeVisible();
        await expect(this.shipping_value_element).toHaveText(this.shipping_value_element_message);
    }

    public async verifyPaymentSummary(payment_amounts: Payments) {
        await expect(this.total_price_label_element).toBeVisible();
        await expect(this.total_price_label_element).toHaveText(this.total_price_label_element_message);
        await this.verifyItemTotalInPaymentSummary(payment_amounts.total_amount, payment_amounts.amount_currency);
        await this.verifyTaxAmountInPaymentSummary(payment_amounts.tax_amount, payment_amounts.amount_currency);
        await this.verifyNetTotalPriceInPaymentSummary(payment_amounts.net_amount, payment_amounts.amount_currency);
    }

    public async verifyItemTotalInPaymentSummary(total_amount: string, amount_currency: string) {
        let item_total_message = this.item_total_label_element_message + " " + amount_currency + total_amount;
        await expect(this.item_total_label_element).toBeVisible();
        await expect(this.item_total_label_element).toHaveText(item_total_message);
    }

    public async verifyTaxAmountInPaymentSummary(tax_amount: string, amount_currency: string) {
        let tax_amount_message = this.tax_amount_label_element_message + " " + amount_currency + tax_amount;
        await expect(this.tax_amount_label_element).toBeVisible();
        await expect(this.tax_amount_label_element).toHaveText(tax_amount_message);
    }

    public async verifyNetTotalPriceInPaymentSummary(net_amount: string, amount_currency: string) {
        let net_amount_message = this.net_price_label_element_message + " " + amount_currency + net_amount;
        await expect(this.net_price_label_element).toBeVisible();
        await expect(this.net_price_label_element).toHaveText(net_amount_message);
    }

    public async verifyFinishButton() {
        await expect(this.finish_button).toBeEnabled();
        await expect(this.finish_button).toHaveText(this.finish_button_message);
    }

    public async verifyCancelButton() {
        await expect(this.cancel_button).toBeEnabled();
        await expect(this.cancel_button).toHaveText(this.cancel_button_message);
    }

    public async clickFinishButton() {
        await this.scrollViewToSelectedElement(this.finish_button);
        await this.finish_button.click();
    }

    public async clickCancelButton() {
        await this.scrollViewToSelectedElement(this.cancel_button);
        await this.cancel_button.click();
    }

    public async scrollViewToSelectedElement(selected_element: Locator) {
        await selected_element.evaluate((element) => {
            element.scrollIntoView({ block: 'start' });
        });
    }
}