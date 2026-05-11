import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';
import api from './../../src/services/api';
import { useTheme } from './../../src/context/ThemeContext';

export default function CriarFormacao() {
  const router = useRouter();
  const { pessoaId } = useLocalSearchParams();
  const { theme } = useTheme();
  
  const [form, setForm] = useState({
    curso: '',
    instituicao: '',
    ano_conclusao: ''
  });

  
  const handleSalvar = async () => {
    if (!form.curso || !form.instituicao) {
      Alert.alert("Aviso", "Por favor, preencha o curso e a instituição.");
      return;
    }

    if (!pessoaId) {
      Alert.alert("Erro", "ID do perfil não encontrado.");
      return;
    }

    const payload = { 
      ...form, 
      pessoaId: Number(pessoaId) 
    };

    try {
      await api.post('/formacoes', payload);
      router.back();
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Falha ao salvar formação académica.");
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Stack.Screen options={{ title: 'Adicionar Formação', headerShown: true }} />
      
      <Text style={[styles.label, { color: theme.primary }]}>Curso</Text>
      <TextInput 
        style={[styles.input, { backgroundColor: theme.card, color: theme.text }]} 
        value={form.curso}
        onChangeText={(t) => setForm({...form, curso: t})}
        placeholder="Ex: Engenharia de Software"
        placeholderTextColor="#888"
      />

      <Text style={[styles.label, { color: theme.primary }]}>Instituição</Text>
      <TextInput 
        style={[styles.input, { backgroundColor: theme.card, color: theme.text }]} 
        value={form.instituicao}
        onChangeText={(t) => setForm({...form, instituicao: t})}
        placeholder="Ex: Universidade de Coimbra"
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
  btn: { marginTop: 30, padding: 18, borderRadius: 12, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});