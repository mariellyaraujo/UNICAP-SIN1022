import { Stack } from 'expo-router';
import { ThemeProvider } from '../src/context/ThemeContext';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack
        screenOptions={{
          headerShadowVisible: false,
          headerTitle: '',
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen
          name="pessoa/[id]"
          options={{
            headerShown: true
          }}
        />

        <Stack.Screen
          name="pessoa/criar"
          options={{
            headerShown: true
          }}
        />

        <Stack.Screen
          name="pessoa/editar"
          options={{
            headerShown: true
          }}
        />

        <Stack.Screen
          name="formacao/criar"
          options={{
            headerShown: true
          }}
        />

        <Stack.Screen
          name="experiencia/criar"
          options={{
            headerShown: true
          }}
        />

        <Stack.Screen
          name="projeto/criar"
          options={{
            headerShown: true
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}