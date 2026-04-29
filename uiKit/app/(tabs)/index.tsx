import React, { useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Layout, Text, Button, Input, Radio, RadioGroup, Avatar, Card } from '@ui-kitten/components';

export default function HomeScreen() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [value, setValue] = useState('');

  return (
    <Layout style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* 1. AVATAR (Super fofo) */}
        <View style={styles.header}>
          <Avatar 
            size='giant' 
            source={{ uri: 'https://api.dicebear.com/7.x/adventurer/svg?seed=fofa' }} 
            style={styles.avatar}
          />
          <Text category='h4' style={styles.title}>Olá, Usuária! ✨</Text>
        </View>

        {/* 2. CARD COM INPUT */}
        <Card style={styles.card}>
          <Text category='s1' style={styles.label}>O que está pensando?</Text>
          <Input
            placeholder='Escreva algo doce...'
            value={value}
            onChangeText={setValue}
            style={styles.input}
          />
        </Card>

        {/* 3. RADIO GROUP (Seleção fofa) */}
        <View style={styles.section}>
          <Text category='s1' style={styles.label}>Escolha sua vibe de hoje:</Text>
          <RadioGroup
            selectedIndex={selectedIndex}
            onChange={index => setSelectedIndex(index)}>
            <Radio>🌸 Rosa Pastel</Radio>
            <Radio>✨ Brilho Mágico</Radio>
            <Radio>☁️ Nuvem Suave</Radio>
          </RadioGroup>
        </View>

        {/* 4. BOTÕES COLORIDOS */}
        <View style={styles.buttonRow}>
          <Button status='success' style={styles.roundedButton}>Salvar</Button>
          <Button status='danger' appearance='outline' style={styles.roundedButton}>Cancelar</Button>
        </View>

      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF5F7' },
  content: { padding: 20, paddingTop: 60 },
  header: { alignItems: 'center', marginBottom: 30 },
  avatar: { marginBottom: 10, borderWidth: 2, borderColor: '#FFB6C1' },
  title: { color: '#D87093' },
  card: { borderRadius: 25, marginBottom: 20, borderWidth: 0, elevation: 3 },
  section: { marginBottom: 25 },
  label: { marginBottom: 10, color: '#888' },
  input: { borderRadius: 15 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-around' },
  roundedButton: { borderRadius: 20, flex: 1, marginHorizontal: 5 }
});