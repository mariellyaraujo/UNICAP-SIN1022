import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import api from './../../src/services/api';
import { useTheme } from './../../src/context/ThemeContext';

export default function CriarPessoa() {
  const router = useRouter();
  const { theme } = useTheme();
  const [form, setForm] = useState({ nome: '', email: '', resumo: '' });

  const handleSalvar = async () => {
    if (!form.nome || !form.email) return;
    await api.post('/pessoas', form);
    router.back();
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Stack.Screen options={{ title: 'Novo Perfil', headerShown: true, headerStyle: { backgroundColor: theme.background }, headerTintColor: theme.text }} />
      
      <Text style={[styles.label, { color: theme.primary }]}>Nome Completo</Text>
      <TextInput 
        style={[styles.input, { backgroundColor: theme.card, color: theme.text }]} 
        value={form.nome} 
        onChangeText={(t) => setForm({...form, nome: t})}
        placeholder="Ex: Fulano de Oliveira"
        placeholderTextColor="#888"
      />

      <Text style={[styles.label, { color: theme.primary }]}>E-mail</Text>
      <TextInput 
        style={[styles.input, { backgroundColor: theme.card, color: theme.text }]} 
        value={form.email} 
        onChangeText={(t) => setForm({...form, email: t})}
        keyboardType="email-address"
        placeholder="Ex: fulano@email.com"
        placeholderTextColor="#888"
      />

      <Text style={[styles.label, { color: theme.primary }]}>Resumo Profissional</Text>
      <TextInput 
        style={[styles.input, { backgroundColor: theme.card, color: theme.text, height: 100 }]} 
        value={form.resumo} 
        onChangeText={(t) => setForm({...form, resumo: t})}
        multiline
        placeholder="Ex: Desenvolvedor Full Stack com 5 anos de experiência..."
        placeholderTextColor="#888"
        textAlignVertical="top"
      />

      <TouchableOpacity style={[styles.btn, { backgroundColor: theme.primary }]} onPress={handleSalvar}>
        <Text style={styles.btnText}>Criar Perfil</Text>
      </TouchableOpacity>
      <View style={{height: 40}} />
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