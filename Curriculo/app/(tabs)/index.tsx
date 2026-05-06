import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import api from '../../src/services/api';
import { useTheme } from '../../src/context/ThemeContext';
import { Moon, Sun } from 'lucide-react-native';

interface Pessoa {
  id: string;
  nome: string;
  email: string;
}

export default function Home() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme, isDark, toggleTheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    api.get('/pessoas')
      .then((res) => setPessoas(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={[styles.loading, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Currículos</Text>
        <TouchableOpacity onPress={toggleTheme} style={styles.themeBtn}>
          {isDark ? <Sun color={theme.primary} size={24} /> : <Moon color={theme.primary} size={24} />}
        </TouchableOpacity>
      </View>

      <FlatList
        data={pessoas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.card, { backgroundColor: theme.card, borderLeftColor: theme.primary }]}
            onPress={() => router.push(`/pessoa/${item.id}`)}
          >
            <Text style={[styles.cardTitle, { color: theme.text }]}>{item.nome}</Text>
            <Text style={{ color: theme.text, opacity: 0.6 }}>{item.email}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60 },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  title: { fontSize: 28, fontWeight: 'bold' },
  themeBtn: { padding: 8 },
  card: { padding: 20, marginBottom: 15, borderRadius: 12, borderLeftWidth: 6, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 }
});