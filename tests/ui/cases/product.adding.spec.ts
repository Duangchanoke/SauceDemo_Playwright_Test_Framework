import ProductData from '../../../data/products.json';
import { test } from '../../../fixtures/application';
import { Product } from '../../../models/product';
import { ProductCartList } from '../../../utilities/create-cart-list';
import { UserVariables } from '../variables/user-variables';

const original_product_data = ProductData.product_list;

test('tc-adding-product-0001: Verify Adding 0 Product(s) to Cart (Product Numbers: [])', async ({ uiFunctions }) => {
    let selected_product_numbers: Array<number> = [];
    let selected_product_data: Array<Product> = ProductCartList.createCartList(original_product_data, selected_product_numbers);
    await uiFunctions.navigateToWebsite();
    await uiFunctions.successfullyLogIn(UserVariables.valid_standard_username, UserVariables.valid_standard_password);
    await uiFunctions.verifyProductSortingDisplay(original_product_data);
    await uiFunctions.selectProductsFromListToCart(original_product_data, selected_product_numbers);
    await uiFunctions.verifyCartListingDisplay(selected_product_data, selected_product_numbers.length);
    await uiFunctions.successfullyLogOut();
});

test('tc-adding-product-0002: Verify Adding 1 Product(s) to Cart #1 (Product Numbers: [4])', async ({ uiFunctions }) => {
    let selected_product_numbers: Array<number> = [4];
    let selected_product_data: Array<Product> = ProductCartList.createCartList(original_product_data, selected_product_numbers);
    await uiFunctions.navigateToWebsite();
    await uiFunctions.successfullyLogIn(UserVariables.valid_standard_username, UserVariables.valid_standard_password);
    await uiFunctions.verifyProductSortingDisplay(original_product_data);
    await uiFunctions.selectProductsFromListToCart(original_product_data, selected_product_numbers);
    await uiFunctions.verifyCartListingDisplay(selected_product_data, selected_product_numbers.length);
    await uiFunctions.successfullyLogOut();
});

test('tc-adding-product-0003: Verify Adding 1 Product(s) to Cart #2 (Product Numbers: [5])', async ({ uiFunctions }) => {
    let selected_product_numbers: Array<number> = [5];
    let selected_product_data: Array<Product> = ProductCartList.createCartList(original_product_data, selected_product_numbers);
    await uiFunctions.navigateToWebsite();
    await uiFunctions.successfullyLogIn(UserVariables.valid_standard_username, UserVariables.valid_standard_password);
    await uiFunctions.verifyProductSortingDisplay(original_product_data);
    await uiFunctions.selectProductsFromListToCart(original_product_data, selected_product_numbers);
    await uiFunctions.verifyCartListingDisplay(selected_product_data, selected_product_numbers.length);
    await uiFunctions.successfullyLogOut();
});

test('tc-adding-product-0004: Verify Adding 2 Product(s) to Cart (Product Numbers: [1, 3])', async ({ uiFunctions }) => {
    let selected_product_numbers: Array<number> = [1, 3];
    let selected_product_data: Array<Product> = ProductCartList.createCartList(original_product_data, selected_product_numbers);
    await uiFunctions.navigateToWebsite();
    await uiFunctions.successfullyLogIn(UserVariables.valid_standard_username, UserVariables.valid_standard_password);
    await uiFunctions.verifyProductSortingDisplay(original_product_data);
    await uiFunctions.selectProductsFromListToCart(original_product_data, selected_product_numbers);
    await uiFunctions.verifyCartListingDisplay(selected_product_data, selected_product_numbers.length);
    await uiFunctions.successfullyLogOut();
});