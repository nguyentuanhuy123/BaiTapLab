import { getDb } from "./database";
import type { Product } from "../model/types";
export async function ListProducts(): Promise<Product[]> {
    const db=await getDb();
    return db.getAllAsync<Product>(`select * from products order by id desc`);
}
export async function addProduct(p: Omit<Product,"id"|"create_at">) {
    const db=await getDb();
    await db.runAsync(
        `insert into products(name, price, unit) values (?,?,?)`,
        [p.name.trim(),p.price,p.unit??null]
    );
}
export async function deleteProduct(id: number) {
    const db=await getDb();
    await db.runAsync(
        `delete from products where id=?`,
        [id]
    );
}
export async function updateProduct(p: Product, id:number) {
    const db=await getDb();
    await db.runAsync(
        `update products set name=?, price=?, unit=? where id=?`,
        [p.name.trim(),p.price,p.unit??null]
    );
}