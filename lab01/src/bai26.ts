interface Product {
    name: string;
    price: number;
    quantity: number;
}
class Order{
    products:Product[]
    constructor(products:Product[]){
        this.products=products;
    }
    calculateTotal(): number {
        return this.products.reduce((total, p) => total + p.price * p.quantity, 0);
    }
}