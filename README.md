# Estadio Deportivo — Semana 06: Formularios con React Hook Form + Zod

> **Programa:** Tecnólogo en Análisis y Desarrollo de Software (ADSO)
> **Institución:** SENA — Ficha 3228970
> **Aprendiz:** Yilmer Hernández Camargo
> **Bootcamp:** `bc-reactnative` — Semana 06 (Formularios con React Hook Form + Zod)

## Dominio asignado

**Estadio Deportivo** — recurso `ConcessionItem`: productos de las concesiones (comida y bebidas) que se venden dentro del estadio.

Sigo usando JSONPlaceholder como proxy de red real (igual que en semana 05) — el detalle de cómo se mapea cada post a un producto del catálogo está explicado en el README de esa semana.

## Qué se implementó

- **`FormField` genérico** (`src/components/FormField.tsx`): encapsula `Controller` + `TextInput` + mensaje de error, tipado correctamente con los generics de React Hook Form (`Control<T>`, `FieldPath<T>`) — el starter lo dejaba con `any` a propósito como TODO, y ya quedó tipado sin `any`. Se reutiliza igual en `CreateScreen` y `EditScreen`.
- **`concessionSchema`** (`src/schemas/concessionSchema.ts`): `name` (requerido, máx. 80), `price` (`z.coerce.number().positive()` — campo numérico validado desde un `TextInput` de texto), `description` (opcional, máx. 500). El tipo `ConcessionFormData` se infiere del schema, sin interfaz duplicada.
- **`CreateScreen`**: `useForm` + `zodResolver(concessionSchema)`, conectado a `useCreateConcession` (mutación de TanStack Query). Botón deshabilitado y con spinner mientras `isSubmitting`; al terminar navega atrás.
- **`EditScreen`**: cachea el patrón clave de la semana — `useConcessionById(id)` trae el producto del servidor, y un `useEffect` llama `reset({...})` cuando llegan los datos para precargar el formulario. El botón "Guardar cambios" solo se habilita cuando `isDirty` es `true` (evita guardar si no cambiaste nada).
- Mensajes de validación visibles bajo cada campo, sin usar `state` de React para validar — todo pasa por Zod.

## Un problema de tipos que encontré (y cómo lo resolví)

Al usar `z.coerce.number()` para el campo `price`, el tipo de **entrada** del formulario (lo que hay en el campo antes de validar, básicamente cualquier cosa coercible) y el tipo de **salida** (`number`, después de que Zod lo convierte) son distintos. Si `useForm` se tipa con un solo genérico (`useForm<ConcessionFormData>`), TypeScript se queja porque el `resolver` de Zod espera que la entrada y la salida sean el mismo tipo.

La solución fue exportar los dos tipos inferidos por separado — `ConcessionFormInput` (`z.input<...>`) y `ConcessionFormData` (`z.output<...>`) — y usar la forma de tres genéricos de `useForm`: `useForm<ConcessionFormInput, unknown, ConcessionFormData>`. Así `control` trabaja con el tipo de entrada (lo que hay en pantalla) y `onSubmit` recibe el tipo de salida ya validado y coercionado (`price` como `number` de verdad).

## Cómo correr

```bash
pnpm install
pnpm start
```

Escanea el QR con Expo Go (Android/iOS), presiona `a` / `i` para un emulador, o `w` para abrirlo en el navegador.

Lo probé en el navegador: envié el formulario de creación vacío y vi los dos mensajes de error de Zod ("El nombre es requerido", "El precio debe ser mayor que 0"); lo llené bien y creó el producto, volviendo solo a la lista. Después entré al detalle de "Coca Cola 500ml", confirmé que el formulario de edición se precargó solo con sus datos reales (incluida la descripción que viene de la API), cambié el precio y comprobé que el botón "Guardar cambios" solo se activa cuando el formulario está `dirty`.
