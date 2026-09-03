// src/schemas/concessionSchema.ts
// Schema Zod para el formulario de producto de las concesiones.

import { z } from 'zod';

export const concessionSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre es requerido')
    .max(80, 'Máx. 80 caracteres'),

  price: z.coerce
    .number({ error: 'El precio es requerido' })
    .positive('El precio debe ser mayor que 0'),

  description: z
    .string()
    .max(500, 'Máx. 500 caracteres')
    .optional()
    .or(z.literal('')),
});

// Dos tipos inferidos automáticamente — sin interfaz duplicada:
// - Input:  lo que hay en los campos del formulario antes de validar (price puede ser texto)
// - Output: lo que produce Zod después de validar/coercionar (price ya es number)
// Se necesitan ambos porque z.coerce.number() hace que el tipo de entrada y salida difieran.
export type ConcessionFormInput = z.input<typeof concessionSchema>;
export type ConcessionFormData = z.output<typeof concessionSchema>;
