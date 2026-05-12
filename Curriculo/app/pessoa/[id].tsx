import React, { useState } from 'react';

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';

import {
  useLocalSearchParams,
  Stack,
  useRouter,
  useFocusEffect
} from 'expo-router';

import api from './../../src/services/api';
import { useTheme } from './../../src/context/ThemeContext';

import {
  Sun,
  Moon,
  Plus,
  Trash2
} from 'lucide-react-native';

export default function PessoaDetalhes() {
  const { id } = useLocalSearchParams();

  const router = useRouter();

  const {
    theme,
    isDark,
    toggleTheme
  } = useTheme();

  const [data, setData] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const carregarDados = async () => {
    try {
      const response = await api.get(
        `/pessoas/${id}`
      );

      setData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      carregarDados();
    }, [id])
  );

  const handleDeleteItem = async (
    itemId: string,
    rota:
      | 'formacoes'
      | 'experiencias'
  ) => {
    try {
      await api.delete(
        `/${rota}/${itemId}`
      );

      setData((prev: any) => ({
        ...prev,
        [rota]: prev[rota].filter(
          (item: any) =>
            item.id !== itemId
        )
      }));
    } catch (error) {
      Alert.alert(
        'Erro',
        'Não foi possível deletar.'
      );
    }
  };

  const handleDeletePessoa = () => {
    Alert.alert(
      'Atenção',
      'Deseja excluir este perfil?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await api.delete(
                `/pessoas/${id}`
              );

              router.replace('/');
            } catch (error) {
              Alert.alert(
                'Erro',
                'Não foi possível excluir.'
              );
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <View
        style={[
          styles.loadingCenter,
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

  if (!data) return null;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
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

      <View style={styles.headerSection}>
        <View
          style={[
            styles.avatar,
            {
              backgroundColor:
                'rgba(210,31,60,0.12)'
            }
          ]}
        >
          <Text
            style={[
              styles.avatarText,
              {
                color: theme.primary
              }
            ]}
          >
            {data.nome?.charAt(0)}
          </Text>
        </View>

        <Text
          style={[
            styles.smallTitle,
            {
              color: theme.primary
            }
          ]}
        >
          ✨ profile
        </Text>

        <Text
          style={[
            styles.name,
            {
              color: theme.text
            }
          ]}
        >
          {data.nome}
        </Text>

        <Text
          style={[
            styles.email,
            {
              color: theme.text
            }
          ]}
        >
          {data.email}
        </Text>

        <View style={styles.mainActions}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={[
              styles.btnPrimary,
              {
                backgroundColor:
                  theme.primary
              }
            ]}
            onPress={() =>
              router.push(
                `/pessoa/editar/${id}`
              )
            }
          >
            <Text
              style={[
                styles.btnText,
                {
                  color: isDark
                    ? '#000'
                    : '#fff'
                }
              ]}
            >
              Editar Perfil
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.btnDanger}
            onPress={
              handleDeletePessoa
            }
          >
            <Trash2
              color="#ff4444"
              size={20}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: theme.text
            }
          ]}
        >
          Formação
        </Text>

        <TouchableOpacity
          style={styles.btnAdd}
          onPress={() =>
            router.push({
              pathname:
                '/formacao/criar',
              params: {
                pessoaId: id
              }
            } as any)
          }
        >
          <Plus
            color={theme.primary}
            size={18}
          />
        </TouchableOpacity>
      </View>

      {data.formacoes?.map(
        (f: any) => (
          <View
            key={f.id}
            style={
              styles.rowContainer
            }
          >
            <View
              style={[
                styles.card,
                {
                  backgroundColor:
                    theme.card
                }
              ]}
            >
              <Text
                style={[
                  styles.cardTitle,
                  {
                    color:
                      theme.text
                  }
                ]}
              >
                {f.curso}
              </Text>

              <Text
                style={[
                  styles.cardSubtitle,
                  {
                    color:
                      theme.text
                  }
                ]}
              >
                {f.instituicao}
              </Text>

              <Text
                style={[
                  styles.cardFooter,
                  {
                    color:
                      theme.text
                  }
                ]}
              >
                {f.anoConclusao}
              </Text>
            </View>

            <TouchableOpacity
              style={
                styles.deleteButtonSide
              }
              onPress={() =>
                handleDeleteItem(
                  f.id,
                  'formacoes'
                )
              }
            >
              <Trash2
                color="#ff4444"
                size={18}
              />
            </TouchableOpacity>
          </View>
        )
      )}

      <View style={styles.sectionHeader}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: theme.text
            }
          ]}
        >
          Experiências
        </Text>

        <TouchableOpacity
          style={styles.btnAdd}
          onPress={() =>
            router.push({
              pathname:
                '/experiencia/criar',
              params: {
                pessoaId: id
              }
            } as any)
          }
        >
          <Plus
            color={theme.primary}
            size={18}
          />
        </TouchableOpacity>
      </View>

      {data.experiencias
        ?.filter(
          (e: any) =>
            !e.empresa?.includes(
              '[PROJETO]'
            )
        )
        .map((e: any) => (
          <View
            key={e.id}
            style={
              styles.rowContainer
            }
          >
            <View
              style={[
                styles.card,
                {
                  backgroundColor:
                    theme.card
                }
              ]}
            >
              <Text
                style={[
                  styles.cardTitle,
                  {
                    color:
                      theme.text
                  }
                ]}
              >
                {e.cargo}
              </Text>

              <Text
                style={[
                  styles.cardSubtitle,
                  {
                    color:
                      theme.text
                  }
                ]}
              >
                {e.empresa}
              </Text>
            </View>

            <TouchableOpacity
              style={
                styles.deleteButtonSide
              }
              onPress={() =>
                handleDeleteItem(
                  e.id,
                  'experiencias'
                )
              }
            >
              <Trash2
                color="#ff4444"
                size={18}
              />
            </TouchableOpacity>
          </View>
        ))}

      <View style={styles.sectionHeader}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: theme.text
            }
          ]}
        >
          Projetos
        </Text>

        <TouchableOpacity
          style={styles.btnAdd}
          onPress={() =>
            router.push({
              pathname:
                '/projeto/criar',
              params: {
                pessoaId: id
              }
            } as any)
          }
        >
          <Plus
            color={theme.primary}
            size={18}
          />
        </TouchableOpacity>
      </View>

      {data.experiencias
        ?.filter((e: any) =>
          e.empresa?.includes(
            '[PROJETO]'
          )
        )
        .map((e: any) => (
          <View
            key={e.id}
            style={
              styles.rowContainer
            }
          >
            <View
              style={[
                styles.card,
                {
                  backgroundColor:
                    theme.card
                }
              ]}
            >
              <Text
                style={[
                  styles.cardTitle,
                  {
                    color:
                      theme.text
                  }
                ]}
              >
                {e.cargo}
              </Text>

              <Text
                style={[
                  styles.cardSubtitle,
                  {
                    color:
                      theme.text
                  }
                ]}
              >
                {e.empresa
                  .replace(
                    '[PROJETO]',
                    ''
                  )
                  .trim()}
              </Text>
            </View>

            <TouchableOpacity
              style={
                styles.deleteButtonSide
              }
              onPress={() =>
                handleDeleteItem(
                  e.id,
                  'experiencias'
                )
              }
            >
              <Trash2
                color="#ff4444"
                size={18}
              />
            </TouchableOpacity>
          </View>
        ))}

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
    paddingTop: 20,
  },

  loadingCenter: {
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

  headerSection: {
    alignItems: 'center',
    marginBottom: 34,
    paddingTop: 10,
  },

  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },

  avatarText: {
    fontSize: 34,
    fontWeight: '700',
  },

  smallTitle: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 6,
  },

  name: {
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: -1,
    marginBottom: 6,
  },

  email: {
    fontSize: 15,
    opacity: 0.55,
    marginBottom: 26,
  },

  mainActions: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },

  btnPrimary: {
    flex: 1,
    height: 54,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnDanger: {
    width: 54,
    height: 54,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:
      'rgba(255,68,68,0.10)',
  },

  btnText: {
    fontSize: 15,
    fontWeight: '600',
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 16,
    marginTop: 8,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.5,
    marginRight: 8,
  },

  btnAdd: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:
      'rgba(210,31,60,0.10)',
  },

  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  card: {
    flex: 1,
    padding: 20,
    borderRadius: 24,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 6,
  },

  cardSubtitle: {
    fontSize: 14,
    opacity: 0.6,
    marginBottom: 8,
  },

  cardFooter: {
    fontSize: 13,
    opacity: 0.45,
  },

  deleteButtonSide: {
    width: 52,
    height: 52,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:
      'rgba(255,68,68,0.08)',
    marginLeft: 12,
  },
});