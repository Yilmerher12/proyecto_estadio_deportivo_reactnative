// ============================================================
// TYPES — src/types/index.ts
// ============================================================
// Define aquí la interfaz del elemento de tu dominio asignado.
// Este type se usará en mockData.ts, ItemCard.tsx y HomeScreen.tsx
// ============================================================

import { ImageSourcePropType } from 'react-native';

// Elemento del catálogo de concesiones del Estadio Deportivo
// (comida, bebidas y merchandising disponibles en los puntos de venta).
export interface ConcessionItem {
    id: string;
    name: string;
    image: ImageSourcePropType;
    description?: string;
    subtitle?: string;
    type: string;
    price: number;
    stock: number;
    available: boolean;
}