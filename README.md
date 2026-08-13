# Estadio Deportivo — Semana 03: React Navigation 7

> **Programa:** Tecnólogo en Análisis y Desarrollo de Software (ADSO)
> **Institución:** SENA — Ficha 3228970
> **Aprendiz:** Yilmer Hernández Camargo
> **Bootcamp:** `bc-reactnative` — Semana 03 (React Navigation)

## Dominio asignado

**Estadio Deportivo** — recurso `ConcessionsItem`: productos de las concesiones (comida y bebidas) que se venden dentro del estadio.

Campos: `id`, `name`, `description`, `price`, `type`, `stock`, `available`.

## Qué se implementó

- **Tab Navigator** (`@react-navigation/bottom-tabs`) con dos pestañas: **Catálogo** (Home) y **Mis Guardados** (Favorites), con íconos de `Ionicons` que cambian según la pestaña activa y color de acento `#61DAFB`.
- **Stack Navigator anidado** dentro de la pestaña Home: `HomeList` (lista) → `HomeDetail` (detalle), con header propio por pantalla (`HeaderTintColor`, título dinámico con el nombre del producto).
- **Params tipados** de punta a punta con `RootTabParamList` y `HomeStackParamList` — al navegar al detalle se pasa el producto completo (`id`, `name`, `type`, `description`, `price`, `stock`, `available`), sin usar `any`.
- `HomeScreen`: `FlatList` con los 10 productos, mostrando nombre, descripción, precio y tipo.
- `DetailScreen`: lee los params con `useRoute` y muestra cada campo del producto en tarjetas.
- `FavoritesScreen`: lista estática de 3 productos guardados como favoritos.
- Estilos con las constantes de `src/theme/index.ts` (`COLORS`, `TYPOGRAPHY`, `SPACING`, `RADIUS`).

## Bugs del starter que encontré y corregí

- `package.json` traía `"main": "expo-router/entry"` sin tener `expo-router` instalado (y el proyecto ni siquiera usa expo-router, usa `NavigationContainer` manual). Lo cambié a `"main": "index.js"` y agregué el `index.js` con `registerRootComponent`, igual que en semana 02.
- `app.json` tenía `"plugins": ["expo-router"]`, que rompía el arranque por la misma razón. Lo quité.
- `DetailScreen.tsx` importaba `NativeStackRouteProp` desde `@react-navigation/native-stack`, un tipo que no existe en la v7 de esa librería (solo existe `NativeStackNavigationProp`). El tipo de ruta genérico (`RouteProp`) en realidad vive en `@react-navigation/native`.
- `tsconfig.json` tenía `baseUrl` junto a `paths` para un alias `@/*` que no se usaba en ningún archivo. Con TypeScript 6.0.3 (la versión pineada), `baseUrl` ya está deprecado y da error duro al compilar, así que quité ambos.
- Faltaba la carpeta `assets/` (el `app.json` apuntaba a íconos que no existían).

## Cómo correr

```bash
pnpm install
pnpm start
```

Escanea el QR con Expo Go (Android/iOS), presiona `a` / `i` para un emulador, o `w` para abrirlo en el navegador.
