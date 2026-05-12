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

import {
  useRouter,
  useLocalSearchParams,
  Stack,
} from 'expo-router';

import api from './../../src/services/api';
import { useTheme } from './../../src/context/ThemeContext';

export default function CriarExperiencia() {
  const router = useRouter();

  const { pessoaId } =
    useLocalSearchParams();

  const { theme, isDark } =
    useTheme();

  const [form, setForm] =
    useState({
      cargo: '',
      empresa: '',
    });

  const handleSalvar = async () => {
    if (
      !form.cargo ||
      !form.empresa
    ) {
      Alert.alert(
        'Campos obrigatórios',
        'Preencha todos os campos.'
      );

      return;
    }

    if (!pessoaId) {
      Alert.alert(
        'Erro',
        'ID do perfil não encontrado.'
      );

      return;
    }

    const payload = {
      cargo: form.cargo,

      empresa: form.empresa,

      pessoaId: String(
        pessoaId
      ),
    };

    try {
      await api.post(
        '/experiencias',
        payload
      );

      router.back();
    } catch (err) {
      Alert.alert(
        'Erro',
        'Falha ao salvar experiência.'
      );
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={
        false
      }
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
          title:
            'Nova Experiência',

          headerShadowVisible:
            false,

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
              color:
                theme.primary,
            },
          ]}
        >
          ✨ work experience
        </Text>

        <Text
          style={[
            styles.title,
            {
              color:
                theme.text,
            },
          ]}
        >
          Nova experiência
        </Text>

        <Text
          style={[
            styles.subtitle,
            {
              color:
                theme.text,
            },
          ]}
        >
          Adicione experiências
          profissionais ao perfil.
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
        <View
          style={styles.inputGroup}
        >
          <Text
            style={[
              styles.label,
              {
                color:
                  theme.primary,
              },
            ]}
          >
            Cargo
          </Text>

          <TextInput
            style={[
              styles.input,
              {
                backgroundColor:
                  isDark
                    ? '#181818'
                    : '#f6f6f6',

                color:
                  theme.text,
              },
            ]}
            value={form.cargo}
            onChangeText={(t) =>
              setForm({
                ...form,
                cargo: t,
              })
            }
            placeholder="Ex: Front-end Developer"
            placeholderTextColor="#8e8e8e"
          />
        </View>

        <View
          style={styles.inputGroup}
        >
          <Text
            style={[
              styles.label,
              {
                color:
                  theme.primary,
              },
            ]}
          >
            Empresa
          </Text>

          <TextInput
            style={[
              styles.input,
              {
                backgroundColor:
                  isDark
                    ? '#181818'
                    : '#f6f6f6',

                color:
                  theme.text,
              },
            ]}
            value={form.empresa}
            onChangeText={(t) =>
              setForm({
                ...form,
                empresa: t,
              })
            }
            placeholder="Ex: Google"
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
          Salvar Experiência
        </Text>
      </TouchableOpacity>

      <View
        style={{ height: 120 }}
      />
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