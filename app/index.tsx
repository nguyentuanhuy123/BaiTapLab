import { View, Text, FlatList, Pressable, StyleSheet ,TextInput} from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { db } from '../src/db/database';

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
};

export default function ProductsScreen() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');

  const loadProducts = () => {
    const result = db.getAllSync('SELECT * FROM products') as Product[];
    const filtered = result.filter(product => product.stock > 0);
    setProducts(filtered);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadProducts();
    setRefreshing(false);
  };

  const addToCart = (id: number) => {
    const item = db.getFirstSync('SELECT * FROM cart WHERE product_id = ?', [id]);
    if (item) {
      db.runSync('UPDATE cart SET quantity = quantity + 1 WHERE product_id = ?', [id]);
    } else {
      db.runSync('INSERT INTO cart (product_id, quantity) VALUES (?, 1)', [id]);
    }
  };

  const renderItem = ({ item }: { item: Product }) => (
    <View style={{ marginBottom: 12 }}>
      <Text>{item.name}</Text>
      <Text>{item.price} đ</Text>
      <Pressable
        onPress={() => addToCart(item.id)}
        style={({ pressed }) => [
          styles.addButton,
          pressed && styles.addButtonPressed,
        ]}
      >
        <Text style={styles.addButtonText}>+</Text>
      </Pressable>
    </View>
  );
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm sản phẩm theo name"
        value={searchText}
        onChangeText={setSearchText}
        clearButtonMode="while-editing"
      />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        onRefresh={onRefresh}
        refreshing={refreshing}
      />
      <Pressable
        onPress={() => router.push('/cart')}
        style={({ pressed }) => [
          styles.cartButton,
          pressed && styles.cartButtonPressed,
        ]}
      >
        <Text style={styles.cartButtonText}>🛒 Xem giỏ hàng</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#2E86DE',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  addButtonPressed: {
    backgroundColor: '#1B4F72'
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  cartButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  cartButtonPressed: {
    backgroundColor: '#1976D2',
  },
  cartButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchInput: { 
    flex: 1, 
    borderWidth: 1, 
    borderColor: '#ddd', 
    borderRadius: 8, 
    paddingHorizontal: 12, 
    height: 42 
  },
});
