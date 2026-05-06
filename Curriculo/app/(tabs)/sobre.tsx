import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../../src/context/ThemeContext';

export default function Sobre() {
  const { theme } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.primary }]}>Sobre o Projeto</Text>
      
      <View style={styles.card}>
        <Text style={[styles.subtitle, { color: theme.primary }]}>Tecnologias</Text>
        <Text style={[styles.text, { color: theme.text }]}>
          • React Native + Expo{"\n"}
          • Expo Router{"\n"}
          • TypeScript{"\n"}
          • Axios para API{"\n"}
          • Lucide React Native (Ícones){"\n"}
          • Context API para Temas
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={[styles.subtitle, { color: theme.primary }]}>Funcionalidade Extra</Text>
        <Text style={[styles.text, { color: theme.text }]}>
          Sistema de Dark Mode dinâmico com paleta personalizada (Preto/Cereja e Branco/Rosa) gerenciado via Context API, garantindo troca de estado global sem refresh.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={[styles.subtitle, { color: theme.primary }]}>Desenvolvimento</Text>
        <Text style={[styles.text, { color: theme.text }]}>
          App integrado ao Back-end Node.js/Express hospedado na Vercel com banco de dados PostgreSQL.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 25 },
  card: { marginBottom: 20, padding: 15, borderRadius: 10 },
  subtitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  text: { fontSize: 16, lineHeight: 26 }
});