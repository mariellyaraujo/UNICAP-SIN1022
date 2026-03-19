import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';
import Profile from '../../components/Profile';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Profile />
      
      <Link href="/modal" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Ver mais detalhes</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF5F7' },
  button: { marginTop: 20, backgroundColor: '#D87093', padding: 15, borderRadius: 10 },
  buttonText: { color: 'white', fontWeight: 'bold' }
});