import { View, Text, FlatList, Alert, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { listCart, clearCart, computeInvoice } from "@/src/db/cart.repo";
import type { CartItem } from "@/src/model/types";

export default function CartScreen() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  const loadCart = async () => {
    const items = await listCart();
    setCart(items);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleCheckout = async () => {
    if (cart.length === 0) return Alert.alert("Giỏ hàng trống!");
    setLoading(true);
    try {
      const invoice = await computeInvoice();
      Alert.alert(
        "🧾 Hóa đơn tạm tính",
        `Tổng cộng: ${invoice.total.toLocaleString()} ₫`
      );
      await clearCart();
      await loadCart();
    } catch (err: any) {
      Alert.alert("Lỗi", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = async () => {
    await clearCart();
    await loadCart();
  };

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View
      style={{
        padding: 10,
        borderWidth: 1,
        borderRadius: 8,
        marginVertical: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text>
        {item.name} × {item.qty}
      </Text>
      <Text>{item.line_total.toLocaleString()} ₫</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        🛒 Giỏ hàng
      </Text>

      <FlatList
        data={cart}
        keyExtractor={(it) => it.id!.toString()}
        renderItem={renderCartItem}
        ListEmptyComponent={<Text>Giỏ hàng trống</Text>}
      />

      {cart.length > 0 && (
        <View style={{ marginTop: 15, gap: 10 }}>
          {/* Nút thanh toán */}
          <Pressable
            onPress={handleCheckout}
            disabled={loading}
            style={({ pressed }) => ({
              backgroundColor: pressed ? "#4caf50cc" : "#4caf50",
              opacity: loading ? 0.6 : 1,
              padding: 12,
              borderRadius: 8,
              alignItems: "center",
            })}
          >
            <Text
              style={{ color: "white", fontWeight: "bold", fontSize: 16 }}
            >
              🧾 Tính tổng
            </Text>
          </Pressable>
          <Pressable
            onPress={handleClear}
            style={({ pressed }) => ({
              backgroundColor: pressed ? "#e53935cc" : "#e53935",
              padding: 12,
              borderRadius: 8,
              alignItems: "center",
            })}
          >
            <Text
              style={{ color: "white", fontWeight: "bold", fontSize: 16 }}
            >
              🗑 Xóa giỏ hàng
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
