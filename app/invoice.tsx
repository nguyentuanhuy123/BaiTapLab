import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  Pressable, 
  Alert 
} from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { getInvoiceItems } from "../src/db/cart.repo";
import { checkout } from "../src/db/order.repo";

interface InvoiceItem {
  product_id: string;
  name: string;
  price: number;
  qty: number;
}

export default function InvoiceScreen() {
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [total, setTotal] = useState<number>(0);

  const loadInvoice = () => {
    const result = getInvoiceItems();
    setItems(result);
    const sum = result.reduce((acc, it) => acc + it.price * it.qty, 0);
    setTotal(sum);
  };

  useEffect(() => {
    loadInvoice();
  }, []);

  const vat = total * 0.1;

  const handleCheckout = () => {
    try {
      const result = checkout();
      Alert.alert(
        "Thanh toán thành công",
        `Mã đơn hàng: ${result.orderId}\nTổng tiền: ${result.total.toLocaleString()} đ`,
        [
          {
            text: "OK",
            onPress: () => {
              setItems([]);
              setTotal(0);
              router.push("/");
            },
          },
        ]
      );
    } catch (err: any) {
      Alert.alert(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hoá đơn mua hàng</Text>
      <Text style={styles.date}>Ngày: {new Date().toLocaleString()}</Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.product_id}
        renderItem={({ item }) => (
          <Text style={styles.itemText}>
            {item.name} x {item.qty} = {(item.price * item.qty).toLocaleString()} đ
          </Text>
        )}
      />

      <View style={styles.summary}>
        <Text style={styles.summaryText}>Tổng: {total.toLocaleString()} đ</Text>
        <Text style={styles.summaryText}>VAT (10%): {vat.toLocaleString()} đ</Text>
        <Text style={styles.totalText}>
          Thành tiền: {(total + vat).toLocaleString()} đ
        </Text>
      </View>

      <Pressable
        onPress={handleCheckout}
        style={({ pressed }) => [
          styles.payButton,
          pressed && { opacity: 0.8 },
        ]}
      >
        <Text style={styles.payButtonText}>Thanh toán</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
     padding: 16 
  },
  title: { 
    fontSize: 18, 
    fontWeight: "bold", 
    marginBottom: 8 
  },
  date: { 
    marginBottom: 8, 
    color: "#555" 
  },
  itemText: { 
    marginVertical: 4, 
    fontSize: 16 
  },
  summary: {
    marginTop: 16,
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingTop: 8,
  },
  summaryText: { 
    fontSize: 16 
  },
  totalText: { 
    fontWeight: "bold", 
    marginTop: 4, 
    fontSize: 16 
  },
  payButton: {
    marginTop: 16,
    backgroundColor: "#1976D2",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  payButtonText: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "bold" },
});
