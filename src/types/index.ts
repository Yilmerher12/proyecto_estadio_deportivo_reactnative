// src/types/index.ts
// Tipos globales del proyecto — Estadio Deportivo: Concesiones.
//
// La forma base (id/title/body/userId) es la que devuelve JSONPlaceholder
// (usada tal cual por src/services/api.ts, que es código dado de esta
// semana). Los campos de dominio (price/type/stock/available) se agregan
// como opcionales y se completan en useItems() a partir de un catálogo
// fijo de productos del estadio, igual que en semanas 05 y 06.

export interface Item {
  id: number;
  title: string;
  body: string;
  userId: number;
  price?: number;
  type?: string;
  stock?: number;
  available?: boolean;
}

// Tipo para el estado offline de la lista
export interface ItemsWithSource {
  items: Item[];
  source: 'network' | 'cache';
}
