import { db } from "./database";
import { CartItem } from "../models/type";
export type CartDisplay = CartItem & {
  name: string;
  price: number;
  stock:number;
};
export function getCartItems(): CartDisplay[] {
  const result = db.getAllSync(`
    SELECT 
      ci.id AS id,
      ci.product_id AS productId,
      ci.qty AS qty,
      p.name AS name,
      p.price AS price,
      p.stock AS stock
    FROM cart_items AS ci
    JOIN products AS p ON ci.product_id = p.product_id
  `);
  return result as CartDisplay[];
}

export const addToCart = (product_id: string) => {
  if (!product_id) return;
  db.runSync(
    `
    INSERT INTO cart_items (product_id, qty)
    VALUES (?, 1)
    ON CONFLICT(product_id)
    DO UPDATE SET qty = qty + 1
    `,
    [product_id]
  );
};

export const updateCartQty = (id: number, delta: number) => {
  db.runSync(`UPDATE cart_items SET qty = qty + ? WHERE id = ?`, [delta, id]);
  db.runSync(`DELETE FROM cart_items WHERE qty <= 0`);
};
export const deleteCartItem = (id: number) => {
  db.runSync(`DELETE FROM cart_items WHERE id = ?`, [id]);
};
export const getInvoiceItems = (): {
  product_id: string;
  name: string;
  price: number;
  qty: number;
}[] => {
  return db.getAllSync(`
    SELECT products.product_id, products.name, products.price, cart_items.qty
    FROM cart_items
    JOIN products ON cart_items.product_id = products.product_id
  `);
};
