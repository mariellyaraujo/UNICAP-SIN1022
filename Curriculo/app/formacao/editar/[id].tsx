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

export default function EditarFormacao() {
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
      curso: '',
      instituicao: '',
      ano_conclusao: '',
    });

  const carregarFormacao =
    async () => {
      try {
        const response =
          await api.get(
            `/formacoes/${id}`
          );

        setForm({
          curso:
            response.data.curso || '',

          instituicao:
            response.data
              .instituicao || '',

          ano_conclusao:
            response.data
              .ano_conclusao ||
            '',
        });
      } catch (err) {
        Alert.alert(
          'Erro',
          'Falha ao carregar formação.'
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    carregarFormacao();
  }, []);

  const handleSalvar =
    async () => {
      if (
        !form.curso ||
        !form.instituicao
      ) {
        Alert.alert(
          'Campos obrigatórios',
          'Preencha curso e instituição.'
        );

        return;
      }

      try {
        await api.put(
          `/formacoes/${id}`,
          form
        );

        router.back();
      } catch (err) {
        Alert.alert(
          'Erro',
          'Falha ao atualizar formação.'
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
            'Editar Formação',

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
          ✨ academic info
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
          Editar formação
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
          Atualize os dados
          acadêmicos.
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
            Curso
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
            value={form.curso}
            onChangeText={(t) =>
              setForm({
                ...form,
                curso: t,
              })
            }
            placeholder="Ex: Ciência da Computação"
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
            Instituição
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
            value={
              form.instituicao
            }
            onChangeText={(t) =>
              setForm({
                ...form,
                instituicao: t,
              })
            }
            placeholder="Ex: UNICAP"
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
            Ano de conclusão
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
            value={
              form.ano_conclusao
            }
            onChangeText={(t) =>
              setForm({
                ...form,
                ano_conclusao: t,
              })
            }
            placeholder="Ex: 2027"
            placeholderTextColor="#8e8e8e"
            keyboardType="numeric"
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