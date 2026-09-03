// src/hooks/useConcessions.ts
// Custom hooks que encapsulan la lógica de fetching del dominio.
// Los componentes consumen estos hooks, no llaman a apiClient directamente.

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../services/api';
import type { ConcessionItem, CreateConcessionPayload } from '../types';

export const CONCESSIONS_QUERY_KEY = ['concessions'] as const;

// ============================================================
// Forma real de un post de JSONPlaceholder — se usa como proxy
// de red (GET /posts) mientras no hay un backend propio desplegado.
// ============================================================
interface JsonPlaceholderPost {
  id: number;
  title: string;
  body: string;
}

// Catálogo fijo de productos del estadio. Cada post de JSONPlaceholder se
// mapea de forma determinística (por su id) a uno de estos productos, así
// la lista siempre se ve coherente con el dominio y el mismo id siempre
// produce el mismo producto en Home y en el detalle.
const CATALOG: Array<Pick<ConcessionItem, 'name' | 'type' | 'price' | 'stock'>> = [
  { name: 'Coca Cola 500ml', type: 'drink', price: 3.99, stock: 5 },
  { name: 'Cerveza Águila 330ml', type: 'drink', price: 5000, stock: 40 },
  { name: 'Gaseosa Postobón 400ml', type: 'drink', price: 3500, stock: 30 },
  { name: 'Agua Mineral 500ml', type: 'drink', price: 2500, stock: 50 },
  { name: 'Empanada de Carne', type: 'food', price: 3500, stock: 25 },
  { name: 'Lechona Tolimense', type: 'food', price: 12000, stock: 15 },
  { name: 'Papa Rellena', type: 'food', price: 4000, stock: 20 },
  { name: 'Chorizo con Arepa', type: 'food', price: 6000, stock: 18 },
  { name: 'Papas Criollas', type: 'snack', price: 3000, stock: 35 },
  { name: 'Maní Salado', type: 'snack', price: 2000, stock: 45 },
];

function mapPostToConcession(post: JsonPlaceholderPost): ConcessionItem {
  const archetype = CATALOG[(post.id - 1) % CATALOG.length]!;
  return {
    id: String(post.id),
    name: archetype.name,
    // La descripción sí viene del dato real de la API — demuestra que se
    // está consumiendo la red, no datos hardcodeados.
    description: post.title,
    price: archetype.price,
    type: archetype.type,
    stock: archetype.stock,
    available: post.id % 5 !== 0,
  };
}

// ============================================================
// useConcessions — lista de productos de las concesiones
// ============================================================
export function useConcessions() {
  return useQuery<ConcessionItem[]>({
    queryKey: CONCESSIONS_QUERY_KEY,
    queryFn: async () => {
      const { data } = await apiClient.get<JsonPlaceholderPost[]>('/posts?_limit=15');
      return data.map(mapPostToConcession);
    },
  });
}

// ============================================================
// useConcessionById — detalle de un producto por id
// ============================================================
export function useConcessionById(id: string) {
  return useQuery<ConcessionItem>({
    queryKey: [...CONCESSIONS_QUERY_KEY, id],
    queryFn: async () => {
      const { data } = await apiClient.get<JsonPlaceholderPost>(`/posts/${id}`);
      return mapPostToConcession(data);
    },
    enabled: !!id,
  });
}

// ============================================================
// useCreateConcession — crear un nuevo producto
// ============================================================
export function useCreateConcession() {
  const queryClient = useQueryClient();

  return useMutation<ConcessionItem, Error, CreateConcessionPayload>({
    mutationFn: async (payload) => {
      // JSONPlaceholder acepta cualquier JSON y lo devuelve con un id fake (101)
      const { data } = await apiClient.post<CreateConcessionPayload & { id: number }>(
        '/posts',
        payload,
      );
      return { ...payload, id: String(data.id) };
    },
    onSuccess: () => {
      // Invalida el caché → TanStack Query refetch la lista automáticamente
      queryClient.invalidateQueries({ queryKey: CONCESSIONS_QUERY_KEY });
    },
  });
}
