import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';
import api from './../../src/services/api';
import { useTheme } from './../../src/context/ThemeContext';

export default function CriarFormacao() {
  const router = useRouter();
  const { pessoaId } = useLocalSearchParams();
  const { theme } = useTheme();
  const [form, setForm] = useState({ curso: '', instituicao: '', ano_conclusao: '' });

  const handleSalvar = async () => {
    if (!form.curso || !form.instituicao) return;
    await api.post('/formacoes', { ...form, pessoaId: Number(pessoaId) });
    router.back();
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Stack.Screen options={{ title: 'Adicionar Formação', headerShown: true, headerStyle: { backgroundColor: theme.background }, headerTintColor: theme.text }} />
      
      <Text style={[styles.label, { color: theme.primary }]}>Curso</Text>
      <TextInput 
        style={[styles.input, { backgroundColor: theme.card, color: theme.text }]} 
        value={form.curso}
        onChangeText={(t) => setForm({...form, curso: t})}
        placeholder="Ex: Bacharelado em Sistemas"
        placeholderTextColor="#888"
      />

      <Text style={[styles.label, { color: theme.primary }]}>Instituição</Text>
      <TextInput 
        style={[styles.input, { backgroundColor: theme.card, color: theme.text }]} 
        value={form.instituicao}
        onChangeText={(t) => setForm({...form, instituicao: t})}
        placeholder="Ex: Universidade Federal"
        placeholderTextColor="#888"
      />

      <Text style={[styles.label, { color: theme.primary }]}>Ano de Conclusão</Text>
      <TextInput 
        style={[styles.input, { backgroundColor: theme.card, color: theme.text }]} 
        value={form.ano_conclusao}
        onChangeText={(t) => setForm({...form, ano_conclusao: t})}
        placeholder="Ex: 2023"
        placeholderTextColor="#888"
        keyboardType="numeric"
      />

      <TouchableOpacity style={[styles.btn, { backgroundColor: theme.primary }]} onPress={handleSalvar}>
        <Text style={styles.btnText}>Salvar Formação</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 8, marginTop: 15 },
  input: { borderRadius: 10, padding: 15, fontSize: 16 },
  btn: { marginTop: 30, padding: 18, borderRadius: 12, alignItems: 'center', marginBottom: 40 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});