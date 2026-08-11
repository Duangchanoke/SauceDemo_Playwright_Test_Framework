import { Product } from "../models/product";
import { Constants } from "../models/constants";

export class ProductListOrder {
    private static getSortingDirection(sortOrder: string): number {
        if (sortOrder === Constants.product_list_sorting_order_descending) {
            return -1;
        }
        return 1;
    }
    
    public static sortProductList(productList: Array<Product>, sortBy: string, sortOrder: string): Array<Product> {
        return productList.sort((a, b) => {
            const sortingDirection = ProductListOrder.getSortingDirection(sortOrder);
            if (sortBy === Constants.product_list_sorting_by_name) {
                if (a.product_name < b.product_name) return -1 * sortingDirection;
                if (a.product_name > b.product_name) return 1 * sortingDirection;
                return 0;
            }
            return (a.product_price - b.product_price) * sortingDirection;
        });
    }
}