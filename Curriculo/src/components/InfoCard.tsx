import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Trash2, Edit } from 'lucide-react-native';

interface InfoCardProps {
  title: string;
  subtitle: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const InfoCard = ({ title, subtitle, onEdit, onDelete }: InfoCardProps) => {
  const { theme } = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: theme.card, borderLeftColor: theme.primary }]}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
        <Text style={[styles.subtitle, { color: theme.text, opacity: 0.7 }]}>{subtitle}</Text>
      </View>
      <View style={styles.actions}>
        {onEdit && <TouchableOpacity onPress={onEdit} style={styles.btn}><Edit size={20} color={theme.primary} /></TouchableOpacity>}
        {onDelete && <TouchableOpacity onPress={onDelete} style={styles.btn}><Trash2 size={20} color="#ff4444" /></TouchableOpacity>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { padding: 15, marginBottom: 10, borderRadius: 10, borderLeftWidth: 5, flexDirection: 'row', alignItems: 'center', elevation: 3 },
  title: { fontSize: 16, fontWeight: 'bold' },
  subtitle: { fontSize: 14 },
  actions: { flexDirection: 'row' },
  btn: { marginLeft: 15 }
});