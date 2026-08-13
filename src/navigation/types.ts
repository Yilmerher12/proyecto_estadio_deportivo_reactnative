// src/navigation/types.ts
// Define los tipos de parámetros para cada navigator.
// Esto habilita autocompletado y verificación en tiempo de compilación.

// ============================================
// TAB NAVIGATOR — pantallas de nivel raíz
// ============================================

export type RootTabParamList = {
    // Pestaña principal con Stack interno (lista → detalle)
    Home: undefined;
    // Pestaña secundaria de favoritos
    Favorites: undefined;
};

// ============================================
// STACK NAVIGATOR — anidado dentro de la pestaña Home
// ============================================

export type HomeStackParamList = {
    // Pantalla de lista (sin params)
    HomeList: undefined;
    HomeDetail: {
        id: string;
        name: string;
        type: string;
        description: string;
        price: number;
        stock: number;
        available: boolean;
    };
};