import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { getCartItems, updateCartQty, deleteCartItem, CartDisplay } from "../src/db/cart.repo";

export default function CartScreen() {
  const router = useRouter();
  const [cart, setCart] = useState<CartDisplay[]>([]);

  const loadCart = () => setCart(getCartItems());

  useEffect(() => {
    loadCart();
  }, []);

  const handleUpdateQty = (id: number, delta: number) => {
    updateCartQty(id, delta);
    loadCart();
  };

  const handleDeleteItem = (id: number) => {
    deleteCartItem(id);
    loadCart();
  };

  const renderItem = ({ item }: { item: CartDisplay }) => {
    const isMax = item.qty >= item.stock;
    const isMin= item.qty <= 1;
    return(
    
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>
        {item.price.toLocaleString()} đ x {item.qty}
      </Text>
      <View style={styles.actionRow}>
        <Pressable
            onPress={() => !isMax && handleUpdateQty(item.id, 1)}
            style={[
              styles.btn,
              isMax && styles.btnDisabled,
            ]}
            disabled={isMax}
          >
          <Text style={styles.btnText}>+</Text>
        </Pressable>
        <Pressable
            onPress={() => !isMin && handleUpdateQty(item.id, -1)}
            style={[
              styles.btn,
              isMin && styles.btnDisabled,
            ]}
            disabled={isMax}
          >
          <Text style={styles.btnText}>-</Text>
        </Pressable>
        <Pressable onPress={() => handleDeleteItem(item.id)} style={styles.deleteBtn}>
          <Text style={styles.btnText}>🗑 Xóa</Text>
        </Pressable>
      </View>
    </View>
  );}

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text>Giỏ hàng trống</Text>}
      />
      <Pressable onPress={() => router.push("/invoice")} style={styles.checkoutBtn}>
        <Text style={styles.checkoutText}>Xem hoá đơn</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 10,
  },
  itemName: { fontWeight: "bold", fontSize: 16 },
  itemPrice: { marginVertical: 4 },
  actionRow: { flexDirection: "row", gap: 8 },
  btn: { backgroundColor: "#0a84ff", padding: 8, borderRadius: 6 },
  deleteBtn: { backgroundColor: "#ff3b30", padding: 8, borderRadius: 6 },
  btnText: { color: "#fff", fontWeight: "bold" },
  checkoutBtn: {
    backgroundColor: "#1976D2",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 16,
  },
  checkoutText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  btnDisabled: {
    backgroundColor: "#ccc",
  },
});
