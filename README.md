# Estadio Deportivo — Semana 05: Networking y TanStack Query v5

> **Programa:** Tecnólogo en Análisis y Desarrollo de Software (ADSO)
> **Institución:** SENA — Ficha 3228970
> **Aprendiz:** Yilmer Hernández Camargo
> **Bootcamp:** `bc-reactnative` — Semana 05 (Networking y TanStack Query)

## Dominio asignado

**Estadio Deportivo** — recurso `ConcessionItem`: productos de las concesiones (comida y bebidas) que se venden dentro del estadio.

Campos: `id`, `name`, `description`, `price`, `type`, `stock`, `available`.

## API usada

La guía de la semana sugiere usar [JSONPlaceholder](https://jsonplaceholder.typicode.com) (`/posts` como proxy) mientras no hay una API propia desplegada, así que la app consume `GET /posts` de verdad. Para que la pantalla se vea coherente con el dominio en vez de mostrar posts genéricos, `src/hooks/useConcessions.ts` mapea cada post real (por su `id`) a un catálogo fijo de 10 productos del estadio — mismo id siempre produce el mismo producto en la lista y en el detalle. La **descripción** que se ve en pantalla sí es el `title` real que devuelve la API, para dejar claro que los datos vienen de la red y no están hardcodeados.

Al crear un producto (`POST /posts`), JSONPlaceholder no persiste realmente el registro (es una API de práctica) — devuelve un `id` fake y el mismo body que mandaste. Por eso, tras crear, `invalidateQueries` sí dispara un refetch real de la lista, pero como el POST nunca llegó a guardarse del lado del servidor, el conteo de productos no cambia. Es una limitación conocida de usar una API fake, no un bug del código: lo importante para la semana es que la invalidación de caché funciona.

## Qué se implementó

- **`src/services/api.ts`**: instancia de Axios con `baseURL` (configurable por `EXPO_PUBLIC_API_URL`) e interceptor de respuesta que loguea errores de red en desarrollo.
- **`src/hooks/useConcessions.ts`**:
  - `useConcessions()` — `useQuery` que trae la lista y la mapea a `ConcessionItem[]`.
  - `useConcessionById(id)` — `useQuery` para el detalle, con `enabled: !!id`.
  - `useCreateConcession()` — `useMutation` que hace `POST` y en `onSuccess` invalida `CONCESSIONS_QUERY_KEY` para refrescar la lista.
- **`App.tsx`**: `QueryClientProvider` envolviendo toda la app, con un `QueryClient` creado una sola vez fuera del componente.
- **`HomeScreen`**: `FlatList` con estados de `isLoading` (spinner), `isError` (mensaje + botón "Reintentar"), vacío (`ListEmptyComponent`) y pull-to-refresh (`onRefresh={refetch}` / `refreshing={isFetching && !isLoading}`).
- **`DetailScreen`**: trae el detalle fresco del servidor con `useConcessionById`, mostrando descripción, precio, tipo, stock y disponibilidad.
- **`CreateScreen`**: formulario con nombre y precio obligatorios, conectado a `useCreateConcession`; el botón se deshabilita mientras `isPending === true` y al terminar navega de vuelta a la lista.

## Un par de bugs que encontré en el starter

- `package.json` traía `"main": "expo-router/entry"` sin `expo-router` instalado (mismo bug recurrente de siempre) — usé `index.js` con `registerRootComponent`.
- `tsconfig.json` tenía `baseUrl` + `paths` para un alias `@/*` que no se usaba en ningún archivo, y con TypeScript 6.0.3 eso es error duro al compilar — lo quité.
- El `CreateScreen.tsx` del starter tenía `color: COLORS.text` en los estilos del input, pero el tema no define `text` (solo `textPrimary`, `textSecondary`, `textMuted`) — lo corregí a `COLORS.textPrimary`.

## Cómo correr

```bash
pnpm install
pnpm start
```

Escanea el QR con Expo Go (Android/iOS), presiona `a` / `i` para un emulador, o `w` para abrirlo en el navegador.

Lo probé en el navegador: la lista carga los 15 productos con datos reales de la API, entré al detalle de "Coca Cola 500ml" (fetch independiente), y creé un producto nuevo desde el formulario — la app volvió sola a la lista sin recargar la página, confirmando que `onSuccess` e `invalidateQueries` funcionan.
