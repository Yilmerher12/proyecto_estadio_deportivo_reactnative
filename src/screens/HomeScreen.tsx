// src/screens/HomeScreen.tsx
// Pantalla principal: lista de ítems con navegación al detalle.
// El estudiante debe adaptar el diseño y los campos a su dominio.

import React from 'react';
import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
    Image,
    type ListRenderItem,
} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { ITEMS } from '../data/mockData';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { ItemConcessions } from '../types';
import type { HomeStackParamList } from '../navigation/types';
type HomeScreenNavProp = NativeStackNavigationProp<HomeStackParamList, 'HomeList'>;


interface ItemCardProps {
    item: ItemConcessions;
    onPress: () => void;
}

function ItemCard({ item, onPress }: ItemCardProps): React.JSX.Element {
    return (
        <Pressable
            style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
            onPress={onPress}
            testID={`item-card-${item.id}`}
        >
            <View style={styles.thumbnail}>
                <Text style={styles.thumbnailText}>{item.name.charAt(0)}</Text>
            </View>

            <View style={styles.cardContent}>
                <Image source = {{uri: item.image}}/>
                <Text style={styles.cardTitle} numberOfLines={1}>
                    {item.name}
                </Text>
                <Text style={styles.cardDescription} numberOfLines={2}>
                    {item.description}
                </Text>
                <Text style={styles.cardPrice}>${item.price.toFixed(2)}</Text>
                <Text style={styles.cardStock}>
                    {item.available ? `En stock: ${item.stock}` : 'Agotado'}
                </Text>

            </View>

            <Text style={styles.chevron}>›</Text>
        </Pressable>
    );
}


export function HomeScreen(): React.JSX.Element {
    const navigation = useNavigation<HomeScreenNavProp>();

    const items = ITEMS;

    const renderItem: ListRenderItem<ItemConcessions> = ({ item }) => (
        <ItemCard
            item={item}
            onPress={() =>
                navigation.navigate('HomeDetail', { 
                    id: item.id, name: item.name, description: item.description, 
                    price: item.price, 
                    type: item.type, 
                    image: item.image,
                    stock: item.stock, 
                    available: item.available 
                })
            }
        />
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
                ItemSeparatorComponent={() => <View style={styles.separator} />}

                ListHeaderComponent={
                    <Text style={styles.sectionLabel}>
                        {items.length} ítem{items.length !== 1 ? 's' : ''}
                    </Text>
                }
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No hay ítems disponibles.</Text>
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
    list: {
        padding: SPACING.md,
        paddingBottom: SPACING.xl,
    },
    sectionLabel: {
        ...TYPOGRAPHY.label,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: SPACING.sm,
    },
    separator: {
        height: SPACING.sm,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.card,
        borderRadius: RADIUS.md,
        padding: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.border,
        gap: SPACING.md,
    },
    cardPressed: {
        opacity: 0.7,
    },
    thumbnail: {
        width: 48,
        height: 48,
        borderRadius: RADIUS.sm,
        backgroundColor: COLORS.surface,
        alignItems: 'center',
        justifyContent: 'center',
    },
    thumbnailText: {
        ...TYPOGRAPHY.h3,
        color: COLORS.accent,
    },
    cardContent: {
        flex: 1,
        gap: SPACING.xs,
    },
    cardTitle: {
        ...TYPOGRAPHY.body,
        fontWeight: '600',
    },
    cardDescription: {
        ...TYPOGRAPHY.caption,
    },
    cardPrice: {
        ...TYPOGRAPHY.body,
        fontWeight: '600',
        color: COLORS.accent,
    },
    cardStock: {
        ...TYPOGRAPHY.caption,
        color: COLORS.textMuted,
    },
    chevron: {
        ...TYPOGRAPHY.h2,
        color: COLORS.textMuted,
    },
    emptyText: {
        ...TYPOGRAPHY.body,
        textAlign: 'center',
        marginTop: SPACING.xl,
        color: COLORS.textSecondary,
    },
});