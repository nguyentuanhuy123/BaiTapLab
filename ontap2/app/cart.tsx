import { View, Text,Alert,Pressable,TextInput, FlatList } from 'react-native'
import {useState,useEffect,useCallback} from 'react'
import { useRouter } from 'expo-router'
import { Product } from '@/src/model/types';
import {addProduct, deleteProduct, ListProducts} from '@/src/db/product.repo';
import { addToCart } from '@/src/db/cart.repo';

export default function cart() {
    const route=useRouter();
    const [products,setProducts]=useState<Product[]>([]);
    const [name,setName]=useState('');
    const [price,setPrice]=useState('');
    const [unit,setUnit]=useState('');
    const refresh=async()=>{
        const rows=await ListProducts();
        setProducts(rows);
    };
    useEffect(()=>{
        refresh()
    },[]);
    const handleAddProduct=async()=>{
        try{
            if(!name.trim()|| !price) throw new Error ("Nhap day du thong tin");
            await addProduct({
                name:name.trim(),
                price: parseFloat(price),
                unit: unit.trim()|| null,
            });
            Alert.alert("Da them san pham moi");
            setName("");
            setPrice("")
            setUnit("")
            refresh();
        }catch(err:any){
            Alert.alert("Loi",err.message)
        }
    }
    const handleDelete = async (id: number) => {
        try {
            await deleteProduct(id);
            Alert.alert("Đã xóa sản phẩm");
            refresh();
        } catch (err: any) {
        Alert.alert("Lỗi", err.message);
        }
    };

    const handleAddToCart=async (id:number)=>{
        try{
            await addToCart(id,1);
            Alert.alert("Da them vao gio hang");
        }catch(err:any){
            Alert.alert("Loi",err.message);
        }
    }
    const renderItem=({item}:{item: Product})=>(
        <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
            <View>
                <Text>Ten: {item.name}</Text>
                <Text>Gia: {item.price.toLocaleString()} d</Text>
                <Text>Don vi: {item.unit?? '-'}</Text>
            </View>
            <View>
                <Pressable onPress={()=>handleAddToCart(item.id!)}>
                    <Text>Them vao gio</Text>
                </Pressable>
                <Pressable onPress={()=>handleDelete(item.id!)}>
                    <Text>Xoa</Text>
                </Pressable>
            </View>
        </View>
    )

    return (
        <View style={{flex:1,padding:20}}>
            <Pressable onPress={()=>route.push("/listProduct")}>
                <Text>Xem gio hang</Text>
            </Pressable>
            <Text>Them san pham moi</Text>
            <TextInput placeholder='Ten' value={name} onChangeText={setName}/>
            <TextInput placeholder='Gia' value={price} onChangeText={setPrice}/>
            <TextInput placeholder='Don vi' value={unit} onChangeText={setUnit}/>
            <Pressable onPress={handleAddProduct}>
                <Text>Them san pham</Text>
            </Pressable>
            <Text>Danh sach san pham</Text>
            <FlatList
            data={products}
            keyExtractor={(item)=> item.id?.toString()??Math.random().toString()}
            renderItem={renderItem}/>
        </View>
    )
}