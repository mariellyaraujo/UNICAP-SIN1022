import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function ModalScreen() {
  const router = useRouter();

  return (
    <View style={styles.overlay}>
      <Pressable style={styles.dismissArea} onPress={() => router.back()} />
      
      <View style={styles.modalCard}>
        <Text style={styles.title}>Mais sobre mim</Text>
        <View style={styles.separator} />
        <Text style={styles.content}>
          Atualmente sou analista desenvolvedora Salesforce Marketing Cloud,
          focada em criar soluções personalizadas e automações eficientes!
        </Text>
        
        <Pressable style={styles.closeButton} onPress={() => router.back()}>
          <Text style={styles.closeButtonText}>Fechar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  dismissArea: {
    ...StyleSheet.absoluteFillObject,
  },
  modalCard: { 
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    elevation: 5,
  },
  title: { 
    fontSize: 22, 
    fontWeight: 'bold',
    color: '#D87093' 
  },
  separator: { 
    height: 1, 
    width: '80%', 
    backgroundColor: '#eee', 
    marginVertical: 15 
  },
  content: { 
    fontSize: 16, 
    textAlign: 'center',
    color: '#333'
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#D87093',
    borderRadius: 8
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});