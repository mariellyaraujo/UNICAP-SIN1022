import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Profile = () => {
  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: 'https://ibb.co/60nKphPY' }}
        style={styles.image} 
      />
      <Text style={styles.name}>Marielly de Araújo</Text>
      <Text style={styles.bio}>
        Analista Desenvolvedora Salesforce apaixonada por automação e tecnologia. 
        Amo arte.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF0F5', 
    borderRadius: 20,
    margin: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: '#FFB6C1', 
    marginBottom: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#D87093',
    marginBottom: 10,
  },
  bio: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    lineHeight: 22,
  },
});

export default Profile;