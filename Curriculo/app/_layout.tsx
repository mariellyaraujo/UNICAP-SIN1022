import { Stack } from 'expo-router';
import { ThemeProvider, useTheme } from '../src/context/ThemeContext';

function AppStack() {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerShadowVisible: false,
        headerTintColor: theme.text,
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: '600',
        },
        contentStyle: {
          backgroundColor: theme.background,
        },
        animation: 'ios_from_right',
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="pessoa/[id]"
        options={{
          headerShown: true,
          title: 'Currículo',
          headerBackTitle: 'Voltar',
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AppStack />
    </ThemeProvider>
  );
}