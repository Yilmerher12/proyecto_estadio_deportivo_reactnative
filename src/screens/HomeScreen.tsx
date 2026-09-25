import React, { useEffect } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SwipeableCard } from '../components/SwipeableCard';
import { useConcessionsStore } from '../store/concessionsStore';
import { theme } from '../theme';
import type { ConcessionItem } from '../types';
import { formatPrice } from '../utils/format';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

// Cada item aparece con un retraso proporcional a su índice:
// withDelay(index * 80, withTiming(...)) produce el efecto "stagger".
function AnimatedListItem({
  item,
  index,
  quantityOrdered,
  onPress,
  onSwipeRight,
  onSwipeLeft,
}: {
  item: ConcessionItem;
  index: number;
  quantityOrdered: number;
  onPress: (item: ConcessionItem) => void;
  onSwipeRight: (item: ConcessionItem) => void;
  onSwipeLeft: (item: ConcessionItem) => void;
}): React.JSX.Element {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    opacity.value = withDelay(index * 80, withTiming(1, { duration: 400 }));
    translateY.value = withDelay(index * 80, withTiming(0, { duration: 400 }));
  }, [index, opacity, translateY]);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={animStyle}>
      <SwipeableCard
        item={item}
        quantityOrdered={quantityOrdered}
        onPress={onPress}
        onSwipeRight={onSwipeRight}
        onSwipeLeft={onSwipeLeft}
      />
    </Animated.View>
  );
}

export function HomeScreen({ navigation }: Props): React.JSX.Element {
  const items = useConcessionsStore((state) => state.items);
  const order = useConcessionsStore((state) => state.order);
  const addToOrder = useConcessionsStore((state) => state.addToOrder);
  const markSoldOut = useConcessionsStore((state) => state.markSoldOut);

  const orderedUnits = Object.values(order).reduce((sum, qty) => sum + qty, 0);
  const orderTotal = items.reduce((sum, item) => sum + (order[item.id] ?? 0) * item.price, 0);

  const handlePress = (item: ConcessionItem) => {
    navigation.navigate('Detail', { itemId: item.id, itemName: item.name });
  };

  const renderItem = ({ item, index }: ListRenderItemInfo<ConcessionItem>) => (
    <AnimatedListItem
      item={item}
      index={index}
      quantityOrdered={order[item.id] ?? 0}
      onPress={handlePress}
      onSwipeRight={(i) => addToOrder(i.id)}
      onSwipeLeft={(i) => markSoldOut(i.id)}
    />
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Concesiones 🏟️</Text>
            <Text style={styles.subtitle}>
              Desliza → para añadir al pedido, ← para marcar agotado
            </Text>
          </View>
        }
        ListEmptyComponent={<Text style={styles.empty}>Sin productos disponibles</Text>}
      />
      <View style={styles.orderBar}>
        <Text style={styles.orderText}>🛒 Pedido: {orderedUnits} productos</Text>
        <Text style={styles.orderTotal}>{formatPrice(orderTotal)}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  list: {
    paddingBottom: theme.spacing.md,
  },
  header: {
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
    gap: 4,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.fontSize.xl,
    fontWeight: '700',
  },
  subtitle: {
    color: theme.colors.textMuted,
    fontSize: theme.fontSize.sm,
  },
  empty: {
    color: theme.colors.textMuted,
    textAlign: 'center',
    marginTop: theme.spacing.xl,
  },
  orderBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  orderText: {
    color: theme.colors.text,
    fontSize: theme.fontSize.md,
    fontWeight: '600',
  },
  orderTotal: {
    color: theme.colors.accent,
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
  },
});
