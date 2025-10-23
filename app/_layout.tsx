import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { initDB } from '../src/db/database';
import { seedProducts } from '../src/db/seed';

export default function Layout() {
  useEffect(() => {
    initDB();
    seedProducts();
  }, []);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Sản phẩm' }} />
      <Stack.Screen name="cart" options={{ title: 'Giỏ hàng' }} />
      <Stack.Screen name="invoice" options={{ title: 'Hoá đơn' }} />
    </Stack>
  );
}
