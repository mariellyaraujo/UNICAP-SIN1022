import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Modal, TouchableOpacity, Image } from 'react-native';
import { Layout, Text, Card, Button, ProgressBar, Divider } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';

export default function ExploreScreen() {
  const [visible, setVisible] = useState(false);
  const [explanation, setExplanation] = useState('');

  const showInfo = (text: string) => {
    setExplanation(text);
    setVisible(true);
  };

  return (
    <Layout style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        
        <Text category='h2' style={styles.mainTitle}>Inventory 🎒</Text>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text category='s1' style={{ color: '#FFD1DC' }}>Nível de Fazendeira: 99</Text>
            <TouchableOpacity onPress={() => showInfo("O 'ProgressBar' do UI Kitten é usado aqui. Ele aceita uma prop 'progress' (0 a 1) e 'status'. Customizamos a cor para Rosa Iogurte via style.")}>
              <Ionicons name="help-circle-outline" size={22} color="#FFD1DC" />
            </TouchableOpacity>
          </View>
          <ProgressBar progress={0.8} style={styles.progressBar} />
          <Text appearance='hint' style={styles.xpText}>850/1000 XP para o próximo nível</Text>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text category='h6' style={{ color: '#DE3163' }}>Itens Coletados</Text>
            <TouchableOpacity onPress={() => showInfo("Aqui demonstramos o 'Layout' como um container flexível (flexDirection: row) para criar uma grade de 'Cards' pequenos e repetíveis.")}>
              <Ionicons name="help-circle-outline" size={22} color="#DE3163" />
            </TouchableOpacity>
          </View>

          <View style={styles.inventoryGrid}>
            <Card style={styles.itemSlot}>
              <Text style={styles.iconPixel}>🍒</Text>
              <Text category='c1' style={styles.itemLabel}>Cereja</Text>
            </Card>
            <Card style={styles.itemSlot}>
              <Text style={styles.iconPixel}>⭐</Text>
              <Text category='c1' style={styles.itemLabel}>Estrela</Text>
            </Card>
            <Card style={styles.itemSlot}>
              <Text style={styles.iconPixel}>💎</Text>
              <Text category='c1' style={styles.itemLabel}>Diamante</Text>
            </Card>
          </View>
        </View>

        <View style={styles.section}>
           <View style={styles.sectionHeader}>
            <Text category='h6' style={{ color: '#FFD1DC' }}>Ações do Kit</Text>
            <TouchableOpacity onPress={() => showInfo("Demonstração das variações do componente 'Button': 'filled' (padrão), 'outline' (apenas borda) e 'ghost' (apenas texto).")}>
              <Ionicons name="help-circle-outline" size={22} color="#FFD1DC" />
            </TouchableOpacity>
          </View>
          <Button status='primary' style={styles.actionBtn}>Vender Itens 💰</Button>
          <Button appearance='outline' status='control' style={styles.actionBtn}>Organizar Baú 📦</Button>
          <Button appearance='ghost' status='danger' style={styles.actionBtn}>Descartar Tudo 🗑️</Button>
        </View>

        <Modal
          transparent={true}
          visible={visible}
          animationType="slide"
          onRequestClose={() => setVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Ionicons name="code-working" size={40} color="#DE3163" />
              <Text category='h6' style={styles.modalTitle}>Por dentro do UI Kitten</Text>
              <Text style={styles.modalText}>{explanation}</Text>
              <Button status='danger' onPress={() => setVisible(false)} style={styles.modalCloseBtn}>
                FECHAR
              </Button>
            </View>
          </View>
        </Modal>

      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' }, // Preto Total
  content: { padding: 25, paddingTop: 60 },
  mainTitle: { color: '#FFD1DC', marginBottom: 30, textAlign: 'center', fontFamily: 'System' },
  section: { marginBottom: 30 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  progressBar: { height: 16, borderRadius: 8, backgroundColor: '#333', borderColor: 'transparent' },
  xpText: { fontSize: 12, marginTop: 8, textAlign: 'right' },
  divider: { backgroundColor: '#333', marginVertical: 10 },
  inventoryGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  itemSlot: { flex: 1, marginHorizontal: 5, alignItems: 'center', backgroundColor: '#1A1A1A', borderRadius: 15, borderColor: '#DE3163' },
  iconPixel: { fontSize: 30, marginBottom: 5 },
  itemLabel: { color: '#FFF' },
  actionBtn: { marginVertical: 6, borderRadius: 12 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '85%', backgroundColor: '#FFF', padding: 30, borderRadius: 35, alignItems: 'center' },
  modalTitle: { marginVertical: 15, color: '#000' },
  modalText: { textAlign: 'center', color: '#444', lineHeight: 22, marginBottom: 20 },
  modalCloseBtn: { width: '100%', borderRadius: 15 }
});