import { View, Text, Button, FlatList ,Pressable,ListRenderItemInfo} from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { db } from '../src/db/database';
type CartItem = {
  id: number;
  name: string;
  price: number;
  stock: number;
};
type Props = {
  cart: CartItem[];
  updateQty: (id: number, delta: number) => void;
  deleteItem: (id: number) => void;
  router: { push: (path: string) => void };
};
export default function CartScreen() {
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);

  const loadCart = () => {
    const result = db.getAllSync(`
      SELECT cart.id, products.name, products.price, cart.quantity
      FROM cart
      JOIN products ON cart.product_id = products.id
    `);
    setCart(result);
  };

  useEffect(loadCart, []);

  const updateQty = (id: number, delta: number) => {
    db.runSync('UPDATE cart SET quantity = quantity + ? WHERE id = ?', [delta, id]);
    db.runSync('DELETE FROM cart WHERE quantity <= 0');
    loadCart();
  };

  const deleteItem = (id: number) => {
    db.runSync('DELETE FROM cart WHERE id = ?', [id]);
    loadCart();
  };
  const renderItem = ({ item }: ListRenderItemInfo<CartItem>) => (
    <View style={{ marginBottom: 12 }}>
      <Text>{item.name}</Text>
      <Text>{item.price} đ x {item.stock}</Text>

      <Pressable
        onPress={() => updateQty(item.id, 1)}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? '#ddd' : '#0a84ff',
            padding: 8,
            marginVertical: 4,
            borderRadius: 4,
          },
        ]}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>+</Text>
      </Pressable>

      <Pressable
        onPress={() => updateQty(item.id, -1)}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? '#ddd' : '#0a84ff',
            padding: 8,
            marginVertical: 4,
            borderRadius: 4,
          },
        ]}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>-</Text>
      </Pressable>

      <Pressable
        onPress={() => deleteItem(item.id)}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? '#ddd' : '#ff3b30',
            padding: 8,
            marginVertical: 4,
            borderRadius: 4,
          },
        ]}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Xóa</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={cart}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
  
      <Pressable
        onPress={() => router.push('/invoice')}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? '#ddd' : '#34c759',
            padding: 12,
            borderRadius: 6,
            marginTop: 16,
          },
        ]}
      >
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
          Xem hoá đơn
        </Text>
      </Pressable>
    </View>
  );
}
