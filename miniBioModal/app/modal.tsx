import { View, Text, StyleSheet } from 'react-native';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mais sobre mim</Text>
      <View style={styles.separator} />
      <Text style={styles.content}>
        Atualmente sou analista desenvolvedora Salesforce Marketing Cloud,
        focada em criar soluções personalizadas e automações eficientes!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 20,
    backgroundColor: '#FFF' // Fundo branco para o modal
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
    marginVertical: 20 
  },
  content: { 
    fontSize: 16, 
    textAlign: 'center',
    lineHeight: 24,
    color: '#333'
  }
});