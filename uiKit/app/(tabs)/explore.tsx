import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Layout, Text, Toggle, Datepicker, Select, SelectItem, IndexPath, Spinner, Divider } from '@ui-kitten/components';

export default function ExploreScreen() {
  const [checked, setChecked] = useState(true);
  const [date, setDate] = useState(new Date());
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));

  return (
    <Layout style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text category='h2' style={styles.mainTitle}>Explorar Kit 🎨</Text>

        {/* 1. TOGGLE (O switch arredondado) */}
        <View style={styles.row}>
          <View>
            <Text category='s1'>Modo Noturno</Text>
            <Text appearance='hint'>Ative para tons suaves</Text>
          </View>
          <Toggle checked={checked} onChange={setChecked} status='primary' />
        </View>

        <Divider style={styles.divider} />

        {/* 2. SELECT (Menu elegante) */}
        <View style={styles.section}>
          <Text category='s1' style={styles.label}>Selecione uma Categoria:</Text>
          <Select
            placeholder='Escolha um tema'
            selectedIndex={selectedIndex}
            onSelect={index => setSelectedIndex(index as IndexPath)}>
            <SelectItem title='Decoração 🎀' />
            <SelectItem title='Estudos 📚' />
            <SelectItem title='Lazer 🎈' />
          </Select>
        </View>

        {/* 3. DATEPICKER (Calendário) */}
        <View style={styles.section}>
          <Text category='s1' style={styles.label}>Agende um evento:</Text>
          <Datepicker
            date={date}
            onSelect={nextDate => setDate(nextDate)}
            style={styles.input}
          />
        </View>

        {/* 4. SPINNER (Indicador de carregamento) */}
        <View style={styles.loadingArea}>
          <Text style={{ marginBottom: 10 }}>Carregando fofura...</Text>
          <Spinner size='large' status='warning' />
        </View>

      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F8FF' },
  content: { padding: 25, paddingTop: 60 },
  mainTitle: { marginBottom: 30, color: '#4682B4', textAlign: 'center' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  section: { marginVertical: 15 },
  label: { marginBottom: 10, fontWeight: 'bold' },
  input: { borderRadius: 12 },
  divider: { marginVertical: 20 },
  loadingArea: { alignItems: 'center', marginTop: 30 }
});