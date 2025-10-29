import { getDb } from "./db";
import type { ID, Order, OrderItem, CartItem } from "../models/types";
import { listCart, clearCart } from "./cart.repo";

// 🧾 Tạo đơn hàng mới từ danh sách sản phẩm
export async function createOrder(
  items: { product_id: number; qty: number; unit_price: number }[],
  note?: string | null
): Promise<number> {
  if (items.length === 0) throw new Error("No items to create order");

  const db = await getDb();
  await db.execAsync("BEGIN");

  try {
    // 1️⃣ Tạo đơn hàng trống, tạm thời price=0
    const res = await db.runAsync(
      `INSERT INTO orders(note, total, create_at) VALUES (?, 0, datetime('now'))`,
      [note ?? null]
    );
    // @ts-ignore
    const orderId = res.lastInsertRowId as number;

    // 2️⃣ Thêm các dòng chi tiết
    let total = 0;
    for (const item of items) {
      const line = item.qty * item.unit_price;
      total += line;
      await db.runAsync(
        `INSERT INTO order_items(order_id, product_id, qty, unit_price, line_total)
         VALUES (?, ?, ?, ?, ?)`,
        [orderId, item.product_id, item.qty, item.unit_price, line]
      );
    }

    // 3️⃣ Cập nhật lại tổng giá
    await db.runAsync(`UPDATE orders SET total=? WHERE id=?`, [total, orderId]);

    await db.execAsync("COMMIT");
    return orderId;
  } catch (err) {
    await db.execAsync("ROLLBACK");
    throw err;
  }
}

// 🛒 Thanh toán giỏ hàng → tạo đơn hàng mới
export async function checkoutFromCart(note?: string | null): Promise<number> {
  const cart: CartItem[] = await listCart();
  if (cart.length === 0) throw new Error("Cart is empty");

  const orderId = await createOrder(
    cart.map((c) => ({
      product_id: c.product_id,
      qty: c.qty,
      unit_price: c.unit_price,
    })),
    note
  );

  await clearCart();
  return orderId;
}

// 📋 Lấy danh sách đơn hàng
export async function listOrders(): Promise<Order[]> {
  const db = await getDb();
  return db.getAllAsync<Order>(
    `SELECT id, note, price, create_at FROM orders ORDER BY id DESC`
  );
}

// 📦 Lấy danh sách sản phẩm trong 1 đơn hàng
export async function getOrderItems(order_id: number): Promise<OrderItem[]> {
  const db = await getDb();
  return db.getAllAsync<OrderItem>(
    `SELECT id, order_id, product_id, qty, unit_price, line_total
     FROM order_items WHERE order_id=? ORDER BY id`,
    [order_id]
  );
}

// ❌ Xoá đơn hàng
export async function deleteOrder(order_id: number) {
  const db = await getDb();
  await db.runAsync(`DELETE FROM orders WHERE id=?`, [order_id]);
}

// 📊 Thống kê tổng số đơn và tổng tiền
export async function getOrderStats() {
  const db = await getDb();
  const row = await db.getFirstAsync<{ count: number; revenue: number }>(
    `SELECT COUNT(*) AS count, IFNULL(SUM(price),0) AS revenue FROM orders`
  );
  return { count: row?.count ?? 0, revenue: row?.revenue ?? 0 };
}
