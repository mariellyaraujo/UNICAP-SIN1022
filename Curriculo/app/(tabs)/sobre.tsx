import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../src/context/ThemeContext';
import { Sun, Moon, Code2, Rocket, Heart } from 'lucide-react-native';

export default function Sobre() {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Sobre o App</Text>
        <TouchableOpacity onPress={toggleTheme}>
          {isDark ? <Sun color={theme.primary} size={28} /> : <Moon color={theme.primary} size={28} />}
        </TouchableOpacity>
      </View>

      <View style={[styles.glassCard, { backgroundColor: theme.card }]}>
        <Code2 color={theme.primary} size={32} style={styles.icon} />
        <Text style={[styles.cardTitle, { color: theme.primary }]}>Tecnologias</Text>
        <Text style={[styles.cardText, { color: theme.text }]}>
          Construído com React Native, Expo Router e Axios para uma experiência fluida e moderna.
        </Text>
      </View>

      <View style={[styles.glassCard, { backgroundColor: theme.card }]}>
        <Rocket color={theme.primary} size={32} style={styles.icon} />
        <Text style={[styles.cardTitle, { color: theme.primary }]}>Funcionalidade Extra</Text>
        <Text style={[styles.cardText, { color: theme.text }]}>
          Dark Mode dinâmico com paleta personalizada:{"\n"}
          Dark: Preto & Cereja | Light: Branco & Rosa.
        </Text>
      </View>

      <View style={[styles.glassCard, { backgroundColor: theme.card, marginBottom: 50 }]}>
        <Heart color={theme.primary} size={32} style={styles.icon} />
        <Text style={[styles.cardTitle, { color: theme.primary }]}>Propósito</Text>
        <Text style={[styles.cardText, { color: theme.text }]}>
          Atividade de Portfólio integrada com Back-end Node.js hospedado na Vercel.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, paddingTop: 60 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40 },
  title: { fontSize: 32, fontWeight: 'bold' },
  glassCard: { padding: 20, borderRadius: 20, marginBottom: 20, elevation: 5, shadowColor: '#000', shadowOpacity: 0.1 },
  icon: { marginBottom: 10 },
  cardTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  cardText: { fontSize: 15, lineHeight: 22, opacity: 0.8 }
});