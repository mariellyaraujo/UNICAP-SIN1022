import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';
import api from './../../src/services/api';
import { useTheme } from './../../src/context/ThemeContext';

export default function CriarExperiencia() {
  const router = useRouter();
  const { pessoaId } = useLocalSearchParams();
  const { theme } = useTheme();
  const [form, setForm] = useState({ cargo: '', empresa: '' });

  const handleSalvar = async () => {
    if (!form.cargo || !form.empresa) return;
    if (!pessoaId) {
      Alert.alert("Erro", "ID do perfil não encontrado.");
      return;
    }

    const payload = { 
      cargo: form.cargo,
      empresa: form.empresa,
      pessoaId: String(pessoaId) 
    };

    try {
      await api.post('/experiencias', payload);
      router.back();
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Falha ao salvar experiência.");
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Stack.Screen options={{ title: 'Nova Experiência', headerShown: true }} />
      <Text style={[styles.label, { color: theme.primary }]}>Cargo</Text>
      <TextInput 
        style={[styles.input, { backgroundColor: theme.card, color: theme.text }]} 
        value={form.cargo}
        onChangeText={(t) => setForm({...form, cargo: t})}
        placeholder="Cargo exercido..."
        placeholderTextColor="#888"
      />
      <Text style={[styles.label, { color: theme.primary }]}>Empresa</Text>
      <TextInput 
        style={[styles.input, { backgroundColor: theme.card, color: theme.text }]} 
        value={form.empresa}
        onChangeText={(t) => setForm({...form, empresa: t})}
        placeholder="Nome da empresa..."
        placeholderTextColor="#888"
      />
      <TouchableOpacity style={[styles.btn, { backgroundColor: theme.primary }]} onPress={handleSalvar}>
        <Text style={styles.btnText}>Salvar Experiência</Text>
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