// src/screens/HomeScreen.tsx
// Lista de productos de las concesiones con pull-to-refresh y acceso a Create / Edit.

import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import { useConcessions } from '../hooks/useConcessions';
import type { ConcessionItem } from '../types';
import type { RootStackParamList } from '../navigation/types';

type HomeNavProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

// ──────────────────────────────────────────────
// PANTALLA
// ──────────────────────────────────────────────

export function HomeScreen(): React.JSX.Element {
  const navigation = useNavigation<HomeNavProp>();
  const { data, isLoading, isError, isFetching, refetch } = useConcessions();

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.accent} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No se pudo cargar la lista</Text>
        <Pressable style={styles.retryBtn} onPress={() => void refetch()}>
          <Text style={styles.retryText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.content}
      data={data ?? []}
      keyExtractor={(item) => item.id}
      refreshing={isFetching && !isLoading}
      onRefresh={refetch}
      ListEmptyComponent={<Text style={styles.empty}>No hay productos aún</Text>}
      ListHeaderComponent={
        data?.length ? <Text style={styles.count}>{data.length} productos</Text> : null
      }
      renderItem={({ item }) => (
        <ItemRow
          item={item}
          onPress={() => navigation.navigate('Edit', { id: item.id, name: item.name })}
        />
      )}
    />
  );
}

// ──────────────────────────────────────────────
// SUB-COMPONENTE: fila de producto
// ──────────────────────────────────────────────

interface ItemRowProps {
  item: ConcessionItem;
  onPress: () => void;
}

function ItemRow({ item, onPress }: ItemRowProps): React.JSX.Element {
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <View style={styles.rowLeft}>
        <View style={styles.avatar}>
          <Text style={styles.avatarLetter}>{item.name.charAt(0).toUpperCase()}</Text>
        </View>
        <View style={styles.rowText}>
          <Text style={styles.rowTitle} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.rowSub} numberOfLines={1}>
            ${item.price} · {item.type}
          </Text>
        </View>
      </View>
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

// ──────────────────────────────────────────────
// ESTILOS
// ──────────────────────────────────────────────

const styles = StyleSheet.create({
  list: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.lg, gap: SPACING.sm, paddingBottom: SPACING.xxl },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.md,
    backgroundColor: COLORS.background,
  },
  errorText: { ...TYPOGRAPHY.h3, color: COLORS.errorLight },
  retryBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.sm,
  },
  retryText: { ...TYPOGRAPHY.body, fontWeight: '600', color: COLORS.text },
  empty: { ...TYPOGRAPHY.caption, textAlign: 'center', marginTop: SPACING.xxl },
  count: { ...TYPOGRAPHY.label, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: SPACING.sm },
  row: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, flex: 1 },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetter: { ...TYPOGRAPHY.h3, color: COLORS.accent },
  rowText: { flex: 1 },
  rowTitle: { ...TYPOGRAPHY.body, fontWeight: '600' },
  rowSub: { ...TYPOGRAPHY.caption },
  chevron: { fontSize: 20, color: COLORS.textMuted, marginLeft: SPACING.sm },
});
