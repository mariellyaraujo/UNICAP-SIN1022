import React from 'react';
import { Tabs } from 'expo-router';

import { useTheme } from '../../src/context/ThemeContext';

import {
  Users,
  CircleHelp
} from 'lucide-react-native';

export default function TabLayout() {
  const { theme, isDark } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: theme.primary,

        tabBarInactiveTintColor: isDark
          ? '#777'
          : '#999',

        tabBarStyle: {
          backgroundColor: theme.card,
          borderTopWidth: 0,
          height: 70,
          paddingTop: 10,
          paddingBottom: 10,

          shadowColor: '#000',
          shadowOpacity: 0.06,
          shadowRadius: 16,
          shadowOffset: {
            width: 0,
            height: -4,
          },

          elevation: 0,
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: -2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Perfis',

          tabBarIcon: ({
            color,
            focused,
          }) => (
            <Users
              size={focused ? 24 : 22}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="two"
        options={{
          title: 'Sobre',

          tabBarIcon: ({
            color,
            focused,
          }) => (
            <CircleHelp
              size={focused ? 24 : 22}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}