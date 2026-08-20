# Estadio Deportivo — Semana 04: Estado Global con Zustand

> **Programa:** Tecnólogo en Análisis y Desarrollo de Software (ADSO)
> **Institución:** SENA — Ficha 3228970
> **Aprendiz:** Yilmer Hernández Camargo
> **Bootcamp:** `bc-reactnative` — Semana 04 (Estado Global con Zustand)

## Dominio asignado

**Estadio Deportivo** — recurso `ItemConcessions`: productos de las concesiones (comida y bebidas) que se venden dentro del estadio.

Campos: `id`, `name`, `description`, `price`, `type`, `stock`, `available`.

## Qué se implementó

- **Tab Navigator** con dos pestañas: **Concesiones** (Home) y **Guardados**, con ícono `fast-food` / `fast-food-outline` para la pestaña principal.
- **Stack anidado en Home**: lista (`HomeList`) → detalle (`HomeDetail`), con params tipados.
- **Store Zustand (`useSavedStore`)** creado con `create<SavedStore>()`, sin `any`, con las acciones `addItem`, `removeItem`, `clearAll` y el helper `isItemSaved`.
- **Badge en tiempo real** en el tab "Guardados", conectado al store con un selector específico (`state => state.items.length`) — se actualiza al instante sin recargar ni pasar props entre pantallas.
- **`DetailScreen`**: botón "Guardar" / "Quitar" que lee y escribe el store, con tarjetas de detalle rediseñadas (descripción, precio, tipo, stock, disponibilidad con color según estado).
- **`SavedScreen`**: lista de guardados con botón individual para quitar cada ítem y botón "Limpiar todo".

## Bugs que encontré y corregí

- `package.json` traía `"main": "expo-router/entry"` sin `expo-router` instalado (mismo patrón de bugs de semanas anteriores). Lo cambié a `"main": "index.js"` con el `index.js` de siempre.
- `tsconfig.json` tenía `baseUrl` + `paths` para un alias `@/*`, y con TypeScript 6.0.3 eso ya es error duro al compilar. Como solo se usaba en un import, lo cambié a ruta relativa y quité `baseUrl`/`paths`.
- Dos typos de tipo: `mockData.ts` importaba `ItemConcession` (sin la "s") en vez de `ItemConcessions`, y `SavedScreen.tsx` tenía el mismo typo en el tipo de `renderItem`.
- El ícono del tab `'Kiosk'` no existe en Ionicons — lo cambié por `'fast-food'` / `'fast-food-outline'`, que sí encaja con el dominio.
- Faltaban estilos usados pero nunca definidos (`cardPrice`, `cardStock` en `HomeScreen`; `field`, `fieldLabel`, `fieldValue` en `DetailScreen`) — no compilaba.
- **Bug de reactividad en Zustand**: en `DetailScreen`, `isSaved` se calculaba llamando a la función `isItemSaved(id)` obtenida con `useSavedStore(state => state.isItemSaved)`. Seleccionar una función no suscribe a los cambios del store (la referencia de la función nunca cambia), así que el botón "Guardar" no se actualizaba visualmente aunque el store sí guardaba el ítem (el badge del tab sí funcionaba, porque ese selector sí lee `items` directamente). Se corrigió seleccionando el dato derivado directamente: `useSavedStore(state => state.items.some(i => i.id === id))`.
- Faltaba la carpeta `assets/` (el `app.json` apuntaba a íconos que no existían).

## Cómo correr

```bash
pnpm install
pnpm start
```

Escanea el QR con Expo Go (Android/iOS), presiona `a` / `i` para un emulador, o `w` para abrirlo en el navegador.
