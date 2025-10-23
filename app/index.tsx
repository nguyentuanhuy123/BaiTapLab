import { View, Text, FlatList, Pressable, StyleSheet, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { getAllProducts } from "../src/db/product.repo";
import { addToCart } from "../src/db/cart.repo";
import { Product } from "../src/models/type";

export default function ProductsScreen() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState("");

  const loadProducts = () => {
    const result = getAllProducts();
    setProducts(result);
  };


  useEffect(() => {
    loadProducts();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadProducts();
    setRefreshing(false);
  };

  const handleAddToCart = (product: Product) => {
    if (product.stock <= 0) {
      alert("Sản phẩm đã hết hàng!");
      return;
    }
    addToCart(product.product_id);
    onRefresh();
    alert("Đã thêm vào giỏ hàng");
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }: { item: Product }) => (
  <View style={styles.itemContainer}>
    <View style={styles.row}>
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price.toLocaleString()} đ</Text>
      </View>

      <Pressable
        onPress={() => handleAddToCart(item)}
        style={({ pressed }) => [
          styles.addButton,
          pressed && styles.addButtonPressed,
        ]}
      >
        <Text style={styles.addButtonText}>+</Text>
      </Pressable>
    </View>
  </View>
);


  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput
        style={styles.searchInput}
        placeholder="🔍 Tìm kiếm sản phẩm theo tên..."
        value={searchText}
        onChangeText={setSearchText}
        clearButtonMode="while-editing"
      />

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.product_id}
        renderItem={renderItem}
        onRefresh={onRefresh}
        refreshing={refreshing}
      />

      <Pressable
        onPress={() => router.push("/cart")}
        style={({ pressed }) => [
          styles.cartButton,
          pressed && styles.cartButtonPressed,
        ]}
      >
        <Text style={styles.cartButtonText}>Xem giỏ hàng</Text>
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  price: {
    marginTop: 4,
    color: "#555",
  },
  addButton: {
    backgroundColor: "#0a84ff",
    borderRadius: 50,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonPressed: {
    opacity: 0.7,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  cartButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 12,
  },
  cartButtonPressed: {
    backgroundColor: "#1976D2",
  },
  cartButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 42,
    marginBottom: 10,
  },
});
