import React, { useEffect, useRef } from 'react';
import {
  Animated,
  FlatList,
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  UIManager,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AnimatedCard } from '../components/AnimatedCard';
import { AnimatedButton } from '../components/AnimatedButton';
import { ProgressBar } from '../components/ProgressBar';
import { useConcessionsStore } from '../store/concessionsStore';
import { COLORS, SPACING } from '../theme';
import { stockProgress, type ConcessionItem } from '../types';
import { formatPrice } from '../utils/format';
import type { RootStackParamList } from '../navigation/types';

// Android requires this flag to enable LayoutAnimation.
// Must be called outside the component, at module level.
if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props): React.JSX.Element {
  const items = useConcessionsStore((state) => state.items);
  const addItem = useConcessionsStore((state) => state.addItem);
  const removeItem = useConcessionsStore((state) => state.removeItem);

  // Un Animated.Value por producto para la entrada en cascada. Los productos
  // agregados después del stagger inicial nacen en 1: su entrada la hace LayoutAnimation.
  const anims = useRef(new Map<string, Animated.Value>()).current;
  const staggerDone = useRef(false);

  const getAnim = (id: string): Animated.Value => {
    let anim = anims.get(id);
    if (!anim) {
      anim = new Animated.Value(staggerDone.current ? 1 : 0);
      anims.set(id, anim);
    }
    return anim;
  };

  useEffect(() => {
    Animated.stagger(
      80,
      items.map((item) =>
        Animated.timing(getAnim(item.id), {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ),
    ).start();
    staggerDone.current = true;
    // Solo al montar: los items iniciales entran en cascada una vez.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRemoveItem = (id: string) => {
    // configureNext debe ir ANTES del setState para animar el cambio de layout.
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    removeItem(id);
  };

  const handleAddItem = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    addItem();
  };

  const renderItem = ({ item }: { item: ConcessionItem }) => {
    const anim = getAnim(item.id);

    return (
      <Animated.View
        style={{
          opacity: anim,
          transform: [
            { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) },
          ],
        }}
      >
        <AnimatedCard
          onPress={() => navigation.navigate('Detail', { itemId: item.id })}
          style={styles.card}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>{formatPrice(item.price)}</Text>
          </View>
          <Text style={styles.itemCategory}>{item.category}</Text>
          <Text style={styles.itemDescription}>{item.description}</Text>
          <ProgressBar progress={stockProgress(item)} label="Stock disponible" />
          <AnimatedButton
            label="Eliminar del inventario"
            variant="danger"
            onPress={() => handleRemoveItem(item.id)}
          />
        </AnimatedCard>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Concesiones del estadio</Text>
            <Text style={styles.subtitle}>{items.length} productos en inventario</Text>
          </View>
        }
        ListFooterComponent={
          <View style={styles.footer}>
            <AnimatedButton label="+ Añadir producto" onPress={handleAddItem} />
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  list: {
    padding: SPACING.xl,
    gap: SPACING.md,
  },
  header: {
    marginBottom: SPACING.md,
  },
  title: {
    color: COLORS.text,
    fontSize: 26,
    fontWeight: '700',
  },
  subtitle: {
    color: COLORS.textMuted,
    fontSize: 13,
    marginTop: 2,
  },
  card: {
    gap: SPACING.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
  },
  itemPrice: {
    color: COLORS.accent,
    fontSize: 15,
    fontWeight: '700',
  },
  itemCategory: {
    color: COLORS.textMuted,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  itemDescription: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  separator: {
    height: SPACING.md,
  },
  footer: {
    marginTop: SPACING.xl,
  },
});
