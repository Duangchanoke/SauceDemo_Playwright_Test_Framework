import ProductData from '../../../data/products.json';
import { test } from '../../../fixtures/application';
import { Payments } from '../../../models/payments';
import { Product } from '../../../models/product';
import { ProductCartList } from '../../../utilities/create-cart-list';
import { UserVariables } from '../variables/user-variables';

const original_product_data = ProductData.product_list;

test('tc-product-checkout-0001: Successfully Checkout 3 Product Item(s) (Product Numbers: [1, 3, 6]) and Create a Purchase Order #1', async ({ uiFunctions }) => {
    let selected_product_numbers: Array<number> = [1, 3, 6];
    let selected_product_data: Array<Product> = ProductCartList.createCartList(original_product_data, selected_product_numbers);
    
    let expected_payment_amounts: Payments = uiFunctions.getOrderPaymentDetails(selected_product_data);

    await uiFunctions.navigateToWebsite();
    await uiFunctions.successfullyLogIn(UserVariables.valid_standard_username, UserVariables.valid_standard_password);
    await uiFunctions.verifyProductSortingDisplay(original_product_data);
    await uiFunctions.selectProductsFromListToCart(original_product_data, selected_product_numbers);
    await uiFunctions.verifyCartListingDisplay(selected_product_data, selected_product_numbers.length);
    await uiFunctions.confirmCustomerDetailsForCheckout("Pom", "Purin", "67576");
    await uiFunctions.completeCheckoutWithCorrectOrderDetails(selected_product_data, expected_payment_amounts);
    await uiFunctions.successfullyLogOut();
});

test('tc-product-checkout-0002: Successfully Checkout 3 Product Item(s) (Product Numbers: [1, 4, 5]) and Create a Purchase Order #2', async ({ uiFunctions }) => {
    let selected_product_numbers: Array<number> = [1, 4, 5];
    let selected_product_data: Array<Product> = ProductCartList.createCartList(original_product_data, selected_product_numbers);
    
    let expected_payment_amounts: Payments = uiFunctions.getOrderPaymentDetails(selected_product_data);

    await uiFunctions.navigateToWebsite();
    await uiFunctions.successfullyLogIn(UserVariables.valid_standard_username, UserVariables.valid_standard_password);
    await uiFunctions.verifyProductSortingDisplay(original_product_data);
    await uiFunctions.selectProductsFromListToCart(original_product_data, selected_product_numbers);
    await uiFunctions.verifyCartListingDisplay(selected_product_data, selected_product_numbers.length);
    await uiFunctions.confirmCustomerDetailsForCheckout("Ben", "Jerry", "13595");
    await uiFunctions.completeCheckoutWithCorrectOrderDetails(selected_product_data, expected_payment_amounts);
    await uiFunctions.successfullyLogOut();
});

test('tc-product-checkout-0003: Successfully Checkout 4 Product Item(s) (Product Numbers: [2, 3, 5, 6]) and Create a Purchase Order #3', async ({ uiFunctions }) => {
    let selected_product_numbers: Array<number> = [2, 3, 5, 6];
    let selected_product_data: Array<Product> = ProductCartList.createCartList(original_product_data, selected_product_numbers);

    let expected_payment_amounts: Payments = uiFunctions.getOrderPaymentDetails(selected_product_data);

    await uiFunctions.navigateToWebsite();
    await uiFunctions.successfullyLogIn(UserVariables.valid_standard_username, UserVariables.valid_standard_password);
    await uiFunctions.verifyProductSortingDisplay(original_product_data);
    await uiFunctions.selectProductsFromListToCart(original_product_data, selected_product_numbers);
    await uiFunctions.verifyCartListingDisplay(selected_product_data, selected_product_numbers.length);
    await uiFunctions.confirmCustomerDetailsForCheckout("Wire", "Trainer", "48680");
    await uiFunctions.completeCheckoutWithCorrectOrderDetails(selected_product_data, expected_payment_amounts);
    await uiFunctions.successfullyLogOut();
});

test('tc-product-checkout-0004: Successfully Checkout 5 Product Item(s) (Product Numbers: [1, 2, 3, 4, 6]) and Create a Purchase Order #4', async ({ uiFunctions }) => {
    let selected_product_numbers: Array<number> = [1, 2, 3, 4, 6];
    let selected_product_data: Array<Product> = ProductCartList.createCartList(original_product_data, selected_product_numbers);

    let expected_payment_amounts: Payments = uiFunctions.getOrderPaymentDetails(selected_product_data);

    await uiFunctions.navigateToWebsite();
    await uiFunctions.successfullyLogIn(UserVariables.valid_standard_username, UserVariables.valid_standard_password);
    await uiFunctions.verifyProductSortingDisplay(original_product_data);
    await uiFunctions.selectProductsFromListToCart(original_product_data, selected_product_numbers);
    await uiFunctions.verifyCartListingDisplay(selected_product_data, selected_product_numbers.length);
    await uiFunctions.confirmCustomerDetailsForCheckout("Megan", "Drowner", "434 RF");
    await uiFunctions.completeCheckoutWithCorrectOrderDetails(selected_product_data, expected_payment_amounts);
    await uiFunctions.successfullyLogOut();
});

test('tc-product-checkout-0005: Successfully Checkout 6 Product Item(s) (Product Numbers: [1, 2, 3, 4, 5, 6]) and Create a Purchase Order #5', async ({ uiFunctions }) => {
    let selected_product_numbers: Array<number> = [1, 2, 3, 4, 5, 6];
    let selected_product_data: Array<Product> = ProductCartList.createCartList(original_product_data, selected_product_numbers);

    let expected_payment_amounts: Payments = uiFunctions.getOrderPaymentDetails(selected_product_data);

    await uiFunctions.navigateToWebsite();
    await uiFunctions.successfullyLogIn(UserVariables.valid_standard_username, UserVariables.valid_standard_password);
    await uiFunctions.verifyProductSortingDisplay(original_product_data);
    await uiFunctions.selectProductsFromListToCart(original_product_data, selected_product_numbers);
    await uiFunctions.verifyCartListingDisplay(selected_product_data, selected_product_numbers.length);
    await uiFunctions.confirmCustomerDetailsForCheckout("Tanapol", "Sawadee", "23253");
    await uiFunctions.completeCheckoutWithCorrectOrderDetails(selected_product_data, expected_payment_amounts);
    await uiFunctions.successfullyLogOut();
});