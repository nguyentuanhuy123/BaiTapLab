import { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, Alert, Pressable } from "react-native";
import { addToCart } from "@/src/db/cart.repo";
import { listProducts, addProduct, deleteProduct } from "@/src/db/product.repo";
import type { Product } from "@/src/models/types";
import { useRouter } from "expo-router";

export default function ListProduct() {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [unit, setUnit] = useState("");

    const refresh = async () => {
        const rows = await listProducts();
        setProducts(rows);
    };

    useEffect(() => {
        refresh();
    }, []);

    const handleAddProduct = async () => {
        try {
        if (!name.trim() || !price) throw new Error("Nhập đầy đủ thông tin");
        await addProduct({
            name: name.trim(),
            price: parseFloat(price),
            unit: unit.trim() || null,
        });
        Alert.alert("✅", "Đã thêm sản phẩm mới");
        setName("");
        setPrice("");
        setUnit("");
        refresh();
        } catch (err: any) {
        Alert.alert("Lỗi", err.message);
        }
    };

    const handleDelete = async (id: number) => {
        try {
        await deleteProduct(id);
        Alert.alert("🗑️", "Đã xóa sản phẩm");
        refresh();
        } catch (err: any) {
        Alert.alert("Lỗi", err.message);
        }
    };

    const handleAddToCart = async (id: number) => {
        try {
        await addToCart(id, 1);
        Alert.alert("🛒", "Đã thêm vào giỏ hàng!");
        } catch (err: any) {
        Alert.alert("Lỗi", err.message);
        }
    };
    const renderProductItem = ({ item }: { item: Product }) => (
        <View
        style={{
            borderWidth: 1,
            borderRadius: 10,
            padding: 12,
            marginBottom: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        }}
        >
        <View>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item.name}</Text>
            <Text>Giá: {item.price.toLocaleString()} đ</Text>
            <Text>Đơn vị: {item.unit ?? "-"}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 10 }}>
            <Pressable
            onPress={() => handleAddToCart(item.id!)}
            style={({ pressed }) => ({
                backgroundColor: pressed ? "#4caf50cc" : "#4caf50",
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderRadius: 6,
            })}
            >
            <Text style={{ color: "white", fontWeight: "600" }}>🛒</Text>
            </Pressable>
            <Pressable
            onPress={() => handleDelete(item.id!)}
            style={({ pressed }) => ({
                backgroundColor: pressed ? "#e53935cc" : "#e53935",
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderRadius: 6,
            })}
            >
            <Text style={{ color: "white", fontWeight: "600" }}>❌</Text>
            </Pressable>
        </View>
        </View>
    );

    return (
        <View style={{ flex: 1, padding: 20 }}>
            {/* Nút chuyển sang giỏ hàng */}
        <Pressable
            onPress={() => router.push("/cart")}
            style={({ pressed }) => ({
            backgroundColor: pressed ? "#ff9800cc" : "#ff9800",
            padding: 10,
            borderRadius: 8,
            alignSelf: "flex-end",
            marginBottom: 10,
            })}
        >
            <Text style={{ color: "white", fontWeight: "bold" }}>🛍️ Xem giỏ hàng</Text>
        </Pressable>

        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
            Thêm sản phẩm mới
        </Text>

        <TextInput
            placeholder="Tên sản phẩm"
            value={name}
            onChangeText={setName}
            style={{
            borderWidth: 1,
            padding: 8,
            borderRadius: 6,
            marginBottom: 5,
            }}
        />
        <TextInput
            placeholder="Giá"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
            style={{
            borderWidth: 1,
            padding: 8,
            borderRadius: 6,
            marginBottom: 5,
            }}
        />
        <TextInput
            placeholder="Đơn vị (VD: chiếc, hộp)"
            value={unit}
            onChangeText={setUnit}
            style={{
            borderWidth: 1,
            padding: 8,
            borderRadius: 6,
            marginBottom: 10,
            }}
        />

        <Pressable
            onPress={handleAddProduct}
            style={({ pressed }) => ({
            backgroundColor: pressed ? "#1976d2cc" : "#1976d2",
            padding: 12,
            borderRadius: 8,
            alignItems: "center",
            marginBottom: 15,
            })}
        >
            <Text style={{ color: "white", fontWeight: "bold" }}>➕ Thêm sản phẩm</Text>
        </Pressable>

        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
            Danh sách sản phẩm
        </Text>

        <FlatList
            data={products}
            keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
            renderItem={renderProductItem}
        />
        </View>
    );
}
