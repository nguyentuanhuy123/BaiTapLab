
import { getDb } from "./db";
import type { Product } from "../models/types";

export async function listProducts():Promise<Product[]> {
    const db=await getDb();
    return db.getAllAsync<Product>(`select * from products order by id DESC;`);
}
export async function addProduct(p: Omit<Product,"id"|"create_at">) {
    const db=await getDb();
    await db.runAsync(
        `insert into products(name,price,unit) values(?,?,?)`,
        [p.name.trim(), p.price, p.unit??null]
    )
}
export async function updateProduct(id: number, p:Product) {
    const db=await getDb();
    await db.runAsync(
        `update products set name=?, price=?, unit=? where id=?`,
        [p.name, p.price, p.unit??null,id]
    )
}
export async function deleteProduct(id: number) {
    const db=await getDb();
    await db.runAsync(
        `delete from products where id=?`,
        [id]
    )
}