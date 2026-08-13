// src/screens/HomeScreen.tsx
// Pantalla de lista — muestra todos los elementos del dominio.
// Al presionar un ítem navega al DetailScreen pasando los params.

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { ITEMS } from '../data/mockData';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { ConcessionsItem } from '../types';
import type { HomeStackParamList } from '../navigation/types';

// Tipo del navigation hook para este Stack
type HomeScreenNavigationProp = NativeStackNavigationProp<
    HomeStackParamList,
    'HomeList'
>;

export function HomeScreen(): React.JSX.Element {
    const navigation = useNavigation<HomeScreenNavigationProp>();

    /**
     * Navega al DetailScreen pasando los datos del ítem seleccionado.
     * ConcessionsItem tiene exactamente los mismos campos que HomeDetail,
     * así que se pasa el item completo.
     */
    function handleItemPress(item: ConcessionsItem): void {
        navigation.navigate('HomeDetail', item);
    }

    /**
     * Renderiza cada ítem de la lista: nombre, descripción, precio y tipo.
     */
    function renderItem({ item }: { item: ConcessionsItem }): React.JSX.Element {
        return (
            <Pressable
                style={({ pressed }) => [
                    styles.card,
                    pressed && styles.cardPressed,
                ]}
                onPress={() => handleItemPress(item)}
                // testID permite encontrar el elemento en tests
                testID={`item-${item.id}`}
            >
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDescription} numberOfLines={2}>
                    {item.description}
                </Text>
                <Text style={styles.itemPrice}>
                    ${item.price} · {item.type}
                </Text>
                <Text style={styles.chevron}>{'›'}</Text>
            </Pressable>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Concesiones del Estadio</Text>
            <FlatList
                data={ITEMS}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
                // Separador visual entre ítems
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                ListEmptyComponent={
                    <Text style={styles.empty}>Sin productos disponibles</Text>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        fontSize: TYPOGRAPHY.size.lg,
        fontWeight: TYPOGRAPHY.weight.bold,
        color: COLORS.textPrimary,
        padding: SPACING.base,
        paddingBottom: 0,
    },
    list: {
        padding: SPACING.base,
    },
    empty: {
        textAlign: 'center',
        marginTop: SPACING.xl,
        fontSize: TYPOGRAPHY.size.base,
        color: COLORS.textMuted,
    },
    card: {
        backgroundColor: COLORS.surface,
        borderRadius: RADIUS.md,
        padding: SPACING.base,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    cardPressed: {
        opacity: 0.7,
        backgroundColor: COLORS.surfaceAlt,
    },
    itemName: {
        fontSize: TYPOGRAPHY.size.md,
        fontWeight: TYPOGRAPHY.weight.semibold,
        color: COLORS.textPrimary,
        marginBottom: SPACING.xs,
    },
    itemDescription: {
        fontSize: TYPOGRAPHY.size.sm,
        color: COLORS.textSecondary,
        lineHeight: 18,
    },
    itemPrice: {
        fontSize: TYPOGRAPHY.size.sm,
        fontWeight: TYPOGRAPHY.weight.medium,
        color: COLORS.accent,
        marginTop: SPACING.xs,
    },
    chevron: {
        position: 'absolute',
        right: SPACING.base,
        top: '50%',
        fontSize: TYPOGRAPHY.size.xl,
        color: COLORS.textMuted,
    },
    separator: {
        height: SPACING.sm,
    },
});