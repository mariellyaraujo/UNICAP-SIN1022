import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
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
    await api.post('/experiencias', { ...form, pessoaId: Number(pessoaId) });
    router.back();
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Stack.Screen options={{ title: 'Adicionar Experiência', headerShown: true, headerStyle: { backgroundColor: theme.background }, headerTintColor: theme.text }} />
      
      <Text style={[styles.label, { color: theme.primary }]}>Cargo</Text>
      <TextInput 
        style={[styles.input, { backgroundColor: theme.card, color: theme.text }]} 
        value={form.cargo}
        onChangeText={(t) => setForm({...form, cargo: t})}
        placeholder="Ex: Engenheiro de Software Senior"
        placeholderTextColor="#888"
      />

      <Text style={[styles.label, { color: theme.primary }]}>Empresa</Text>
      <TextInput 
        style={[styles.input, { backgroundColor: theme.card, color: theme.text }]} 
        value={form.empresa}
        onChangeText={(t) => setForm({...form, empresa: t})}
        placeholder="Ex: Google Brasil"
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