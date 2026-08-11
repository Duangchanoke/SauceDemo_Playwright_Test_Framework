import { Page } from '@playwright/test';
import { Product } from '../../models/product';
import { Payments } from '../../models/payments';
import { ProductListOrder } from '../../libraries/product-list-sorting';
import { PaymentCalculation } from '../../libraries/payment-calculation';
import { LogInPage } from "./page-objects/pages/login-page";
import { ProductListPage } from "./page-objects/pages/product-list-page";
import { CartPage } from './page-objects/pages/cart-page';
import { CustomerDetailPage } from './page-objects/pages/customer-detail-page';
import { CheckOutPage } from './page-objects/pages/checkout-page';
import { PurchaseSuccess } from './page-objects/pages/purchase-success';
import { SideMenuBar } from "./page-objects/components/side-menu-bar";
import { TopMenuBar } from "./page-objects/components/top-menu-bar";

export class UIFunctions {
    readonly logInPage: LogInPage;
    readonly productListPage: ProductListPage;
    readonly cartPage: CartPage;
    readonly customerDetailPage: CustomerDetailPage;
    readonly checkOutPage: CheckOutPage;
    readonly purchaseSuccess: PurchaseSuccess;

    readonly sideMenuBar: SideMenuBar;
    readonly topMenuBar: TopMenuBar;
    
    constructor(page: Page) {
        this.logInPage = new LogInPage(page);
        this.productListPage = new ProductListPage(page);
        this.cartPage = new CartPage(page);
        this.customerDetailPage = new CustomerDetailPage(page);
        this.checkOutPage = new CheckOutPage(page);
        this.purchaseSuccess = new PurchaseSuccess(page);
        this.sideMenuBar = new SideMenuBar(page);
        this.topMenuBar = new TopMenuBar(page);
    }
    
    public async navigateToWebsite() {
        await this.logInPage.navigateToLogInPage();
    }

    public async attemptToLogIn(username: string, password: string) {
        await this.logInPage.verifyPageLoaded();
        await this.logInPage.submitUserCredentials(username, password);
    }
    
    public async successfullyLogIn(username: string, password: string) {
        await this.attemptToLogIn(username, password);
        await this.productListPage.verifyPageLoaded();
    }

    public async failToLogIn(username: string, password: string, error_messages: string) {
        await this.attemptToLogIn(username, password);
        await this.logInPage.verifyPageLoaded();
        await this.logInPage.verifyErrorMessagesAlert(error_messages);
    }

    public async verifyProductSortingDisplay(sorted_product_list: Array<Product>) {
        await this.productListPage.verifyProductListWithDetails(sorted_product_list);
    }

    public async verifyCartListingDisplay(selected_product_list: Array<Product>, selected_product_count: number) {
        await this.topMenuBar.verifyShoppingCartBadge(selected_product_count);
        await this.topMenuBar.clickShoppingCartButton();
        await this.cartPage.verifyPageLoaded();
        await this.cartPage.verifyProductDetailsInCart(selected_product_list);
    }

    public async selectProductSortingOption(sorting_value: string, sorting_order: string) {
        await this.productListPage.selectProductSortingByAndOrder(sorting_value, sorting_order);
    }

    public async selectProductsFromListToCart(sorted_product_list: Array<Product>, selected_product_numbers: Array<number>) {
        await this.productListPage.selectProductsFromList(sorted_product_list, selected_product_numbers);
    }

    public async confirmCustomerDetailsForCheckout(customer_firstname: string, customer_lastname: string, customer_postalcode: string) {
        await this.cartPage.verifyPageLoaded();
        await this.cartPage.clickCheckoutButton();
        await this.customerDetailPage.verifyPageLoaded();
        await this.customerDetailPage.enterFirstName(customer_firstname);
        await this.customerDetailPage.enterLastName(customer_lastname);
        await this.customerDetailPage.enterPostalCode(customer_postalcode);
        await this.customerDetailPage.clickContinueButton();
    }

    public async completeCheckoutWithCorrectOrderDetails(selected_product_list: Array<Product>, payment_amounts: Payments) {
        await this.checkOutPage.verifyPageLoaded();
        await this.checkOutPage.verifyProductCheckoutDetails(selected_product_list);
        await this.checkOutPage.verifyOrderSummaryForCheckoutConfirmation(payment_amounts);
        await this.checkOutPage.clickFinishButton();
        await this.purchaseSuccess.verifyPageLoaded();
    }

    public async expandSideMenuBar() {
        await this.topMenuBar.clickBurgerMenuButton();
        await this.sideMenuBar.verifyBarLoaded();
    }

    public async successfullyLogOut() {
        await this.expandSideMenuBar();
        await this.sideMenuBar.clickLogOutButton();
        await this.logInPage.verifyPageLoaded();
    }

    public getSortedProductList(original_product_list: Array<Product>, sorting_value: string, sorting_order: string): Array<Product> {
        return ProductListOrder.sortProductList(original_product_list, sorting_value, sorting_order);
    }

    public getOrderPaymentDetails(selected_product_list: Array<Product>): Payments {
        return PaymentCalculation.calculatePaymentAmounts(selected_product_list);
    }
}