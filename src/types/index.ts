// src/types/index.ts
// Tipos de datos del dominio — Estadio Deportivo: Concesiones

export interface ConcessionItem {
  id: string;
  name: string;
  description: string;
  price: number;
  type: string;
  stock: number;
  available: boolean;
}

// Payload para crear un producto nuevo (sin id — lo asigna el servidor)
export interface CreateConcessionPayload {
  name: string;
  description: string;
  price: number;
}

// Payload para actualizar (id requerido + campos editables)
export interface UpdateConcessionPayload {
  id: string;
  name: string;
  description: string;
  price: number;
}
