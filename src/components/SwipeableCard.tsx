import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolation,
  runOnJS,
} from 'react-native-reanimated';
import { theme } from '../theme';
import { stockBadge, type ConcessionItem } from '../types';
import { formatPrice } from '../utils/format';

// Umbral (en px) a partir del cual el swipe se considera una acción
const SWIPE_THRESHOLD = 120;

interface SwipeableCardProps {
  item: ConcessionItem;
  quantityOrdered?: number;
  onSwipeRight?: (item: ConcessionItem) => void;
  onSwipeLeft?: (item: ConcessionItem) => void;
  onPress?: (item: ConcessionItem) => void;
}

// Tarjeta de concesión arrastrable con Gesture.Pan:
//   → derecha (> 120 px): añadir al pedido
//   ← izquierda (< -120 px): marcar agotado
//   otro caso: snap-back con withSpring(0)
// La tarjeta rota según el desplazamiento y los indicadores (que NO se mueven
// con ella) aparecen a medida que se acerca al umbral.
export function SwipeableCard({
  item,
  quantityOrdered = 0,
  onSwipeRight,
  onSwipeLeft,
  onPress,
}: SwipeableCardProps): React.JSX.Element {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const pan = Gesture.Pan()
    // El pan solo se activa tras 10 px en horizontal y cede ante un scroll vertical:
    // sin esto la tarjeta bloquearía el scroll de la FlatList.
    .activeOffsetX([-10, 10])
    .failOffsetY([-15, 15])
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY * 0.3; // resistencia vertical
    })
    .onEnd(() => {
      if (translateX.value > SWIPE_THRESHOLD) {
        if (onSwipeRight) runOnJS(onSwipeRight)(item);
      } else if (translateX.value < -SWIPE_THRESHOLD) {
        if (onSwipeLeft) runOnJS(onSwipeLeft)(item);
      }
      // En los tres casos la tarjeta vuelve al centro; solo cambia la rigidez.
      translateX.value = withSpring(0, { damping: 12, stiffness: 150 });
      translateY.value = withSpring(0, { damping: 12, stiffness: 150 });
    });

  const tap = Gesture.Tap()
    .maxDistance(10)
    .onEnd((_, success) => {
      if (success && onPress) runOnJS(onPress)(item);
    });

  // Race: gana el primero que se active (tap corto o arrastre).
  const gesture = Gesture.Race(pan, tap);

  const cardStyle = useAnimatedStyle(() => {
    const rotate = interpolate(translateX.value, [-200, 0, 200], [-20, 0, 20], Extrapolation.CLAMP);
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate}deg` },
      ],
    };
  });

  const rightIndicatorStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, SWIPE_THRESHOLD], [0, 1], Extrapolation.CLAMP),
  }));
  const leftIndicatorStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [-SWIPE_THRESHOLD, 0], [1, 0], Extrapolation.CLAMP),
  }));

  const badge = stockBadge(item);
  const soldOut = item.stock === 0;

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.indicator, styles.swipeRight, rightIndicatorStyle]}>
        <Text style={styles.swipeText}>🛒 Añadir al pedido</Text>
      </Animated.View>
      <Animated.View style={[styles.indicator, styles.swipeLeft, leftIndicatorStyle]}>
        <Text style={styles.swipeText}>🚫 Marcar agotado</Text>
      </Animated.View>

      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.card, cardStyle]}>
          <View style={styles.row}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{formatPrice(item.price)}</Text>
          </View>
          <Text style={styles.description} numberOfLines={2}>
            {item.description}
          </Text>
          <View style={styles.row}>
            <View style={[styles.badge, soldOut ? styles.badgeOut : badge === 'Poco stock' && styles.badgeLow]}>
              <Text style={[styles.badgeText, soldOut && styles.badgeTextOut]}>{badge}</Text>
            </View>
            {quantityOrdered > 0 && (
              <Text style={styles.ordered}>🛒 {quantityOrdered} en el pedido</Text>
            )}
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.xs,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    color: theme.colors.text,
    fontSize: theme.fontSize.md,
    fontWeight: '600',
  },
  price: {
    color: theme.colors.accent,
    fontSize: theme.fontSize.md,
    fontWeight: '700',
  },
  description: {
    color: theme.colors.textMuted,
    fontSize: theme.fontSize.sm,
    lineHeight: 18,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.success + '22',
    borderRadius: theme.radius.sm,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeLow: {
    backgroundColor: theme.colors.warning + '22',
  },
  badgeOut: {
    backgroundColor: theme.colors.danger + '22',
  },
  badgeText: {
    color: theme.colors.success,
    fontSize: theme.fontSize.xs,
    fontWeight: '600',
  },
  badgeTextOut: {
    color: theme.colors.danger,
  },
  ordered: {
    color: theme.colors.textMuted,
    fontSize: theme.fontSize.xs,
  },
  indicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 130,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.lg,
  },
  swipeRight: {
    left: 0,
    backgroundColor: theme.colors.success + '55',
  },
  swipeLeft: {
    right: 0,
    backgroundColor: theme.colors.danger + '55',
  },
  swipeText: {
    color: theme.colors.text,
    fontSize: theme.fontSize.xs,
    fontWeight: '700',
    textAlign: 'center',
  },
});
