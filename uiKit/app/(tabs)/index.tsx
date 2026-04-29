import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Layout, Text, Card, Button, Icon } from '@ui-kitten/components';

export default function HomeScreen() {
  return (
    <Layout style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text category='h1' style={styles.title}>UI Kitten 🌸</Text>
        
        <Card style={styles.card} status='info'>
          <Text category='h6'>Página 01: Welcome!</Text>
          <Text style={styles.text}>
            Este é um exemplo de Card usando o status "info". As bordas são naturalmente arredondadas.
          </Text>
        </Card>

        <Button size='medium' status='primary' style={styles.button}>
          BOTÃO PRINCIPAL
        </Button>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingTop: 50 },
  title: { marginBottom: 20, color: '#FFB6C1' }, // Um rosinha pra vibe
  card: { borderRadius: 20, marginBottom: 15 },
  text: { marginTop: 10 },
  button: { borderRadius: 25 }
});