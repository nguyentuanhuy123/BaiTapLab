import { db } from "./database";
import { getInvoiceItems } from "./cart.repo";

export const checkout = () => {
    const cart = getInvoiceItems();

    if (cart.length === 0) {
        throw new Error("Giỏ hàng trống!");
    }

    // Tổng tiền đơn hàng
    const total = cart.reduce((acc, it) => acc + it.price * it.qty, 0);
    const date = new Date().toISOString();

    // Tạo đơn hàng
    db.runSync(`INSERT INTO orders (created_at, total) VALUES (?, ?)`, [date, total]);

    const order = db.getFirstSync(`SELECT last_insert_rowid() AS id`) as { id: number };
    const orderId = order.id;


    // Lưu từng sản phẩm vào order_items
    for (const item of cart) {
        db.runSync(
        `INSERT INTO order_items (order_id, product_id, qty, price)
        VALUES (?, ?, ?, ?)`,
        [orderId, item.product_id, item.qty, item.price]
        );

        // Trừ tồn kho
        db.runSync(
        `UPDATE products SET stock = stock - ? WHERE product_id = ?`,
        [item.qty, item.product_id]
        );
    }

    // Xóa giỏ hàng
    db.runSync(`DELETE FROM cart_items`);

    return { orderId, total };
};
