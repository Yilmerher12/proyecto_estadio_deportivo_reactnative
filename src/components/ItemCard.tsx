// ============================================================
// COMPONENT: ItemCard
// ============================================================
// Tarjeta reutilizable para mostrar un elemento del dominio.
// Este componente se renderiza por cada item en HomeScreen.
// ============================================================

import React from 'react';
import {
    View,
    Text,
    Image,
    Pressable,
    StyleSheet,
} from 'react-native';
import { ConcessionItem } from '../types';

interface ItemCardProps {
    item: ConcessionItem;
    onPress: (item: ConcessionItem) => void;
}

export function ItemCard({ item, onPress }: ItemCardProps): React.JSX.Element {
    return (
        <Pressable
            style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
            onPress={() => onPress(item)}
        >
            <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
            <View style={styles.cardBody}>
                <Text style={styles.cardName}>{item.name}</Text>
                {item.subtitle ? <Text style={styles.cardSubtitle}>{item.subtitle}</Text> : null}
                <View style={styles.cardFooter}>
                    <Text style={styles.cardType}>{item.type}</Text>
                    <Text style={styles.cardPrice}>${item.price.toLocaleString('es-CO')}</Text>
                </View>
                <Text style={item.available ? styles.cardStockAvailable : styles.cardStockUnavailable}>
                    {item.available ? `Disponible · ${item.stock} en stock` : 'Agotado'}
                </Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#161b22',
        borderRadius: 12,
        marginBottom: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#30363d',
    },
    cardPressed: {
        opacity: 0.7,
    },
    cardImage: {
        width: '100%',
        height: 160,
    },
    cardBody: {
        padding: 16,
        gap: 4,
    },
    cardName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    cardSubtitle: {
        fontSize: 14,
        color: '#8b949e',
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    cardType: {
        fontSize: 12,
        color: '#58a6ff',
        textTransform: 'uppercase',
    },
    cardPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    cardStockAvailable: {
        fontSize: 12,
        color: '#3fb950',
        marginTop: 2,
    },
    cardStockUnavailable: {
        fontSize: 12,
        color: '#f85149',
        marginTop: 2,
    },
});