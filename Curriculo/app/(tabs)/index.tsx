import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

import { useRouter, useFocusEffect } from 'expo-router';
import api from './../../src/services/api';
import { useTheme } from './../../src/context/ThemeContext';
import { Moon, Sun, Plus } from 'lucide-react-native';

export default function Home() {
  const [pessoas, setPessoas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { theme, isDark, toggleTheme } = useTheme();

  const router = useRouter();

  const carregarPessoas = () => {
    setLoading(true);

    api
      .get('/pessoas')
      .then((res) => setPessoas(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useFocusEffect(
    React.useCallback(() => {
      carregarPessoas();
    }, [])
  );

  if (loading) {
    return (
      <View
        style={[
          styles.loading,
          { backgroundColor: theme.background }
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
    <View
      style={[
        styles.container,
        { backgroundColor: theme.background }
      ]}
    >
      <View style={styles.header}>
        <View>
          <Text
            style={[
              styles.title,
              { color: theme.text }
            ]}
          >
            Currículos
          </Text>

          <Text
            style={[
              styles.subtitle,
              { color: theme.text }
            ]}
          >
            Seus perfis salvos ✨
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

      <FlatList
        data={pessoas}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{
          paddingBottom: 120
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.card,
              {
                backgroundColor: theme.card
              }
            ]}
            onPress={() =>
              router.push(`/pessoa/${item.id}`)
            }
          >
            <View
              style={[
                styles.avatar,
                {
                  backgroundColor:
                    'rgba(210, 31, 60, 0.12)'
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
                {item.nome?.charAt(0)}
              </Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.cardTitle,
                  { color: theme.text }
                ]}
              >
                {item.nome}
              </Text>

              <Text
                style={[
                  styles.cardEmail,
                  { color: theme.text }
                ]}
              >
                {item.email}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        activeOpacity={0.85}
        style={[
          styles.fab,
          {
            backgroundColor: theme.primary
          }
        ]}
        onPress={() =>
          router.push('/pessoa/criar')
        }
      >
        <Plus
          color={isDark ? '#000' : '#fff'}
          size={28}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 70,
  },

  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 24,
    marginBottom: 16,
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },

  avatarText: {
    fontSize: 22,
    fontWeight: '700',
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },

  cardEmail: {
    fontSize: 14,
    opacity: 0.55,
  },

  fab: {
    position: 'absolute',
    right: 24,
    bottom: 34,
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});