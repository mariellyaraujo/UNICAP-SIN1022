import React, { useState } from 'react';
import { Layout, Text, Toggle, Input, Datepicker } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

export default function ExploreScreen() {
  const [checked, setChecked] = useState(false);
  const [date, setDate] = useState(new Date());

  return (
    <Layout style={styles.container}>
      <Text category='h2' style={{ marginBottom: 20 }}>Componentes ✨</Text>
      
      <View style={styles.item}>
        <Text>Switch Fofinho (Toggle):</Text>
        <Toggle checked={checked} onChange={setChecked} />
      </View>

      <Input
        label='Input com Label'
        placeholder='Escreva aqui...'
        style={styles.input}
      />

      <Datepicker
        label='Seletor de Data'
        date={date}
        onSelect={nextDate => setDate(nextDate)}
        style={styles.input}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50 },
  item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  input: { marginBottom: 15 }
});