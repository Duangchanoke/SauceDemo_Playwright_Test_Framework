import { Locator, Page, expect } from '@playwright/test';
import { Constants } from '../../../../models/constants';
import { ProductItemPanel } from '../components/product-item-panel';

export class CustomerDetailPage {
    private readonly header_element_message              = Constants.customer_detail_page_header_element_message;
    private readonly customer_firstname_textbox_message  = 'First Name';
    private readonly customer_lastname_textbox_message   = 'Last Name';
    private readonly customer_postalcode_textbox_message = 'Zip/Postal Code';
    private readonly continue_button_message             = 'Continue';
    private readonly cancel_button_message               = 'Cancel';

    private readonly page: Page;
    private readonly customer_firstname_textbox: Locator;
    private readonly customer_lastname_textbox: Locator;
    private readonly customer_postalcode_textbox: Locator;
    private readonly continue_button: Locator;
    private readonly cancel_button: Locator;

    private product_item_panel: ProductItemPanel;

    constructor(page: Page) {
        this.page = page;
        this.customer_firstname_textbox = page.locator('#first-name');
        this.customer_lastname_textbox = page.locator('#last-name');
        this.customer_postalcode_textbox = page.locator('#postal-code');
        this.continue_button = page.locator('#continue');
        this.cancel_button = page.locator('#cancel');
        this.product_item_panel = new ProductItemPanel(page);
    }

    public async verifyPageLoaded() {
        await this.verifyPageHeader();
        await this.verifyNoProductOrCartList();
        await this.verifyContinueButton();
        await this.verifyCancelButton();
    }

    public async verifyPageHeader() {
        const page_header_element = this.product_item_panel.getHeaderElement();
        await expect(page_header_element).toBeVisible();
        await expect(page_header_element).toHaveText(this.header_element_message);
    }

    public async verifyNoProductOrCartList() {
        await this.product_item_panel.verifyPanelLoaded(this.header_element_message);
    }

    public async verifyFirstNameTextbox() {
        await expect(this.customer_firstname_textbox).toBeEnabled();
        await expect(this.customer_firstname_textbox).toHaveAttribute(Constants.attribute_placeholder_message, this.customer_firstname_textbox_message);
    }

    public async verifyLastNameTextbox() {
        await expect(this.customer_lastname_textbox).toBeEnabled();
        await expect(this.customer_lastname_textbox).toHaveAttribute(Constants.attribute_placeholder_message, this.customer_lastname_textbox_message);
    }

    public async verifyPostalCodeTextbox() {
        await expect(this.customer_postalcode_textbox).toBeEnabled();
        await expect(this.customer_postalcode_textbox).toHaveAttribute(Constants.attribute_placeholder_message, this.customer_postalcode_textbox_message);
    }

    public async verifyContinueButton() {
        await expect(this.continue_button).toBeEnabled();
        await expect(this.continue_button).toHaveAttribute(Constants.attribute_value_message, this.continue_button_message);
    }

    public async verifyCancelButton() {
        await expect(this.cancel_button).toBeEnabled();
        await expect(this.cancel_button).toHaveText(this.cancel_button_message);
    }

    public async enterFirstName(firstname: string) {
        await this.verifyFirstNameTextbox();
        await this.customer_firstname_textbox.fill(firstname);
    }

    public async enterLastName(lastname: string) {
        await this.verifyLastNameTextbox();
        await this.customer_lastname_textbox.fill(lastname);
    }

    public async enterPostalCode(postalcode: string) {
        await this.verifyPostalCodeTextbox();
        await this.customer_postalcode_textbox.fill(postalcode);
    }

    public async clickContinueButton() {
        await this.verifyContinueButton();
        await this.continue_button.click();
    }

    public async clickCancelButton() {
        await this.verifyCancelButton();
        await this.cancel_button.click();
    }
}