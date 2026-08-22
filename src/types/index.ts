// src/types/index.ts
// Interface principal del dominio.
// TODO: adaptar a tu dominio asignado.

export interface ItemConcessions {
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
    type: string;
    stock: number;
    available: boolean;
}