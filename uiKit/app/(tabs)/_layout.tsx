import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        
        tabBarActiveTintColor: '#DE3163', 
        tabBarInactiveTintColor: '#888', 
        tabBarStyle: {
          backgroundColor: '#121212', 
          borderTopColor: '#333', 
          height: 60,
          paddingBottom: 10,
        },
        headerShown: false, 
      }}>
      
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={28} color={color} />,
        }}
      />
      
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Inventory',
          tabBarIcon: ({ color }) => <Ionicons name="star" size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}