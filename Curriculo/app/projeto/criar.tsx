import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';
import api from './../../src/services/api';
import { useTheme } from './../../src/context/ThemeContext';

export default function CriarProjeto() {
  const router = useRouter();
  const { pessoaId } = useLocalSearchParams();
  const { theme } = useTheme();
  const [form, setForm] = useState({ nome: '', descricao: '' });

  const handleSalvar = async () => {
    if (!form.nome || !form.descricao) return;
    if (!pessoaId) {
      Alert.alert("Erro", "ID do perfil não encontrado.");
      return;
    }

    const payload = { 
      cargo: form.nome, 
      empresa: `[PROJETO] ${form.descricao}`, 
      pessoaId: Number(pessoaId) 
    };

    try {
      await api.post('/experiencias', payload);
      router.back();
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Falha ao salvar projeto.");
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Stack.Screen options={{ title: 'Novo Projeto', headerShown: true }} />
      <Text style={[styles.label, { color: theme.primary }]}>Nome do Projeto</Text>
      <TextInput 
        style={[styles.input, { backgroundColor: theme.card, color: theme.text }]} 
        value={form.nome}
        onChangeText={(t) => setForm({...form, nome: t})}
        placeholder="Ex: App de Finanças"
        placeholderTextColor="#888"
      />
      <Text style={[styles.label, { color: theme.primary }]}>Descrição</Text>
      <TextInput 
        style={[styles.input, { backgroundColor: theme.card, color: theme.text, height: 100 }]} 
        value={form.descricao}
        onChangeText={(t) => setForm({...form, descricao: t})}
        multiline
        textAlignVertical="top"
        placeholder="O que foi desenvolvido..."
        placeholderTextColor="#888"
      />
      <TouchableOpacity style={[styles.btn, { backgroundColor: theme.primary }]} onPress={handleSalvar}>
        <Text style={styles.btnText}>Salvar Projeto</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 8, marginTop: 15 },
  input: { borderRadius: 10, padding: 15, fontSize: 16 },
  btn: { marginTop: 30, padding: 18, borderRadius: 12, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});