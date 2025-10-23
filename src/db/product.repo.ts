import { db } from "./database";
import { Product } from "../models/type";

export const getAllProducts = (): Product[] => {
  const result = db.getAllSync<Product>("SELECT * FROM products");
  return result;
};

export const insertProduct = (product: Product) => {
  db.runSync(
    `INSERT INTO products (product_id, name, price, stock) VALUES (?, ?, ?, ?)`,
    [product.product_id, product.name, product.price, product.stock]
  );
};

export const updateStock = (product_id: string, stock: number) => {
  db.runSync(`UPDATE products SET stock = ? WHERE product_id = ?`, [
    stock,
    product_id,
  ]);
};

export const getAvailableProducts = (): Product[] => {
  return db.getAllSync<Product>("SELECT * FROM products WHERE stock > 0");
};

