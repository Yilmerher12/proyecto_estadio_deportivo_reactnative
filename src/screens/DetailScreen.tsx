import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import { AnimatedButton } from '../components/AnimatedButton';
import { PinchableImage } from '../components/PinchableImage';
import { useConcessionsStore } from '../store/concessionsStore';
import { theme } from '../theme';
import { stockBadge } from '../types';
import { formatPrice } from '../utils/format';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

// Entrada con Reanimated 4: fade in (500 ms) + slide up (400 ms tras 80 ms de delay).
// Respecto a w09: useSharedValue en vez de Animated.Value, withTiming sin .start()
// y sin useNativeDriver (Reanimated corre siempre en el hilo de UI).
export function DetailScreen({ route }: Props): React.JSX.Element {
  const { itemId } = route.params;
  const item = useConcessionsStore((state) => state.items.find((i) => i.id === itemId));
  const quantityOrdered = useConcessionsStore((state) => state.order[itemId] ?? 0);
  const addToOrder = useConcessionsStore((state) => state.addToOrder);
  const markSoldOut = useConcessionsStore((state) => state.markSoldOut);

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(30);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 500 });
    translateY.value = withDelay(80, withTiming(0, { duration: 400 }));
  }, [opacity, translateY]);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  if (!item) {
    return (
      <View style={styles.missing}>
        <Text style={styles.heroTitle}>Producto no disponible</Text>
      </View>
    );
  }

  const soldOut = item.stock === 0;

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <Animated.View style={[styles.container, containerStyle]}>
        <PinchableImage uri={item.imageUrl} alt={item.name} />

        <View style={styles.hero}>
          <Text style={styles.heroTitle}>{item.name}</Text>
          <Text style={styles.heroPrice}>{formatPrice(item.price)}</Text>
          <Text style={styles.heroSubtitle}>{item.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información</Text>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Categoría</Text>
            <Text style={styles.rowValue}>{item.category}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Unidades en inventario</Text>
            <Text style={styles.rowValue}>{item.stock}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Disponibilidad</Text>
            <Text style={[styles.rowValue, soldOut ? styles.soldOut : styles.available]}>
              {stockBadge(item)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>En tu pedido</Text>
            <Text style={styles.rowValue}>{quantityOrdered}</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <AnimatedButton
            label="🛒 Añadir al pedido"
            variant="success"
            disabled={soldOut || quantityOrdered >= item.stock}
            onPress={() => addToOrder(item.id)}
          />
          <AnimatedButton
            label="🚫 Marcar agotado"
            variant="danger"
            disabled={soldOut}
            onPress={() => markSoldOut(item.id)}
          />
        </View>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  container: {
    gap: theme.spacing.md,
  },
  missing: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
  hero: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    alignItems: 'center',
    gap: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  heroTitle: {
    color: theme.colors.text,
    fontSize: theme.fontSize.xl,
    fontWeight: '700',
    textAlign: 'center',
  },
  heroPrice: {
    color: theme.colors.accent,
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
  },
  heroSubtitle: {
    color: theme.colors.textMuted,
    fontSize: theme.fontSize.sm,
    textAlign: 'center',
  },
  section: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  sectionTitle: {
    color: theme.colors.textMuted,
    fontSize: theme.fontSize.xs,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  rowLabel: {
    color: theme.colors.textMuted,
    fontSize: theme.fontSize.sm,
  },
  rowValue: {
    color: theme.colors.text,
    fontSize: theme.fontSize.sm,
    fontWeight: '500',
  },
  available: {
    color: theme.colors.success,
  },
  soldOut: {
    color: theme.colors.danger,
  },
  actions: {
    gap: theme.spacing.sm,
  },
});
