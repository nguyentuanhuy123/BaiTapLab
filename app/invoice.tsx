import { View, Text, FlatList ,StyleSheet} from 'react-native';
import { useEffect, useState } from 'react';
import { db } from '../src/db/database';

interface InvoiceItem {
  name: string;
  price: number;
  quantity: number;
}

export default function InvoiceScreen() {
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const result = db.getAllSync(`
      SELECT products.name, products.price, cart.quantity
      FROM cart
      JOIN products ON cart.product_id = products.id
    `) as InvoiceItem[];

    setItems(result);

    const sum = result.reduce((acc, it) => acc + it.price * it.quantity, 0);
    setTotal(sum);
  }, []);

  const vat = total * 0.1;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hoá đơn mua hàng</Text>
      <Text style={styles.date}>Ngày: {new Date().toLocaleString()}</Text>
  
      <FlatList
        data={items}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => (
          <Text style={styles.itemText}>
            {item.name} x {item.quantity} = {item.price * item.quantity} đ
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
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  date: {
    marginBottom: 8,
  },
  itemText: {
    marginVertical: 4,
    fontSize: 16,
  },
  summary: {
    marginTop: 16,
  },
  summaryText: {
    fontSize: 16,
  },
  totalText: {
    fontWeight: 'bold',
    marginTop: 4,
    fontSize: 16,
  },
});
