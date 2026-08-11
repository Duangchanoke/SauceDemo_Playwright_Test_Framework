import { Locator, Page, expect } from '@playwright/test';
import { ProductItemPanel } from '../components/product-item-panel';
import { Product } from '../../../../models/product';
import { Constants } from '../../../../models/constants';

export class ProductListPage {
    private readonly header_element_message             = Constants.product_list_page_header_element_message;
    private readonly product_name_sorting_asc_message   = 'Name (A to Z)';
    private readonly product_name_sorting_desc_message  = 'Name (Z to A)';
    private readonly product_price_sorting_asc_message  = 'Price (low to high)';
    private readonly product_price_sorting_desc_message = 'Price (high to low)';
    private readonly product_name_sorting_asc_locator   = 'az';
    private readonly product_name_sorting_desc_locator  = 'za';
    private readonly product_price_sorting_asc_locator  = 'lohi';
    private readonly product_price_sorting_desc_locator = 'hilo';

    private readonly page: Page;
    private readonly product_sorting_order_dropdown: Locator;

    private product_item_panel: ProductItemPanel;
    
    constructor(page: Page) {
        this.page = page;
        this.product_sorting_order_dropdown = page.locator('[data-test="product-sort-container"]');
        this.product_item_panel = new ProductItemPanel(page);
    }

    public async verifyPageLoaded() {
        await this.verifyPageHeader();
        await this.verifyProductList();
    }

    public async verifyPageHeader() {
        const page_header_element = this.product_item_panel.getHeaderElement();
        await expect(page_header_element).toBeVisible();
        await expect(page_header_element).toHaveText(this.header_element_message);
    }

    public async verifyProductList() {
        await this.product_item_panel.verifyPanelLoaded(this.header_element_message);
    }

    public async verifyProductSortingDropdown() {
        await expect(this.product_sorting_order_dropdown).toBeEnabled();        
    }

    public async verifyProductListWithDetails(selected_product_list: Array<Product>) {
        await this.product_item_panel.verifyProductTableBody(selected_product_list, false);
    }

    public async selectProductSortingByAndOrder(sorting_value: string, sorting_order: string) {
        await this.verifyProductSortingDropdown();
        if (sorting_value === Constants.product_list_sorting_by_name) {
            if (sorting_order === Constants.product_list_sorting_order_ascending) {
                await this.product_sorting_order_dropdown.selectOption({ label: this.product_name_sorting_asc_message });
                await expect(this.product_sorting_order_dropdown).toHaveValue(this.product_name_sorting_asc_locator);
            }
            if (sorting_order === Constants.product_list_sorting_order_descending) {
                await this.product_sorting_order_dropdown.selectOption({ label: this.product_name_sorting_desc_message });
                await expect(this.product_sorting_order_dropdown).toHaveValue(this.product_name_sorting_desc_locator);
            }
        } else if (sorting_value === Constants.product_list_sorting_by_price) {
            if (sorting_order === Constants.product_list_sorting_order_ascending) {
                await this.product_sorting_order_dropdown.selectOption({ label: this.product_price_sorting_asc_message });
                await expect(this.product_sorting_order_dropdown).toHaveValue(this.product_price_sorting_asc_locator);
            }
            if (sorting_order === Constants.product_list_sorting_order_descending) {
                await this.product_sorting_order_dropdown.selectOption({ label: this.product_price_sorting_desc_message });
                await expect(this.product_sorting_order_dropdown).toHaveValue(this.product_price_sorting_desc_locator);
            }
        } else {
            throw new Error("The selected sorting value (sortBy) is invalid");
        }
    }

    public async selectProductsFromList(sorted_product_list: Array<Product>, selected_product_numbers: Array<number>) {
        await this.product_item_panel.selectProductItemsToOrFromCart(sorted_product_list, selected_product_numbers, Constants.add_to_cart_element_message);
    }

    public async unselectProductsFromList(sorted_product_list: Array<Product>, selected_product_numbers: Array<number>) {
        await this.product_item_panel.selectProductItemsToOrFromCart(sorted_product_list, selected_product_numbers, Constants.remove_from_cart_element_message);
    }
}