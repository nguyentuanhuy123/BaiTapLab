import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { ensureSchema, seedIfEmpty } from "@/src/db/db";
import { useEffect } from "react";

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  useEffect(() => {
    (async () => {
      try {
        await ensureSchema();
        await seedIfEmpty();
        console.log("✅ Database ready");
      } catch (err) {
        console.error("❌ Lỗi khởi tạo DB:", err);
      }
    })();
  }, []);

  return (
    <Stack>
      <Stack.Screen name="listProduct" options={{ title: 'Thêm vào giỏ' }} />
      <Stack.Screen name="cart" options={{ title: 'Giỏ hàng' }} />
    </Stack>
  );
}
