import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, Stack, useRouter, useFocusEffect } from 'expo-router';
import api from './../../src/services/api';
import { useTheme } from './../../src/context/ThemeContext';
import { InfoCard } from './../../src/components/InfoCard';
import { Sun, Moon, Plus, Trash2 } from 'lucide-react-native';

export default function PessoaDetalhes() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { theme, isDark, toggleTheme } = useTheme();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const carregarDados = async () => {
    try {
      const res = await api.get(`/pessoas/${id}?t=${Date.now()}`);
      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      carregarDados();
    }, [id])
  );

  const handleDeleteItem = (itemId: string, rota: 'formacoes' | 'experiencias') => {
    Alert.alert("Remover Item", "Tem certeza que deseja apagar?", [
      { text: "Cancelar", style: "cancel" },
      { 
        text: "Apagar", 
        style: "destructive", 
        onPress: async () => {
          try {
            await api.delete(`/${rota}/${itemId}`);
            carregarDados();
          } catch (err) {
            Alert.alert("Erro", "Falha ao apagar.");
          }
        } 
      }
    ]);
  };

  if (loading && !data) return <View style={[styles.loadingCenter, { backgroundColor: theme.background }]}><ActivityIndicator size="large" color={theme.primary} /></View>;
  if (!data) return null;

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Stack.Screen options={{ 
        headerRight: () => (
          <TouchableOpacity onPress={toggleTheme} style={{marginRight: 15}}>
            {isDark ? <Sun color={theme.primary} size={24} /> : <Moon color={theme.primary} size={24} />}
          </TouchableOpacity>
        ),
        headerStyle: { backgroundColor: theme.background },
        headerTintColor: theme.text,
        title: ""
      }} />

      <View style={styles.headerSection}>
        <Text style={[styles.name, { color: theme.text }]}>{data.nome}</Text>
        <Text style={[styles.email, { color: theme.text }]}>{data.email}</Text>
        <View style={styles.mainActions}>
           <TouchableOpacity style={[styles.btnAction, {backgroundColor: theme.primary}]} onPress={() => alert('Editar')}>
              <Text style={[styles.btnText, {color: isDark ? '#000' : '#fff'}]}>Editar Perfil</Text>
           </TouchableOpacity>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.primary }]}>Formações Académicas</Text>
        <TouchableOpacity style={styles.btnAdd} onPress={() => router.push({ pathname: '/formacao/criar', params: { pessoaId: id } } as any)}>
          <Plus color={theme.primary} size={22} />
        </TouchableOpacity>
      </View>
      {data.formacoes?.map((f: any) => (
        <View key={f.id} style={styles.cardWrapper}>
          <InfoCard title={f.curso} subtitle={f.instituicao} footer={f.ano_conclusao} />
          <TouchableOpacity onPress={() => handleDeleteItem(f.id, 'formacoes')} style={styles.innerTrash}>
            <Trash2 color="#ff4444" size={18} />
          </TouchableOpacity>
        </View>
      ))}

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.primary }]}>Experiências Profissionais</Text>
        <TouchableOpacity style={styles.btnAdd} onPress={() => router.push({ pathname: '/experiencia/criar', params: { pessoaId: id } } as any)}>
          <Plus color={theme.primary} size={22} />
        </TouchableOpacity>
      </View>
      {data.experiencias?.filter((e: any) => !e.empresa?.includes('[PROJETO]')).map((e: any) => (
        <View key={e.id} style={styles.cardWrapper}>
          <InfoCard title={e.cargo} subtitle={e.empresa} />
          <TouchableOpacity onPress={() => handleDeleteItem(e.id, 'experiencias')} style={styles.innerTrash}>
            <Trash2 color="#ff4444" size={18} />
          </TouchableOpacity>
        </View>
      ))}

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.primary }]}>Projetos Realizados</Text>
        <TouchableOpacity style={styles.btnAdd} onPress={() => router.push({ pathname: '/projeto/criar', params: { pessoaId: id } } as any)}>
          <Plus color={theme.primary} size={22} />
        </TouchableOpacity>
      </View>
      {data.experiencias?.filter((e: any) => e.empresa?.includes('[PROJETO]')).map((e: any) => (
         <View key={e.id} style={styles.cardWrapper}>
            <InfoCard title={e.cargo} subtitle={e.empresa.replace('[PROJETO]', '').trim()} />
            <TouchableOpacity onPress={() => handleDeleteItem(e.id, 'experiencias')} style={styles.innerTrash}>
              <Trash2 color="#ff4444" size={18} />
            </TouchableOpacity>
         </View>
      ))}

      <View style={{height: 40}} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  loadingCenter: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerSection: { marginBottom: 35, alignItems: 'center' },
  name: { fontSize: 32, fontWeight: 'bold' },
  email: { fontSize: 16, opacity: 0.6, marginBottom: 20 },
  mainActions: { flexDirection: 'row', width: '100%', gap: 12, justifyContent: 'center' },
  btnAction: { height: 50, borderRadius: 15, paddingHorizontal: 30, alignItems: 'center', justifyContent: 'center', elevation: 3 },
  btnText: { fontSize: 15, fontWeight: 'bold' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, marginTop: 10 },
  sectionTitle: { fontSize: 19, fontWeight: 'bold' },
  btnAdd: { padding: 5, borderRadius: 50, backgroundColor: 'rgba(210, 31, 60, 0.1)' },
  

  cardWrapper: {
    position: 'relative', 
    marginBottom: 5,
  },

  innerTrash: {
    position: 'absolute',
    top: 15,
    right: 15,
    padding: 8,
    zIndex: 10, 
  }
});