export class Product {
    public readonly product_id: string;
    public readonly product_name: string;
    public readonly product_descriptions: string;
    public readonly product_price: number;
    public readonly price_currency: string;

    constructor(product_id: string, product_name: string, product_descriptions: string, product_price: number, price_currency: string) {
        this.product_id = product_id;
        this.product_name = product_name;
        this.product_descriptions = product_descriptions;
        this.product_price = product_price;
        this.price_currency = price_currency;
    }
}