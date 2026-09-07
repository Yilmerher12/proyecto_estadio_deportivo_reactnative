// src/hooks/useItems.ts
// TanStack Query hooks con caché AsyncStorage para soporte offline.

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createItem, fetchItemById, fetchItems, updateItem } from '../services/api';
import type { Item, ItemsWithSource } from '../types';

// ─── Query keys ───────────────────────────────────────────────────────────────
const ITEMS_QUERY_KEY = ['items'] as const;

// ─── AsyncStorage key para caché offline ─────────────────────────────────────
const CACHE_KEY = '@items_cache';

// ─── Catálogo de productos del estadio ────────────────────────────────────────
// JSONPlaceholder no conoce nuestro dominio — cada post se mapea de forma
// determinística (por su id) a uno de estos productos, igual que en
// semanas 05 y 06. La descripción real (`body`) sí viene de la API.
const CATALOG: Array<{ price: number; type: string; stock: number }> = [
  { price: 3.99, type: 'drink', stock: 5 },
  { price: 5000, type: 'drink', stock: 40 },
  { price: 3500, type: 'drink', stock: 30 },
  { price: 2500, type: 'drink', stock: 50 },
  { price: 3500, type: 'food', stock: 25 },
  { price: 12000, type: 'food', stock: 15 },
  { price: 4000, type: 'food', stock: 20 },
  { price: 6000, type: 'food', stock: 18 },
  { price: 3000, type: 'snack', stock: 35 },
  { price: 2000, type: 'snack', stock: 45 },
];

function enrichItem(item: Item): Item {
  const archetype = CATALOG[(item.id - 1) % CATALOG.length]!;
  return { ...item, ...archetype, available: item.id % 5 !== 0 };
}

// ─── useItems — lista con caché offline ───────────────────────────────────────
export function useItems() {
  return useQuery<ItemsWithSource>({
    queryKey: ITEMS_QUERY_KEY,
    queryFn: async (): Promise<ItemsWithSource> => {
      try {
        const data = (await fetchItems()).map(enrichItem);
        // Guardar en caché cuando hay red exitosa
        await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(data));
        return { items: data, source: 'network' };
      } catch {
        // Sin red: intentar caché
        const cached = await AsyncStorage.getItem(CACHE_KEY);
        if (cached) {
          return { items: JSON.parse(cached) as Item[], source: 'cache' };
        }
        throw new Error('Sin red y sin caché disponible');
      }
    },
    staleTime: 1000 * 60 * 5,
  });
}

// ─── useItemById ───────────────────────────────────────────────────────────────
export function useItemById(id: number | string | undefined) {
  return useQuery({
    queryKey: [...ITEMS_QUERY_KEY, id],
    queryFn: async () => enrichItem(await fetchItemById(id!)),
    enabled: id !== undefined,
  });
}

// ─── useCreateItem ─────────────────────────────────────────────────────────────
export function useCreateItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Omit<Item, 'id'>) => createItem(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY });
    },
  });
}

// ─── useUpdateItem ─────────────────────────────────────────────────────────────
export function useUpdateItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...payload }: { id: number | string } & Partial<Omit<Item, 'id'>>) =>
      updateItem(id, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: [...ITEMS_QUERY_KEY, variables.id] });
    },
  });
}
