import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  KeyboardAvoidingView, 
  Platform, 
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

export default function App() {
  const [idade, setIdade] = useState('');
  const [dia, setDia] = useState('');
  const [mes, setMes] = useState('');
  const [anoNascimento, setAnoNascimento] = useState<number | null>(null);

  useEffect(() => {
    if (idade && dia && mes) {
      const hoje = new Date();
      const anoAtual = hoje.getFullYear();
      const mesAtual = hoje.getMonth() + 1;
      const diaAtual = hoje.getDate();

      let anoCalculado = anoAtual - parseInt(idade);

      if (parseInt(mes) > mesAtual || (parseInt(mes) === mesAtual && parseInt(dia) > diaAtual)) {
        anoCalculado--;
      }

      setAnoNascimento(anoCalculado);
    } else {
      setAnoNascimento(null);
    }
  }, [idade, dia, mes]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.inner}
        >
          <View style={styles.card}>
            <Text style={styles.title}>Calculadora Ano Nascimento</Text>
            <Text style={styles.subtitle}>Descubra seu ano de nascimento</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Sua Idade</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 25"
                keyboardType="numeric"
                value={idade}
                onChangeText={setIdade}
              />

              <Text style={styles.label}>Dia de Nascimento</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 15"
                keyboardType="numeric"
                value={dia}
                onChangeText={setDia}
              />

              <Text style={styles.label}>Mês de Nascimento</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 08"
                keyboardType="numeric"
                value={mes}
                onChangeText={setMes}
              />
            </View>

            {anoNascimento && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Você nasceu em:</Text>
                <Text style={styles.resultValue}>{anoNascimento}</Text>
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE4E1',
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 30,
    padding: 30,
    width: '100%',
    shadowColor: '#FFB6C1',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 5,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF69B4',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#DB7093',
    marginBottom: 25,
  },
  inputGroup: {
    width: '100%',
  },
  label: {
    color: '#410023',
    fontWeight: '600',
    marginBottom: 5,
    marginLeft: 5,
  },
  input: {
    backgroundColor: '#FFF0F5',
    borderWidth: 1,
    borderColor: '#FFC0CB',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#410023',
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF0F5',
    borderRadius: 20,
    width: '100%',
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: '#FF69B4',
  },
  resultLabel: {
    fontSize: 16,
    color: '#DB7093',
  },
  resultValue: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FF69B4',
  },
});