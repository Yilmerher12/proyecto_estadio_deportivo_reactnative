// src/navigation/types.ts
// Tipos de parámetros para los navigators del proyecto.

export type RootTabParamList = {
    Home: undefined;
    Saved: undefined;
};

export type HomeStackParamList = {
    HomeList: undefined;
    
    HomeDetail: {
        id: string;
        name: string;
        description: string;
        price: number;
        type: string;
        stock: number;
        available: boolean;

    };
};