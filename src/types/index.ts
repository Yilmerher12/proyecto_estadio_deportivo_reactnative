// ============================================
// TYPES — Semana 02
// Define aquí la interfaz de tu dominio
// ============================================

export interface ItemConcessions {
    id: string;
    /** Nombre o título principal del elemento */
    name: string;
    price: number;
    type: string;
    description?: string;
    stock: number;
    available: boolean;
}
