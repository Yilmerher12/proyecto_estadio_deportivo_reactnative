// Producto de las concesiones del estadio (comida, bebida y merchandising).
export type ConcessionCategory = 'Comida' | 'Bebida' | 'Merchandising';

export interface ConcessionItem {
  id: string;
  name: string;
  description: string;
  category: ConcessionCategory;
  price: number;
  stock: number;
  maxStock: number;
  stand: string;
}

// Porcentaje de inventario disponible (0-1), lo que muestra la ProgressBar.
export function stockProgress(item: ConcessionItem): number {
  return Math.min(1, Math.max(0, item.stock / item.maxStock));
}
