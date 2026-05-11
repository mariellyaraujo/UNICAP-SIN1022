import React from 'react';
import { Tabs } from 'expo-router';
import { useTheme } from '../../src/context/ThemeContext';
import { Users, Info } from 'lucide-react-native';

export default function TabLayout() {
  const { theme, isDark } = useTheme();

  return (
    <Tabs
      screenOptions={{

        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: isDark ? '#888' : '#999',
        

        tabBarStyle: {
          backgroundColor: theme.background,
          borderTopColor: isDark ? '#333' : '#eee',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },

        headerStyle: {
          backgroundColor: theme.background,
          elevation: 0, 
          shadowOpacity: 0, 
        },
        headerTintColor: theme.text,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
        },
      
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}>
      
      <Tabs.Screen
        name="index"
        options={{
          title: 'Perfis',
          tabBarIcon: ({ color }) => <Users size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="two"
        options={{
          title: 'Sobre',
          tabBarIcon: ({ color }) => <Info size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}