import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Modal } from 'react-native';
import { Layout, Text, Card, Button, Avatar } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons'; 

export default function HomeScreen() {
  const [visible, setVisible] = useState(false);
  const [explanation, setExplanation] = useState('');

  const showInfo = (text: string) => {
    setExplanation(text);
    setVisible(true);
  };

  return (
    <Layout style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={styles.header}>
          <Avatar 
            size='giant' 
            source={{ uri: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=stardew' }} 
            style={styles.avatar}
          />
          <Text category='h4' style={styles.title}>Marielly's Farm</Text>
          <Text style={styles.subtitle}>Fazendeira & Mineradora de Diamantes</Text>
        </View>

        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <Text category='h6' style={{ color: '#DE3163' }}>Minhas Estrelas</Text>
            <TouchableOpacity onPress={() => showInfo("Este é o componente 'Card'. Ele organiza o conteúdo com elevação e bordas arredondadas automáticas pelo Design System.")}>
              <Ionicons name="information-circle-outline" size={24} color="#DE3163" />
            </TouchableOpacity>
          </View>
          <View style={styles.starRow}>
            <Ionicons name="star" size={30} color="#FFD1DC" />
            <Ionicons name="star" size={30} color="#FFD1DC" />
            <Ionicons name="star" size={30} color="#FFD1DC" />
            <Ionicons name="star-half" size={30} color="#FFD1DC" />
          </View>
        </Card>

        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <Text category='h6' style={{ color: '#DE3163' }}>Gaming Vibe</Text>
            <TouchableOpacity onPress={() => showInfo("Aqui usamos o componente 'Text' com categorias de tipografia (h6) e o sistema de cores customizado via style.")}>
              <Ionicons name="information-circle-outline" size={24} color="#DE3163" />
            </TouchableOpacity>
          </View>
          <Text style={styles.gameItem}>• Minecraft ⛏️</Text>
          <Text style={styles.gameItem}>• Stardew Valley 🌾</Text>
          <Text style={styles.gameItem}>• Animal Crossing 🍎</Text>
        </Card>

        <Modal
          transparent={true}
          visible={visible}
          animationType="fade"
          onRequestClose={() => setVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text category='h6' style={{ marginBottom: 10 }}>Explicação Técnica 🤓</Text>
              <Text style={{ textAlign: 'center', marginBottom: 20 }}>{explanation}</Text>
              <Button status='danger' onPress={() => setVisible(false)} style={{ borderRadius: 20 }}>
                Entendi!
              </Button>
            </View>
          </View>
        </Modal>

      </ScrollView>
    </Layout>
  );
}

import { TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' }, // Fundo Preto
  content: { padding: 25, paddingTop: 60 },
  header: { alignItems: 'center', marginBottom: 30 },
  avatar: { marginBottom: 10, borderWidth: 3, borderColor: '#DE3163' }, // Borda Cereja
  title: { color: '#FFD1DC', fontFamily: 'System' }, // Rosa Iogurte
  subtitle: { color: '#888', marginTop: 5 },
  card: { borderRadius: 20, marginBottom: 20, backgroundColor: '#1A1A1A', borderColor: '#333' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  starRow: { flexDirection: 'row', justifyContent: 'center', gap: 10 },
  gameItem: { color: '#FFF', marginVertical: 4, fontSize: 16 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '80%', backgroundColor: 'white', padding: 25, borderRadius: 30, alignItems: 'center' }
});