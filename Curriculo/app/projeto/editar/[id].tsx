import React, {
  useEffect,
  useState
} from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';

import {
  useRouter,
  useLocalSearchParams,
  Stack,
} from 'expo-router';

import api from './../../../src/services/api';

import {
  useTheme
} from './../../../src/context/ThemeContext';

export default function EditarProjeto() {
  const router = useRouter();

  const params = useLocalSearchParams();

const id = Array.isArray(params.id)
  ? params.id[0]
  : params.id;

  const { theme, isDark } =
    useTheme();

  const [loading, setLoading] =
    useState(true);

  const [form, setForm] =
    useState({
      nome: '',
      descricao: '',
    });

  const carregarProjeto =
    async () => {
      try {
        const response =
          await api.get(
            `/experiencias/${id}`
          );

        setForm({
          nome:
            response.data.cargo,

          descricao:
            response.data.empresa
              .replace(
                '[PROJETO]',
                ''
              )
              .trim(),
        });
      } catch (err) {
        Alert.alert(
          'Erro',
          'Falha ao carregar projeto.'
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    carregarProjeto();
  }, []);

  const handleSalvar =
    async () => {
      if (
        !form.nome ||
        !form.descricao
      ) {
        Alert.alert(
          'Campos obrigatórios',
          'Preencha todos os campos.'
        );

        return;
      }

      const payload = {
        cargo: form.nome,

        empresa: `[PROJETO] ${form.descricao}`,
      };

      try {
        await api.put(
          `/experiencias/${id}`,
          payload
        );

        router.back();
      } catch (err) {
        Alert.alert(
          'Erro',
          'Falha ao atualizar projeto.'
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
              theme.background,
          },
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
            theme.background,
        },
      ]}
    >
      <Stack.Screen
        options={{
          title:
            'Editar Projeto',

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
          ✨ edit project
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
          Editar projeto
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
          Atualize as informações
          do projeto.
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
            Nome do projeto
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
            value={form.nome}
            onChangeText={(t) =>
              setForm({
                ...form,
                nome: t,
              })
            }
            placeholder="Ex: App de Portfólio"
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
            Descrição
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

                color:
                  theme.text,
              },
            ]}
            value={form.descricao}
            onChangeText={(t) =>
              setForm({
                ...form,
                descricao: t,
              })
            }
            multiline
            textAlignVertical="top"
            placeholder="Conte sobre o projeto..."
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
          Salvar Alterações
        </Text>
      </TouchableOpacity>

      <View
        style={{ height: 120 }}
      />
    </ScrollView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 22,
      paddingTop: 24,
    },

    loading: {
      flex: 1,
      justifyContent:
        'center',
      alignItems: 'center',
    },

    header: {
      marginBottom: 28,
    },

    smallTitle: {
      fontSize: 13,
      fontWeight: '700',
      textTransform:
        'uppercase',
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
      justifyContent:
        'center',
      alignItems: 'center',
    },

    btnText: {
      fontSize: 16,
      fontWeight: '700',
    },
  });