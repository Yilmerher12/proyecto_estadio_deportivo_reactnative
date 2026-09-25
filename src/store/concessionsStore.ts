import { create } from 'zustand';
import type { ConcessionItem } from '../types';

const IMG = 'https://cdn.dummyjson.com/product-images';

const INITIAL_ITEMS: ConcessionItem[] = [
  {
    id: '1',
    name: 'Gaseosa 400 ml',
    description: 'Bien fría, ideal para el entretiempo.',
    category: 'Bebida',
    price: 6000,
    stock: 120,
    imageUrl: `${IMG}/groceries/soft-drinks/1.webp`,
  },
  {
    id: '2',
    name: 'Agua 500 ml',
    description: 'Agua natural en botella, sin gas.',
    category: 'Bebida',
    price: 4500,
    stock: 15,
    imageUrl: `${IMG}/groceries/water/1.webp`,
  },
  {
    id: '3',
    name: 'Helado de vainilla',
    description: 'Copa individual con cobertura de chocolate.',
    category: 'Comida',
    price: 7000,
    stock: 60,
    imageUrl: `${IMG}/groceries/ice-cream/1.webp`,
  },
  {
    id: '4',
    name: 'Café instantáneo',
    description: 'Café caliente para las noches de partido.',
    category: 'Bebida',
    price: 5000,
    stock: 8,
    imageUrl: `${IMG}/groceries/nescafe-coffee/1.webp`,
  },
  {
    id: '5',
    name: 'Jugo de frutas',
    description: 'Jugo natural en caja de 250 ml.',
    category: 'Bebida',
    price: 5500,
    stock: 45,
    imageUrl: `${IMG}/groceries/juice/1.webp`,
  },
  {
    id: '6',
    name: 'Balón de recuerdo',
    description: 'Balón oficial de la tienda del estadio.',
    category: 'Merchandising',
    price: 89000,
    stock: 30,
    imageUrl: `${IMG}/sports-accessories/american-football/1.webp`,
  },
];

interface ConcessionsState {
  items: ConcessionItem[];
  // unidades pedidas por id de producto
  order: Record<string, number>;
  addToOrder: (id: string) => void;
  markSoldOut: (id: string) => void;
}

export const useConcessionsStore = create<ConcessionsState>((set) => ({
  items: INITIAL_ITEMS,
  order: {},
  addToOrder: (id) =>
    set((state) => {
      const item = state.items.find((i) => i.id === id);
      const alreadyOrdered = state.order[id] ?? 0;
      // No se puede pedir más de lo que hay en inventario.
      if (!item || alreadyOrdered >= item.stock) return state;
      return { order: { ...state.order, [id]: alreadyOrdered + 1 } };
    }),
  markSoldOut: (id) =>
    set((state) => {
      const { [id]: _removed, ...order } = state.order;
      return {
        items: state.items.map((i) => (i.id === id ? { ...i, stock: 0 } : i)),
        order,
      };
    }),
}));
