import React, { useEffect, useRef } from 'react';
import { Animated, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProgressBar } from '../components/ProgressBar';
import { useConcessionsStore } from '../store/concessionsStore';
import { COLORS, SPACING } from '../theme';
import { stockProgress } from '../types';
import { formatPrice } from '../utils/format';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export function DetailScreen({ route }: Props): React.JSX.Element {
  const { itemId } = route.params;
  const item = useConcessionsStore((state) => state.items.find((i) => i.id === itemId));

  const opacityAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacityAnim, translateYAnim]);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View
          style={[
            styles.animatedBlock,
            { opacity: opacityAnim, transform: [{ translateY: translateYAnim }] },
          ]}
        >
          {item ? (
            <>
              <View style={styles.card}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>{formatPrice(item.price)}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>

              <View style={styles.card}>
                <Text style={styles.sectionTitle}>Inventario</Text>
                <ProgressBar progress={stockProgress(item)} label="Stock disponible" />
                <Text style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Unidades: </Text>
                  <Text style={styles.detailValue}>
                    {item.stock} de {item.maxStock}
                  </Text>
                </Text>
              </View>

              <View style={styles.card}>
                <Text style={styles.sectionTitle}>Detalles</Text>
                <Text style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Categoría: </Text>
                  <Text style={styles.detailValue}>{item.category}</Text>
                </Text>
                <Text style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Punto de venta: </Text>
                  <Text style={styles.detailValue}>{item.stand}</Text>
                </Text>
                <Text style={styles.detailRow}>
                  <Text style={styles.detailLabel}>ID: </Text>
                  <Text style={styles.detailValue}>{item.id}</Text>
                </Text>
              </View>
            </>
          ) : (
            <View style={styles.card}>
              <Text style={styles.name}>Producto no disponible</Text>
              <Text style={styles.description}>Este producto ya no está en el inventario.</Text>
            </View>
          )}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.xl,
  },
  animatedBlock: {
    gap: SPACING.md,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: SPACING.lg,
    gap: SPACING.sm,
  },
  name: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: '700',
  },
  price: {
    color: COLORS.accent,
    fontSize: 18,
    fontWeight: '700',
  },
  description: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
  sectionTitle: {
    color: COLORS.accent,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailRow: {
    fontSize: 14,
  },
  detailLabel: {
    color: COLORS.textMuted,
  },
  detailValue: {
    color: COLORS.text,
  },
});
