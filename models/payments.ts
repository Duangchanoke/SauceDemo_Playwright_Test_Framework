export class Payments {
    public readonly total_amount: string;
    public readonly tax_amount: string;
    public readonly net_amount: string;
    public readonly amount_currency: string;

    constructor(total_amount: string, tax_amount: string, net_amount: string) {
        this.total_amount = total_amount;
        this.tax_amount = tax_amount;
        this.net_amount = net_amount;
        this.amount_currency = '$';
    }
}