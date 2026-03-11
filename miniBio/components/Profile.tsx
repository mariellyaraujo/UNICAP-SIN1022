import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const fotoPerfil = require('../assets/marielly.png');

const Profile = () => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image 
          source={fotoPerfil} 
          style={styles.image} 
        />
      </View>
      <Text style={styles.name}>Marielly de Araújo</Text>
      <View style={styles.divider} />
      <Text style={styles.bio}>
        Analista Desenvolvedora Salesforce apaixonada por automação e tecnologia.{"\n"}
        Amo arte. 🎨
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#FFFFFF', 
    borderRadius: 30,
    margin: 20,
    shadowColor: "#D87093",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#FFF0F5',
  },
  imageContainer: {
    borderRadius: 80,
    padding: 5,
    backgroundColor: '#FFB6C1',
    marginBottom: 15,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D87093',
    letterSpacing: 1,
  },
  divider: {
    width: 40,
    height: 3,
    backgroundColor: '#FFB6C1',
    marginVertical: 15,
    borderRadius: 2,
  },
  bio: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    lineHeight: 24,
    fontStyle: 'italic',
  },
});

export default Profile;