import { Stack } from 'expo-router';
import { ThemeProvider } from '../src/context/ThemeContext';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="pessoa/[id]" 
          options={{ 
            headerShown: true, 
            title: 'Currículo Detalhado',
            headerBackTitle: 'Voltar' 
          }} 
        />
      </Stack>
    </ThemeProvider>
  );
}