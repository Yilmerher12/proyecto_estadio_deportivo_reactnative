// Producto de las concesiones del estadio (comida, bebida y merchandising).
export type ConcessionCategory = 'Comida' | 'Bebida' | 'Merchandising';

export interface ConcessionItem {
  id: string;
  name: string;
  description: string;
  category: ConcessionCategory;
  price: number;
  stock: number;
  imageUrl: string;
}

// Etiqueta de disponibilidad que se muestra en la card y en el detalle.
export function stockBadge(item: ConcessionItem): string {
  if (item.stock === 0) return 'Agotado';
  if (item.stock < 20) return 'Poco stock';
  return 'En stock';
}
