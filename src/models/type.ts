export interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
  }
  
  export interface CartItem {
    id: number;
    product_id: number;
    quantity: number;
  }
  