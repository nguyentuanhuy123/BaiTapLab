import { db } from './database';

export const seedProducts = () => {
  const result = db.getAllSync('SELECT * FROM products');
  if (result.length === 0) {
    db.runSync(`
      INSERT INTO products (name, price, stock)
      VALUES
        ('Áo thun', 120000, 10),
        ('Quần jean', 350000, 5),
        ('Giày sneaker', 700000, 8);
    `);
  }
};
