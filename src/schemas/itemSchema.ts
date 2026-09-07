// src/schemas/itemSchema.ts
// Schema Zod para validar el formulario de creación (semana 06).

import { z } from 'zod';

export const itemSchema = z.object({
  title: z
    .string({ error: 'El nombre es requerido' })
    .min(1, 'El nombre no puede estar vacío')
    .max(80, 'Máximo 80 caracteres'),
  body: z
    .string()
    .max(500, 'Máximo 500 caracteres')
    .optional()
    .or(z.literal('')),
});

// El tipo se infiere del schema — no duplicar con interface manual
export type ItemFormData = z.infer<typeof itemSchema>;
