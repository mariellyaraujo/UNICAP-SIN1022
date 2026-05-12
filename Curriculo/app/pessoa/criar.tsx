import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

import { useRouter, Stack } from 'expo-router';

import api from './../../src/services/api';
import { useTheme } from './../../src/context/ThemeContext';

export default function CriarPessoa() {
  const router = useRouter();

  const { theme, isDark } = useTheme();

  const [form, setForm] = useState({
    nome: '',
    email: '',
    resumo: '',
  });

  const handleSalvar = async () => {
    if (!form.nome || !form.email) {
      Alert.alert(
        'Campos obrigatórios',
        'Preencha nome e email.'
      );

      return;
    }

    try {
      await api.post('/pessoas', form);

      router.back();
    } catch (error) {
      Alert.alert(
        'Erro',
        'Não foi possível criar o perfil.'
      );
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[
        styles.container,
        {
          backgroundColor:
            theme.background,
        },
      ]}
    >
      <Stack.Screen
        options={{
          title: 'Novo Perfil',

          headerShadowVisible: false,

          headerStyle: {
            backgroundColor:
              theme.background,
          },

          headerTintColor:
            theme.text,

          headerTitleStyle: {
            fontWeight: '700',
          },
        }}
      />

      <View style={styles.header}>
        <Text
          style={[
            styles.smallTitle,
            {
              color: theme.primary,
            },
          ]}
        >
          ✨ create profile
        </Text>

        <Text
          style={[
            styles.title,
            {
              color: theme.text,
            },
          ]}
        >
          Criar perfil
        </Text>

        <Text
          style={[
            styles.subtitle,
            {
              color: theme.text,
            },
          ]}
        >
          Adicione um novo currículo
          de forma simples e bonita.
        </Text>
      </View>

      <View
        style={[
          styles.formCard,
          {
            backgroundColor:
              theme.card,
          },
        ]}
      >
        <View style={styles.inputGroup}>
          <Text
            style={[
              styles.label,
              {
                color: theme.primary,
              },
            ]}
          >
            Nome completo
          </Text>

          <TextInput
            style={[
              styles.input,
              {
                backgroundColor:
                  isDark
                    ? '#181818'
                    : '#f6f6f6',

                color: theme.text,
              },
            ]}
            value={form.nome}
            onChangeText={(t) =>
              setForm({
                ...form,
                nome: t,
              })
            }
            placeholder="Ex: Maria Oliveira"
            placeholderTextColor="#8e8e8e"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text
            style={[
              styles.label,
              {
                color: theme.primary,
              },
            ]}
          >
            E-mail
          </Text>

          <TextInput
            style={[
              styles.input,
              {
                backgroundColor:
                  isDark
                    ? '#181818'
                    : '#f6f6f6',

                color: theme.text,
              },
            ]}
            value={form.email}
            onChangeText={(t) =>
              setForm({
                ...form,
                email: t,
              })
            }
            keyboardType="email-address"
            placeholder="Ex: maria@email.com"
            placeholderTextColor="#8e8e8e"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text
            style={[
              styles.label,
              {
                color: theme.primary,
              },
            ]}
          >
            Resumo profissional
          </Text>

          <TextInput
            style={[
              styles.input,
              styles.textArea,
              {
                backgroundColor:
                  isDark
                    ? '#181818'
                    : '#f6f6f6',

                color: theme.text,
              },
            ]}
            value={form.resumo}
            onChangeText={(t) =>
              setForm({
                ...form,
                resumo: t,
              })
            }
            multiline
            textAlignVertical="top"
            placeholder="Conte um pouco sobre você..."
            placeholderTextColor="#8e8e8e"
          />
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.85}
        style={[
          styles.btn,
          {
            backgroundColor:
              theme.primary,
          },
        ]}
        onPress={handleSalvar}
      >
        <Text
          style={[
            styles.btnText,
            {
              color: isDark
                ? '#000'
                : '#fff',
            },
          ]}
        >
          Criar Perfil
        </Text>
      </TouchableOpacity>

      <View style={{ height: 120 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 24,
  },

  header: {
    marginBottom: 28,
  },

  smallTitle: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 8,
  },

  title: {
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: -1,
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 24,
    opacity: 0.55,
  },

  formCard: {
    borderRadius: 30,
    padding: 20,
    marginBottom: 28,
  },

  inputGroup: {
    marginBottom: 22,
  },

  label: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 10,
    marginLeft: 4,
  },

  input: {
    borderRadius: 18,
    paddingHorizontal: 18,
    height: 58,
    fontSize: 15,
  },

  textArea: {
    height: 130,
    paddingTop: 18,
  },

  btn: {
    height: 58,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnText: {
    fontSize: 16,
    fontWeight: '700',
  },
});