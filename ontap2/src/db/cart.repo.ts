import type { CartItem,ID,Invoice } from "../model/types";
import { getDb } from "./database";
export async function addToCart(product_id:ID,qty=1) {
    const db=await getDb();
    const p=await db.getFirstAsync<{name:string; price:number; unit:string|null}>(
        `select name, price, unit from products where id=?`,
        [product_id]
    )
    if(!p) throw new Error('Product not found');
    const existing= await db.getFirstAsync<{id:number; qty:number}>(
         `select id, qty from cart_items where product_id=?`,
        [product_id]
    )
    const unit_price=p.price;
    if(existing){
        const newQty=existing.qty+ qty;
        const newLine=newQty*unit_price;
        await db.runAsync(
            `update cart_items set qty=?, unit_price=?, line_total=? where id=?`,
            [newQty, unit_price,newLine, existing.id]
        )
        return existing.id as ID;
    }
    else{
        const line=qty* unit_price;
        const res=await db.runAsync(
            `INSERT INTO cart_items(product_id, name, unit, qty, unit_price, line_total)
            VALUES(?,?,?,?,?,?)`,
            [product_id, p.name, p.unit ?? null, qty, unit_price, line]
        )
        return res.lastInsertRowId as ID;
    }
}
export async function listCart(): Promise<CartItem[]> {
  const db = await getDb();
  return db.getAllAsync<CartItem>(`SELECT * FROM cart_items ORDER BY id DESC`);
}
export async function updateCartQty(row_id: ID, qty: number) {
  const db = await getDb();
  if (qty <= 0) return removeFromCart(row_id);

  const row = await db.getFirstAsync<CartItem>(
    `SELECT * FROM cart_items WHERE id=?`,
    [row_id]
  );
  if (!row) throw new Error("Cart row not found");

  const line = qty * row.unit_price;
  await db.runAsync(`UPDATE cart_items SET qty=?, line_total=? WHERE id=?`, [qty, line, row_id]);
}
export async function removeFromCart(row_id: ID) {
  const db = await getDb();
  await db.runAsync(`DELETE FROM cart_items WHERE id=?`, [row_id]);
}
export async function clearCart() {
  const db = await getDb();
  await db.runAsync(`DELETE FROM cart_items`);
}
export async function computeInvoice(): Promise<Invoice> {
  const items = await listCart();
  const subtotal = items.reduce((s, it) => s + it.line_total, 0);
  const discount = 0;
  const tax = 0;
  return { items, subtotal, discount, tax, total: subtotal - discount + tax };
}
