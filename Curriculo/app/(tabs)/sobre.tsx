import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import { useTheme } from '../../src/context/ThemeContext';

import {
  Sun,
  Moon,
  Code2,
  Rocket,
  Heart
} from 'lucide-react-native';

export default function Sobre() {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[
        styles.container,
        { backgroundColor: theme.background }
      ]}
    >
      <View style={styles.header}>
        <View>
          <Text
            style={[
              styles.smallTitle,
              { color: theme.primary }
            ]}
          >
            ✨ about
          </Text>

          <Text
            style={[
              styles.title,
              { color: theme.text }
            ]}
          >
            Sobre o App
          </Text>

          <Text
            style={[
              styles.subtitle,
              { color: theme.text }
            ]}
          >
            Minimalista, moderno e fofinho
          </Text>
        </View>

        <TouchableOpacity
          onPress={toggleTheme}
          style={[
            styles.themeBtn,
            {
              backgroundColor: theme.card
            }
          ]}
        >
          {isDark ? (
            <Sun
              color={theme.primary}
              size={20}
            />
          ) : (
            <Moon
              color={theme.primary}
              size={20}
            />
          )}
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.card
          }
        ]}
      >
        <View
          style={[
            styles.iconBox,
            {
              backgroundColor:
                'rgba(210, 31, 60, 0.12)'
            }
          ]}
        >
          <Code2
            color={theme.primary}
            size={24}
          />
        </View>

        <Text
          style={[
            styles.cardTitle,
            { color: theme.text }
          ]}
        >
          Tecnologias
        </Text>

        <Text
          style={[
            styles.cardText,
            { color: theme.text }
          ]}
        >
          Construído com React Native,
          Expo Router e Axios para uma
          experiência leve e moderna.
        </Text>
      </View>

      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.card
          }
        ]}
      >
        <View
          style={[
            styles.iconBox,
            {
              backgroundColor:
                'rgba(210, 31, 60, 0.12)'
            }
          ]}
        >
          <Rocket
            color={theme.primary}
            size={24}
          />
        </View>

        <Text
          style={[
            styles.cardTitle,
            { color: theme.text }
          ]}
        >
          Funcionalidades
        </Text>

        <Text
          style={[
            styles.cardText,
            { color: theme.text }
          ]}
        >
          Dark mode dinâmico com visual
          clean, navegação suave e integração
          completa com API.
        </Text>
      </View>

      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.card,
            marginBottom: 50
          }
        ]}
      >
        <View
          style={[
            styles.iconBox,
            {
              backgroundColor:
                'rgba(210, 31, 60, 0.12)'
            }
          ]}
        >
          <Heart
            color={theme.primary}
            size={24}
          />
        </View>

        <Text
          style={[
            styles.cardTitle,
            { color: theme.text }
          ]}
        >
          Propósito
        </Text>

        <Text
          style={[
            styles.cardText,
            { color: theme.text }
          ]}
        >
          Projeto de portfólio integrado
          com backend Node.js hospedado
          na Vercel.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 70,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 34,
  },

  smallTitle: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 6,
  },

  title: {
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: -1,
  },

  subtitle: {
    fontSize: 15,
    opacity: 0.55,
    marginTop: 4,
  },

  themeBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    borderRadius: 28,
    padding: 22,
    marginBottom: 18,
  },

  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },

  cardText: {
    fontSize: 15,
    lineHeight: 24,
    opacity: 0.65,
  },
});