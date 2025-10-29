export type ID = number;
export interface Product{
    id?:number;
    name:string;
    price:number;
    unit?:string|null;
    creat_at?:string;
}
export interface Order{
    id?:number;
    note?: string|null;
    total:number;
    create_at:string;
}
export interface OrderItem{
    id?:number;
    order_id:number;
    product_id:number;
    qty:number;
    unit_price:number;
    line_total:number;

}
export interface CartItem{
    id?:number;
    product_id:number;
    name:string;
    unit?:string;
    qty:number;
    unit_price:number;
    line_total:number;
    add_at?:string;
}
export interface Invoice {
  items: CartItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
}
