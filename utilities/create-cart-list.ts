import { Product } from "../models/product";

export class ProductCartList {
    public static createCartList(originalProductList: Array<Product>, selectedProductNumbers: Array<number>): Array<Product> {
        const product_count = selectedProductNumbers.length;
        let newProductList = new Array<Product>();
        for (let i=0; i<product_count; i++) {
            newProductList.push(originalProductList[selectedProductNumbers[i]-1]);
        }
        return newProductList;
    }
}