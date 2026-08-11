import { Product } from "../models/product";
import { Payments } from "../models/payments";

const TWO_DECIMALS = 2;

export class PaymentCalculation { 
    private static roundPaymentAmountToDesignatedDecimals(paymentAmount: number): string {
        return paymentAmount.toFixed(TWO_DECIMALS);
    }

    private static calculateTotalProductPrice(productList: Array<Product>): string {
        const product_count = productList.length;
        let summation = 0.0;
        for (let i = 0; i < product_count; i++) {
            summation += productList[i].product_price;
        }
        const totalAmount = this.roundPaymentAmountToDesignatedDecimals(summation);
        return totalAmount;
    }

    private static calculateTaxFromTotalPrice(totalAmount: number): string {
        const taxAmount = (8 * totalAmount) / 100;
        return this.roundPaymentAmountToDesignatedDecimals(taxAmount);
    }

    private static calculateNetProductPrice(totalAmount: number, taxAmount: number): string {
        const netAmount = totalAmount + taxAmount;
        return this.roundPaymentAmountToDesignatedDecimals(netAmount);
    }

    public static calculatePaymentAmounts(productList: Array<Product>): Payments {
        const totalAmount = this.calculateTotalProductPrice(productList);
        const taxAmount   = this.calculateTaxFromTotalPrice(Number(totalAmount));
        const netAmount   = this.calculateNetProductPrice(Number(totalAmount), Number(taxAmount));
        return new Payments(totalAmount, taxAmount, netAmount);
    }
}