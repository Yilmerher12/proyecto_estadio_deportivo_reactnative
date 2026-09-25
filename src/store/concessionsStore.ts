import { create } from 'zustand';
import type { ConcessionCategory, ConcessionItem } from '../types';

const INITIAL_ITEMS: ConcessionItem[] = [
  {
    id: '1',
    name: 'Perro caliente',
    description: 'Salchicha, pan brioche, papas ripio y salsas de la casa.',
    category: 'Comida',
    price: 12000,
    stock: 180,
    maxStock: 200,
    stand: 'Puesto 3 · Tribuna Norte',
  },
  {
    id: '2',
    name: 'Cerveza artesanal',
    description: 'Vaso de 500 ml, servida bien fría en el entretiempo.',
    category: 'Bebida',
    price: 9500,
    stock: 90,
    maxStock: 200,
    stand: 'Puesto 1 · Tribuna Sur',
  },
  {
    id: '3',
    name: 'Camiseta oficial',
    description: 'Camiseta de la temporada, tallas S a XXL.',
    category: 'Merchandising',
    price: 189000,
    stock: 14,
    maxStock: 120,
    stand: 'Tienda Oficial · Acceso Oriental',
  },
  {
    id: '4',
    name: 'Nachos con queso',
    description: 'Porción grande de nachos con queso cheddar y jalapeños.',
    category: 'Comida',
    price: 15000,
    stock: 130,
    maxStock: 200,
    stand: 'Puesto 7 · Tribuna Occidental',
  },
];

const NEW_ITEM_POOL: { name: string; category: ConcessionCategory; price: number }[] = [
  { name: 'Gaseosa 400 ml', category: 'Bebida', price: 6000 },
  { name: 'Bufanda del club', category: 'Merchandising', price: 45000 },
  { name: 'Empanada de carne', category: 'Comida', price: 5000 },
  { name: 'Agua con gas', category: 'Bebida', price: 4500 },
];

interface ConcessionsState {
  items: ConcessionItem[];
  addItem: () => void;
  removeItem: (id: string) => void;
}

export const useConcessionsStore = create<ConcessionsState>((set) => ({
  items: INITIAL_ITEMS,
  addItem: () =>
    set((state) => {
      const template = NEW_ITEM_POOL[state.items.length % NEW_ITEM_POOL.length]!;
      const maxStock = 150;
      const newItem: ConcessionItem = {
        id: Date.now().toString(),
        ...template,
        description: 'Nuevo producto agregado al inventario del estadio.',
        stock: Math.round(Math.random() * maxStock),
        maxStock,
        stand: `Puesto ${state.items.length + 1} · Tribuna Norte`,
      };
      return { items: [...state.items, newItem] };
    }),
  removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
}));
