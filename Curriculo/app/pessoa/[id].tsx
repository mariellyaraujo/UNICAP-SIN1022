import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import api from './../../src/services/api';
import { useTheme } from './../../src/context/ThemeContext';

interface Experiencia {
  id: string;
  cargo: string;
  empresa: string;
}

interface Formacao {
  id: string;
  curso: string;
  instituicao: string;
}

interface PessoaDetalhe {
  nome: string;
  resumo: string;
  experiencias: Experiencia[];
  formacoes: Formacao[];
}

export default function PessoaDetalhes() {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState<PessoaDetalhe | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    api.get(`/pessoas/${id}`).then((res) => setData(res.data));
  }, [id]);

  if (!data) {
    return (
      <View style={[styles.loading, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Stack.Screen options={{ 
        headerStyle: { backgroundColor: theme.background },
        headerTintColor: theme.text,
        title: data.nome 
      }} />
      
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.primary }]}>Resumo Profissional</Text>
        <Text style={[styles.text, { color: theme.text }]}>{data.resumo}</Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.primary }]}>Experiência Profissional</Text>
        {data.experiencias.length > 0 ? data.experiencias.map((exp) => (
          <View key={exp.id} style={styles.item}>
            <Text style={[styles.itemTitle, { color: theme.text }]}>{exp.cargo}</Text>
            <Text style={{ color: theme.text, opacity: 0.7 }}>{exp.empresa}</Text>
          </View>
        )) : <Text style={{ color: theme.text }}>Nenhuma experiência registrada.</Text>}
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.primary }]}>Formação Acadêmica</Text>
        {data.formacoes.length > 0 ? data.formacoes.map((form) => (
          <View key={form.id} style={styles.item}>
            <Text style={[styles.itemTitle, { color: theme.text }]}>{form.curso}</Text>
            <Text style={{ color: theme.text, opacity: 0.7 }}>{form.instituicao}</Text>
          </View>
        )) : <Text style={{ color: theme.text }}>Nenhuma formação registrada.</Text>}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  section: { marginBottom: 30, padding: 15, borderRadius: 10 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, borderBottomWidth: 1, borderBottomColor: '#ccc', paddingBottom: 5 },
  text: { fontSize: 16, lineHeight: 24 },
  item: { marginBottom: 15 },
  itemTitle: { fontSize: 17, fontWeight: 'bold' }
});