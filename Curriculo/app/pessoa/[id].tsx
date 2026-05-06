import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import api from './../../src/services/api';
import { useTheme } from './../../src/context/ThemeContext';
import { InfoCard } from './../../src/components/InfoCard';
import { Sun, Moon, Plus } from 'lucide-react-native';

export default function PessoaDetalhes() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { theme, isDark, toggleTheme } = useTheme();
  const [data, setData] = useState<any>(null);

  const carregarDados = () => api.get(`/pessoas/${id}`).then((res) => setData(res.data));

  useEffect(() => { carregarDados(); }, [id]);

  const handleDeletePessoa = () => {
    Alert.alert("Atenção", "Deseja excluir este perfil?", [
      { text: "Cancelar" },
      { text: "Excluir", onPress: async () => {
          await api.delete(`/pessoas/${id}`);
          router.replace('/');
      }}
    ]);
  };

  if (!data) return <View style={{flex:1, backgroundColor: theme.background}} />;

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
           
           <TouchableOpacity style={[styles.btnAction, {backgroundColor: '#ff4444'}]} onPress={handleDeletePessoa}>
              <Text style={[styles.btnText, {color: '#fff'}]}>Excluir Tudo</Text>
           </TouchableOpacity>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.primary }]}>Formações Acadêmicas</Text>
        <TouchableOpacity style={styles.btnAdd} onPress={() => alert('Add Formação')}>
          <Plus color={theme.primary} size={22} />
        </TouchableOpacity>
      </View>
      {data.formacoes.map((f: any) => (
        <InfoCard key={f.id} title={f.curso} subtitle={f.instituicao} onDelete={() => {}} />
      ))}

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.primary }]}>Experiências Profissionais</Text>
        <TouchableOpacity style={styles.btnAdd} onPress={() => alert('Add Experiência')}>
          <Plus color={theme.primary} size={22} />
        </TouchableOpacity>
      </View>
      {data.experiencias.map((e: any) => (
        <InfoCard key={e.id} title={e.cargo} subtitle={e.empresa} onDelete={() => {}} />
      ))}

      <View style={{height: 40}} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  headerSection: { marginBottom: 35, alignItems: 'center' },
  name: { fontSize: 32, fontWeight: 'bold' },
  email: { fontSize: 16, opacity: 0.6, marginBottom: 20 },
  mainActions: { flexDirection: 'row', width: '100%', gap: 12, justifyContent: 'center' },
  btnAction: { height: 50, borderRadius: 15, flex: 1, alignItems: 'center', justifyContent: 'center', elevation: 3 },
  btnText: { fontSize: 15, fontWeight: 'bold' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, marginTop: 10 },
  sectionTitle: { fontSize: 19, fontWeight: 'bold' },
  btnAdd: { padding: 5, borderRadius: 50, backgroundColor: 'rgba(210, 31, 60, 0.1)' }
});