import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { ensureSchema, seedIfEmpty } from '@/src/db/database';
import { useEffect } from 'react';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
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
        <Stack.Screen name="cart" options={{ title: 'Danh sach san pham'  }} />
        <Stack.Screen name="listProduct" options={{ title: 'Gio hang'  }} />
      </Stack>
  )
}
