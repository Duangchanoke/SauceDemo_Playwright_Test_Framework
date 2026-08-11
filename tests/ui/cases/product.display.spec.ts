import ProductData from '../../../data/products.json';
import { test } from '../../../fixtures/application';
import { Constants } from '../../../models/constants';
import { ProductListOrder } from '../../../libraries/product-list-sorting';
import { UserVariables } from '../variables/user-variables';

const original_product_list = ProductData.product_list;

test('tc-product-list-display-001: Display Product List by Name (A to Z)', async ({ uiFunctions }) => {
    let sorted_product_list = ProductListOrder.sortProductList(original_product_list, Constants.product_list_sorting_by_name, Constants.product_list_sorting_order_ascending)
    
    await uiFunctions.navigateToWebsite();
    await uiFunctions.successfullyLogIn(UserVariables.valid_standard_username, UserVariables.valid_standard_password);
    await uiFunctions.selectProductSortingOption(Constants.product_list_sorting_by_name, Constants.product_list_sorting_order_ascending);
    await uiFunctions.verifyProductSortingDisplay(sorted_product_list);
    await uiFunctions.successfullyLogOut();
});

test('tc-product-list-display-002: Display Product List by Name (Z to A)', async ({ uiFunctions }) => {
    let sorted_product_list = ProductListOrder.sortProductList(original_product_list, Constants.product_list_sorting_by_name, Constants.product_list_sorting_order_descending)
    
    await uiFunctions.navigateToWebsite();
    await uiFunctions.successfullyLogIn(UserVariables.valid_standard_username, UserVariables.valid_standard_password);
    await uiFunctions.selectProductSortingOption(Constants.product_list_sorting_by_name, Constants.product_list_sorting_order_descending);
    await uiFunctions.verifyProductSortingDisplay(sorted_product_list);
    await uiFunctions.successfullyLogOut();
});

test('tc-product-list-display-003: Display Product List by Price (low to high)', async ({ uiFunctions }) => {
    let sorted_product_list = ProductListOrder.sortProductList(original_product_list, Constants.product_list_sorting_by_price, Constants.product_list_sorting_order_ascending)
    
    await uiFunctions.navigateToWebsite();
    await uiFunctions.successfullyLogIn(UserVariables.valid_standard_username, UserVariables.valid_standard_password);
    await uiFunctions.selectProductSortingOption(Constants.product_list_sorting_by_price, Constants.product_list_sorting_order_ascending);
    await uiFunctions.verifyProductSortingDisplay(sorted_product_list);
    await uiFunctions.successfullyLogOut();
});

test('tc-product-list-display-004: Display Product List by Price (high to low)', async ({ uiFunctions }) => {
    let sorted_product_list = ProductListOrder.sortProductList(original_product_list, Constants.product_list_sorting_by_price, Constants.product_list_sorting_order_descending)
    
    await uiFunctions.navigateToWebsite();
    await uiFunctions.successfullyLogIn(UserVariables.valid_standard_username, UserVariables.valid_standard_password);
    await uiFunctions.selectProductSortingOption(Constants.product_list_sorting_by_price, Constants.product_list_sorting_order_descending);
    await uiFunctions.verifyProductSortingDisplay(sorted_product_list);
    await uiFunctions.successfullyLogOut();
});