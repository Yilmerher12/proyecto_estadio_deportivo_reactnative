import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { ItemConcessions } from '../types';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../theme';

interface ItemCardProps {
    item: ItemConcessions;
    onPress: (item: ItemConcessions) => void;
}

/**
 * Tarjeta reutilizable para mostrar un elemento del dominio.
 * Personaliza el contenido según los campos de tu interfaz Item.
 */
export function ItemCard({ item, onPress }: ItemCardProps): React.JSX.Element {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.card,
                pressed && styles.cardPressed,
            ]}
            onPress={() => onPress(item)}
            accessibilityRole="button"
            accessibilityLabel={item.name}
        >
            {/* Nombre principal del elemento */}
            <Text style={styles.itemName}>{item.name}</Text>


            <Text style={styles.fieldText}>{item.price}</Text>

            <Text style={styles.fieldText}>{item.type}</Text>
            <Text style={styles.fieldText}>{item.description}</Text>
            <Text style={styles.fieldText}>{item.available ? 'Disponible' : 'Agotado'}</Text>
            <Text style={styles.fieldText}>{item.stock}</Text>


        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.surface,
        borderRadius: RADIUS.md,
        padding: SPACING.base,
        marginHorizontal: SPACING.base,
        marginVertical: SPACING.xs,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    cardPressed: {
        backgroundColor: COLORS.surfaceAlt,
    },
    itemName: {
        fontSize: TYPOGRAPHY.size.md,
        fontWeight: TYPOGRAPHY.weight.semibold,
        color: COLORS.textPrimary,
        marginBottom: SPACING.xs,
    },
    fieldText: {
        fontSize: TYPOGRAPHY.size.sm,
        color: COLORS.textSecondary,
        marginBottom: 2,
    },
    badge: {
        alignSelf: 'flex-start',
        marginTop: SPACING.sm,
        paddingHorizontal: SPACING.sm,
        paddingVertical: 3,
        borderRadius: RADIUS.full,
        backgroundColor: COLORS.accentDim,
    },
    badgeText: {
        fontSize: TYPOGRAPHY.size.xs,
        fontWeight: TYPOGRAPHY.weight.semibold,
        color: COLORS.accent,
        textTransform: 'capitalize',
    },
});