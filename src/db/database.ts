import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('shop.db');

export const initDB = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS products (
      product_id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      price REAL NOT NULL CHECK(price >= 0),
      stock INTEGER NOT NULL CHECK(stock >= 0)
    );
    CREATE TABLE IF NOT EXISTS cart_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id TEXT NOT NULL,
      qty INTEGER NOT NULL CHECK(qty > 0),
      UNIQUE(product_id),
      FOREIGN KEY(product_id) REFERENCES products(product_id)
    );
  `);
};
