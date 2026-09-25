# Estadio Deportivo — Semana 09: Animaciones Básicas

> **Programa:** Tecnólogo en Análisis y Desarrollo de Software (ADSO)
> **Institución:** SENA — Ficha 3228970
> **Aprendiz:** Yilmer Hernández Camargo
> **Bootcamp:** `bc-reactnative` — Semana 09 (Animated API + LayoutAnimation)

## Dominio asignado

**Estadio Deportivo** — inventario de las **concesiones** (comida, bebida y merchandising). Cada
producto tiene nombre, categoría, precio, punto de venta y stock; la barra de progreso muestra el
**% de stock disponible** (`stock / maxStock`). Los productos viven en un store de Zustand
(`src/store/concessionsStore.ts`) para que Home y Detalle compartan el mismo inventario, incluidos
los productos que se agregan o eliminan en la sesión.

## Las 5 animaciones, aplicadas al dominio

| # | Animación | Dónde | Cómo |
| --- | --- | --- | --- |
| 1 | Entrada de la pantalla de detalle | `DetailScreen` | `Animated.parallel` de dos `timing` de 500 ms: `opacity` 0→1 y `translateY` 30→0 |
| 2 | Feedback táctil de la card | `AnimatedCard` | `Animated.spring` a `scale` 0.95 en `onPressIn`, y de vuelta a 1 con rebote (`tension 300`, `friction 10`) en `onPressOut` |
| 3 | Barra de stock | `ProgressBar` | un solo `Animated.Value` (0→progreso, 800 ms) con dos `interpolate`: ancho `'0%'→'100%'` y color rojo→amarillo→verde. Una camiseta con 12 % queda roja, una cerveza con 45 % amarilla y un perro caliente con 90 % verde |
| 4 | Entrada en cascada | `HomeScreen` | `Animated.stagger(80, ...)` con un `Animated.Value` por producto (`opacity` + `translateY` 20→0) |
| 5 | Transición de layout | `HomeScreen` | `LayoutAnimation.configureNext(easeInEaseOut)` justo antes de agregar o eliminar un producto; en Android se activa `UIManager.setLayoutAnimationEnabledExperimental` a nivel de módulo |

Además, `AnimatedButton` (timing de 80 ms al presionar + spring al soltar) da el mismo feedback
táctil a los botones "Eliminar del inventario" y "+ Añadir producto". Todas las animaciones usan
`useNativeDriver: true`, salvo la barra de progreso (`width` y `backgroundColor` no son
propiedades nativas, así que ahí es `false` a propósito).

## Bugs que encontré y corregí en el starter

- **`"main": "App.tsx"` en `package.json`** — el bug recurrente: la app nunca se monta. Cambié a
  `"expo/AppEntry"`.
- **`app.json` declaraba el plugin `expo-router`**, que no está instalado ni se usa (la navegación
  es React Navigation). Lo quité.
- **Faltaba la carpeta `assets/`** que `app.json` referencia como icono. La restauré.
- **`SafeAreaView` de `react-native`** está deprecado; usé el de `react-native-safe-area-context`
  (que ya venía instalado).
- **Stagger con items dinámicos**: el TODO del starter crea los `Animated.Value` con
  `SAMPLE_ITEMS.map(...)`, lo que rompe en cuanto se agrega un producto (`itemAnims[index]` sería
  `undefined`). Guardé los valores en un `Map` por id; los productos agregados después del stagger
  inicial nacen con valor 1 para no quedar invisibles.
- `tsconfig.json` con `baseUrl`/`paths` (`@/*`) sin usar: lo dejé solo con `strict`.

## Cómo lo verifiqué

Levanté la app con `expo start --web` y probé de verdad: los 4 productos entran en cascada, el
botón "+ Añadir producto" suma uno (el contador pasa de 4 a 5), "Eliminar del inventario" lo
quita, y tocar una card abre el detalle con su stock (barra amarilla al 45 %). `tsc --noEmit` sin
errores.

Límite del entorno: en web la app no tiene módulo nativo de animación, así que React Native avisa
`useNativeDriver is not supported ... Falling back to JS-based animation` y `LayoutAnimation` no
hace nada. Ese aviso es solo del navegador; en **Expo Go** (iOS/Android) corre con el driver
nativo y el `LayoutAnimation` sí se ve. Las curvas y tiempos de las animaciones conviene
revisarlas en el teléfono.

## Cómo correr

```bash
pnpm install
pnpm start
```

Escanea el QR con Expo Go, o abre el simulador con `i` (iOS) / `a` (Android).
