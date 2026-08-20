// src/screens/DetailScreen.tsx
// Pantalla de detalle: muestra la información completa de un ítem
// y permite guardarlo / quitarlo usando el store de Zustand.
// Esta pantalla demuestra cómo acceder al store desde cualquier screen.

import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRoute, type RouteProp } from '@react-navigation/native';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { HomeStackParamList } from '../navigation/types';

import { useSavedStore } from '../stores/savedStore';
import type { ItemConcessions } from '../types';
import { ITEMS } from '../data/mockData';

type DetailRouteProp = RouteProp<HomeStackParamList, 'HomeDetail'>;

export function DetailScreen(): React.JSX.Element {
    const route = useRoute<DetailRouteProp>();
    const { id, name } = route.params;

    // Se busca el ítem completo en ITEMS por si los datos cambiaron
    // desde que se navegó (los params solo son la foto del momento del tap).
    const item: ItemConcessions | undefined = ITEMS.find((i) => i.id === id);

    // Se selecciona `items` directamente (no la función `isItemSaved`) para que
    // el componente se vuelva a renderizar cuando cambie el store: seleccionar
    // una función no suscribe a los cambios de estado, solo seleccionar datos lo hace.
    const isSaved = useSavedStore((state) => state.items.some((i) => i.id === id));
    const addItem = useSavedStore((state) => state.addItem);
    const removeItem = useSavedStore((state) => state.removeItem);

    const handleToggleSave = (): void => {
        if (isSaved) {
            removeItem(id);
        } else if (item) {
            addItem(item);
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.hero}>
                <Text style={styles.heroLetter}>{name.charAt(0)}</Text>
            </View>

            <View style={styles.info}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.id}>ID: {id}</Text>
            </View>

            <View style={styles.field}>
                <Text style={styles.fieldLabel}>Descripción</Text>
                <Text style={styles.fieldValue}>{item?.description ?? 'No disponible'}</Text>
            </View>

            <View style={styles.field}>
                <Text style={styles.fieldLabel}>Precio</Text>
                <Text style={styles.fieldValue}>
                    {item ? `$${item.price.toFixed(2)}` : 'No disponible'}
                </Text>
            </View>

            <View style={styles.field}>
                <Text style={styles.fieldLabel}>Tipo</Text>
                <Text style={styles.fieldValue}>{item?.type ?? 'No disponible'}</Text>
            </View>

            <View style={styles.field}>
                <Text style={styles.fieldLabel}>Stock</Text>
                <Text style={styles.fieldValue}>
                    {item ? `${item.stock} unidades` : 'No disponible'}
                </Text>
            </View>

            <View style={styles.field}>
                <Text style={styles.fieldLabel}>Disponibilidad</Text>
                <Text
                    style={[
                        styles.fieldValue,
                        item?.available ? styles.available : styles.unavailable,
                    ]}
                >
                    {item?.available ? 'Disponible' : 'Agotado'}
                </Text>
            </View>

            <Pressable
                style={({ pressed }) => [
                    styles.saveButton,
                    isSaved && styles.saveButtonActive,
                    pressed && styles.saveButtonPressed,
                ]}
                onPress={handleToggleSave}
                testID="save-button"
            >
                <Text style={[styles.saveButtonText, isSaved && styles.saveButtonTextActive]}>
                    {isSaved ? '★  Guardado' : '☆  Guardar producto'}
                </Text>
            </Pressable>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        padding: SPACING.lg,
        gap: SPACING.md,
    },
    hero: {
        width: 96,
        height: 96,
        borderRadius: RADIUS.lg,
        backgroundColor: COLORS.card,
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    heroLetter: {
        fontSize: 40,
        fontWeight: '700',
        color: COLORS.accent,
    },
    info: {
        gap: SPACING.xs,
        alignItems: 'center',
        marginBottom: SPACING.sm,
    },
    title: {
        ...TYPOGRAPHY.h2,
        textAlign: 'center',
    },
    id: {
        ...TYPOGRAPHY.label,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    field: {
        backgroundColor: COLORS.card,
        borderRadius: RADIUS.md,
        padding: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.border,
        gap: SPACING.xs,
    },
    fieldLabel: {
        ...TYPOGRAPHY.label,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    fieldValue: {
        ...TYPOGRAPHY.body,
    },
    available: {
        color: COLORS.success,
    },
    unavailable: {
        color: COLORS.error,
    },
    saveButton: {
        backgroundColor: COLORS.card,
        borderRadius: RADIUS.md,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingVertical: SPACING.md,
        alignItems: 'center',
        marginTop: SPACING.sm,
    },
    saveButtonActive: {
        backgroundColor: COLORS.accent,
        borderColor: COLORS.accent,
    },
    saveButtonPressed: {
        opacity: 0.7,
    },
    saveButtonText: {
        ...TYPOGRAPHY.body,
        fontWeight: '600',
        color: COLORS.textPrimary,
    },
    saveButtonTextActive: {
        color: COLORS.background,
    },
});
