import { db } from './database';

export const seedProducts = () => {
  const result = db.getAllSync('SELECT * FROM products');

  if (result.length === 0) {
    db.runSync(`
      INSERT INTO products (product_id, name, price, stock)
      VALUES
        ('p1', 'Áo thun', 120000, 10),
        ('p2', 'Quần jean', 350000, 5),
        ('p3', 'Giày sneaker', 700000, 8);
    `);
    console.log("🌱 Products seeded successfully");
  } else {
    console.log("✅ Products already exist");
  }
};
