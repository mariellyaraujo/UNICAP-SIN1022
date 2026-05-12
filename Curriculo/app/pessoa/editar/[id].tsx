import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView
} from 'react-native';

import {
  useLocalSearchParams,
  useRouter,
  Stack
} from 'expo-router';

import api from './../../../src/services/api';

import { useTheme } from './../../../src/context/ThemeContext';

import {
  Moon,
  Sun
} from 'lucide-react-native';

export default function EditarPessoa() {
  const { id } = useLocalSearchParams();

  const router = useRouter();

  const {
    theme,
    isDark,
    toggleTheme
  } = useTheme();

  const [nome, setNome] =
    useState('');

  const [email, setEmail] =
    useState('');

  const [resumo, setResumo] =
    useState('');

  const [loading, setLoading] =
    useState(true);

  const carregarPessoa =
    async () => {
      try {
        const response =
          await api.get(
            `/pessoas/${id}`
          );

        setNome(response.data.nome);
        setEmail(response.data.email);
        setResumo(
          response.data.resumo || ''
        );
      } catch (error) {
        Alert.alert(
          'Erro',
          'Não foi possível carregar.'
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    carregarPessoa();
  }, []);

  const handleSalvar =
    async () => {
      try {
        await api.put(
          `/pessoas/${id}`,
          {
            nome,
            email,
            resumo
          }
        );

        Alert.alert(
          'Sucesso',
          'Perfil atualizado!'
        );

        router.back();
      } catch (error) {
        Alert.alert(
          'Erro',
          'Não foi possível salvar.'
        );
      }
    };

  if (loading) {
    return (
      <View
        style={[
          styles.loading,
          {
            backgroundColor:
              theme.background
          }
        ]}
      >
        <ActivityIndicator
          size="large"
          color={theme.primary}
        />
      </View>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={
        false
      }
      style={[
        styles.container,
        {
          backgroundColor:
            theme.background
        }
      ]}
    >
      <Stack.Screen
        options={{
          title: '',

          headerShadowVisible: false,

          headerStyle: {
            backgroundColor:
              theme.background
          },

          headerTintColor:
            theme.text,

          headerRight: () => (
            <TouchableOpacity
              onPress={toggleTheme}
              style={[
                styles.themeBtn,
                {
                  backgroundColor:
                    theme.card
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
          )
        }}
      />

      <Text
        style={[
          styles.smallTitle,
          {
            color: theme.primary
          }
        ]}
      >
        ✨ edit
      </Text>

      <Text
        style={[
          styles.title,
          {
            color: theme.text
          }
        ]}
      >
        Editar Perfil
      </Text>

      <Text
        style={[
          styles.subtitle,
          {
            color: theme.text
          }
        ]}
      >
        Atualize as informações
      </Text>

      <View style={styles.form}>
        <View>
          <Text
            style={[
              styles.label,
              {
                color: theme.text
              }
            ]}
          >
            Nome
          </Text>

          <TextInput
            value={nome}
            onChangeText={setNome}
            placeholder="Nome"
            placeholderTextColor={
              isDark
                ? '#777'
                : '#999'
            }
            style={[
              styles.input,
              {
                backgroundColor:
                  theme.card,
                color: theme.text
              }
            ]}
          />
        </View>

        <View>
          <Text
            style={[
              styles.label,
              {
                color: theme.text
              }
            ]}
          >
            Email
          </Text>

          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor={
              isDark
                ? '#777'
                : '#999'
            }
            style={[
              styles.input,
              {
                backgroundColor:
                  theme.card,
                color: theme.text
              }
            ]}
          />
        </View>

        <View>
          <Text
            style={[
              styles.label,
              {
                color: theme.text
              }
            ]}
          >
            Resumo
          </Text>

          <TextInput
            value={resumo}
            onChangeText={setResumo}
            placeholder="Resumo"
            multiline
            placeholderTextColor={
              isDark
                ? '#777'
                : '#999'
            }
            style={[
              styles.textarea,
              {
                backgroundColor:
                  theme.card,
                color: theme.text
              }
            ]}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          style={[
            styles.saveBtn,
            {
              backgroundColor:
                theme.primary
            }
          ]}
          onPress={handleSalvar}
        >
          <Text
            style={[
              styles.saveText,
              {
                color: isDark
                  ? '#000'
                  : '#fff'
              }
            ]}
          >
            Salvar Alterações
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{ height: 80 }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 20,
  },

  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  themeBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginBottom: 34,
  },

  form: {
    gap: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
  },

  input: {
    height: 58,
    borderRadius: 20,
    paddingHorizontal: 18,
    fontSize: 15,
  },

  textarea: {
    minHeight: 140,
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 18,
    fontSize: 15,
    textAlignVertical: 'top',
  },

  saveBtn: {
    height: 58,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },

  saveText: {
    fontSize: 15,
    fontWeight: '700',
  },
});