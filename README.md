# Estadio Deportivo — Semana 02: Listas, Inputs y Estilos

> **Programa:** Tecnólogo en Análisis y Desarrollo de Software (ADSO)
> **Institución:** SENA — Ficha 3228970
> **Aprendiz:** Yilmer Hernández Camargo
> **Bootcamp:** `bc-reactnative` — Semana 02 (Listas, Inputs y Estilos)

## Dominio asignado

**Estadio Deportivo** — recurso `ItemConcessions`: productos de las concesiones (comida y bebidas) que se venden dentro del estadio durante los eventos.

Campos: `id`, `name`, `price`, `type`, `description`, `stock`, `available`.

## Qué se implementó

- Pantalla principal (`HomeScreen`) con `FlatList` + `TextInput` de búsqueda en tiempo real, filtrando por nombre (case-insensitive) con `useMemo`.
- Estado vacío personalizado (`ListEmptyComponent`) cuando la búsqueda no encuentra productos.
- `renderItem` y el componente de estado vacío memoizados con `useCallback`.
- `keyExtractor` por `id` (nunca por índice), `ItemSeparatorComponent` entre tarjetas y `keyboardShouldPersistTaps` para no perder el tap al tocar la lista con el teclado abierto.
- `KeyboardAvoidingView` para que el teclado no tape el contenido en iOS/Android.
- Componente `ItemCard` reutilizable que muestra nombre, precio, tipo, descripción, disponibilidad y stock de cada producto.
- 10 productos reales de concesiones en `src/data/mockData.ts` (gaseosas, cerveza, comida típica como lechona y empanadas, etc.).
- Estilos con las constantes de `src/theme/index.ts` (`COLORS`, `TYPOGRAPHY`, `SPACING`, `RADIUS`), sin valores hardcodeados.
- Tipado estricto en TypeScript, sin `any`.

## Un bug que me encontré (y cómo lo resolví)

El patrón de `KeyboardAvoidingView` + `TouchableWithoutFeedback` para cerrar el teclado al tocar fuera del input (el que sugiere el propio starter) hace que en la versión web el buscador pierda el foco apenas escribes: en React Native Web el `TouchableWithoutFeedback` no usa el sistema de "responder" nativo, así que el clic sobre el `TextInput` termina burbujeando hasta el `TouchableWithoutFeedback` y dispara `Keyboard.dismiss()`, que blurea el input recién enfocado. En nativo (iOS/Android) esto no pasa porque el input "reclama" el toque antes de que llegue al padre.

La solución fue envolver el contenido con `TouchableWithoutFeedback` solo cuando `Platform.OS !== 'web'`; en web se renderiza el contenido directo, sin ese wrapper (tampoco tiene mucho sentido "cerrar teclado" en un navegador).

## Cómo correr

```bash
pnpm install
pnpm start
```

Escanea el QR con Expo Go (Android/iOS), presiona `a` / `i` en la terminal para abrir en un emulador, o `w` para abrirlo en el navegador.
