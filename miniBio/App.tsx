import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Profile from './components/Profile';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    'Minecraft': require('./assets/fonts/Minecraft.ttf'),
  });

  const onLayoutRootView = async () => {
    if (loaded || error) {
      await SplashScreen.hideAsync();
    }
  };

  if (!loaded && !error) {
    return null;
  }
  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>
            App criado para a disciplina{"\n"}
            <Text style={styles.highlight}>Programação para Dispositivos Móveis</Text>
          </Text>
        </View>
        <Profile />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F7',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  header: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'Minecraft',
    fontSize: 14,
    color: '#5b0101',
    textAlign: 'center',
    lineHeight: 22,
  },
  highlight: {
    fontFamily: 'Minecraft',
    fontSize: 18,
    color: '#D87093',
  },
});