import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="modal" 
        options={{ 
          presentation: 'transparentModal', // MUDE AQUI para transparentModal
          headerShown: false,               // Esconde o cabeçalho para o efeito ficar melhor
          animation: 'fade',                // Animação suave
        }} 
      />
    </Stack>
  );
}