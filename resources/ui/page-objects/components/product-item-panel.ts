import { Locator, Page, expect } from '@playwright/test';
import { Product } from '../../../../models/product';
import { Constants } from '../../../../models/constants';

export class ProductItemPanel {
    private readonly table_header_quantity_element_message    = 'QTY';
    private readonly table_header_description_element_message = 'Description';
    private readonly add_to_cart_element_locator              = 'add-to-cart-';
    private readonly remove_from_cart_element_locator         = 'remove-';
    private readonly locator_id_prefix                        = '[id="';
    private readonly locator_id_suffix                        = '"]';

    private readonly page: Page;
    private readonly header_element: Locator;
    private readonly table_header_quantity_element: Locator;
    private readonly table_header_description_element: Locator;
    private readonly table_body_product_list_element: Locator;
    private readonly table_body_cart_list_element: Locator;
    private readonly product_item_quantity_element_locator: string;
    private readonly product_item_element_locator: string;
    private readonly product_name_element_locator: string;
    private readonly product_description_element_locator: string;
    private readonly product_price_element_locator: string;
    
    constructor(page: Page) {
        this.page = page;
        this.header_element = page.locator('[data-test="title"]');
        this.table_header_quantity_element = page.locator('[data-test="cart-quantity-label"]');
        this.table_header_description_element = page.locator('[data-test="cart-desc-label"]');
        this.table_body_product_list_element = page.locator('[data-test="inventory-list"]');
        this.table_body_cart_list_element = page.locator('[data-test="cart-list"]');
        this.product_item_quantity_element_locator = '[data-test="item-quantity"]';
        this.product_item_element_locator = '[data-test="inventory-item"]';
        this.product_name_element_locator = '[data-test="inventory-item-name"]';
        this.product_description_element_locator = '[data-test="inventory-item-desc"]';
        this.product_price_element_locator = '[data-test="inventory-item-price"]';
    }

    public getHeaderElement() {
        return this.header_element;
    }

    public async verifyPanelLoaded(header_element_message: string) {
        if (header_element_message === Constants.product_list_page_header_element_message) {
            await expect(this.table_body_product_list_element).toBeVisible();
        }
        else if (header_element_message === Constants.cart_page_header_element_message || header_element_message === Constants.checkout_page_header_element_message) {
            await expect(this.table_body_cart_list_element).toBeVisible();
        }
        else {
            await expect(this.table_body_product_list_element).not.toBeVisible();
            await expect(this.table_body_cart_list_element).not.toBeVisible();
        }
    }

    public async verifyProductTableHeader() {
        await this.verifyQTY();
        await this.verifyDescription();
    }

    public async verifyQTY() {
        await expect(this.table_header_quantity_element).toBeVisible();
        await expect(this.table_header_quantity_element).toHaveText(this.table_header_quantity_element_message);
    }

    public async verifyDescription() {
        await expect(this.table_header_description_element).toBeVisible();
        await expect(this.table_header_description_element).toHaveText(this.table_header_description_element_message);
    }

    public async verifyProductTableBody(selected_product_list: Array<Product>, verifiedQuantity: boolean) {
        let selected_product_count = selected_product_list.length;
        if (selected_product_count > 0) {
            for (let i = 0; i < selected_product_count; i++) {
                await this.scrollViewToProductItem(i);
                await this.verifyProductItemDetails(i, selected_product_list[i]);
                
                if (verifiedQuantity) {
                    await this.verifyProductItemQuantity(i);
                }
            }
        } else {
            await expect(this.page.locator(this.product_item_element_locator)).not.toBeVisible();
        }
    }

    public async verifyProductItemQuantity(selected_product_index: number) {
        const product_item_quantity_element = this.page.locator(this.product_item_quantity_element_locator).nth(selected_product_index);
        await expect(product_item_quantity_element).toBeVisible();
        await expect(product_item_quantity_element).toHaveText('1');
    }

    public async verifyProductItemDetails(selected_product_index: number, selected_product_item: Product)
    {
        await this.verifyProductName(this.page.locator(this.product_name_element_locator).nth(selected_product_index), selected_product_item.product_name);
        await this.verifyProductDescriptions(this.page.locator(this.product_description_element_locator).nth(selected_product_index), selected_product_item.product_descriptions);
        await this.verifyProductPrice(this.page.locator(this.product_price_element_locator).nth(selected_product_index), selected_product_item.product_price, selected_product_item.price_currency);
    }
    
    public async verifyProductName(selected_product_name_element: Locator, selected_product_name_message: string) {
        await expect(selected_product_name_element).toBeVisible();
        await expect(selected_product_name_element).toHaveText(selected_product_name_message);
    }

    public async verifyProductDescriptions(selected_product_description_element: Locator, selected_product_description_message: string) {
        await expect(selected_product_description_element).toBeVisible();
        await expect(selected_product_description_element).toHaveText(selected_product_description_message);
    }

    public async verifyProductPrice(selected_product_price_element: Locator, selected_product_price_message: number, selected_price_currency_message: string) {
        await expect(selected_product_price_element).toBeVisible();
        await expect(selected_product_price_element).toHaveText(selected_price_currency_message + selected_product_price_message.toString());
    }

    public async verifyAddToCartButtonForProductItem(selected_product_item_button: Locator) {
        await expect(selected_product_item_button).toBeEnabled();
        await expect(selected_product_item_button).toHaveText(Constants.add_to_cart_element_message);
    }

    public async verifyRemoveFromCartButtonForProductItem(selected_product_item_button: Locator) {
        await expect(selected_product_item_button).toBeEnabled();
        await expect(selected_product_item_button).toHaveText(Constants.remove_from_cart_element_message);  
    }
    
    public async scrollViewToProductItem(selected_product_index: number) {
        const selected_product_item_element = this.page.locator(this.product_item_element_locator).nth(selected_product_index);
        await expect(selected_product_item_element).toBeVisible();
        await selected_product_item_element.evaluate((element) => {
            element.scrollIntoView({ block: 'center' });
        });
    }

    public async selectProductItemsToOrFromCart(sorted_product_list: Array<Product>, selected_product_numbers: Array<number>, selected_user_action: string) {
        let selected_product_count = selected_product_numbers.length;
        for (let i = 0; i < selected_product_count; i++) {
            let selected_product_item_locator = sorted_product_list[(selected_product_numbers[i])-1].product_id;
            let selected_add_to_cart_button = this.page.locator(this.locator_id_prefix + this.add_to_cart_element_locator + selected_product_item_locator + this.locator_id_suffix);
            let selected_remove_from_cart_button = this.page.locator(this.locator_id_prefix + this.remove_from_cart_element_locator + selected_product_item_locator + this.locator_id_suffix);
            await this.scrollViewToProductItem((selected_product_numbers[i])-1);
            await this.addToOrRemoveFromCartForProductItem(selected_add_to_cart_button, selected_remove_from_cart_button, selected_user_action);
        }
    }

    public async addToOrRemoveFromCartForProductItem(selected_add_to_cart_button: Locator, selected_remove_from_cart_button: Locator, selected_user_action: string) {
        if (selected_user_action === Constants.add_to_cart_element_message) {
            await this.verifyAddToCartButtonForProductItem(selected_add_to_cart_button);
            await selected_add_to_cart_button.click();
            await this.verifyRemoveFromCartButtonForProductItem(selected_remove_from_cart_button);
        } 
        else if (selected_user_action === Constants.remove_from_cart_element_message) {
            await this.verifyRemoveFromCartButtonForProductItem(selected_remove_from_cart_button);
            await selected_remove_from_cart_button.click();
            await this.verifyAddToCartButtonForProductItem(selected_add_to_cart_button);
        }
        else {
            throw new Error("The selected user action is invalid");
        }
    }
}