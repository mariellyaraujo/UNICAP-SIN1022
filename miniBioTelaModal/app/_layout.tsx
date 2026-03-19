import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen 
        name="modal" 
        options={{ 
          presentation: 'transparentModal',
          animation: 'fade', 
          headerShown: false 
        }} 
      />
    </Stack>
  );
}