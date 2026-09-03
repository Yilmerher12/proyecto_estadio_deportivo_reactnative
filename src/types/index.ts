// src/types/index.ts
// Interfaces del dominio — Estadio Deportivo: Concesiones

export interface ConcessionItem {
  id: string;
  name: string;
  description: string;
  price: number;
  type: string;
  stock: number;
  available: boolean;
}

// Payload de creación — lo que se envía en el POST (el id lo asigna el servidor)
export type CreateConcessionPayload = Omit<ConcessionItem, 'id'>;
