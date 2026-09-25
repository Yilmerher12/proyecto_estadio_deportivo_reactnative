# Estadio Deportivo — Semana 10: Reanimated 4 y Gesture Handler

> **Programa:** Tecnólogo en Análisis y Desarrollo de Software (ADSO)
> **Institución:** SENA — Ficha 3228970
> **Aprendiz:** Yilmer Hernández Camargo
> **Bootcamp:** `bc-reactnative` — Semana 10 (Animaciones avanzadas y gestos)

## Dominio asignado

**Estadio Deportivo** — catálogo de **concesiones** (bebidas, comida y merchandising) con un pedido
en curso. Cada producto tiene nombre, categoría, precio, stock y foto. El estado vive en un store de
Zustand (`src/store/concessionsStore.ts`) que comparten Home y Detalle: `order` (unidades pedidas por
producto) y las acciones `addToOrder` y `markSoldOut`.

## Qué implementé

| Requisito | Implementación en el dominio |
| --- | --- |
| **SwipeableCard** con `Gesture.Pan` | Swipe **→** (más de 120 px) = **🛒 añadir al pedido**; swipe **←** = **🚫 marcar agotado**; si no llega al umbral, snap-back con `withSpring(0)`. Rotación ±20° con `interpolate` y dos indicadores que aparecen a medida que se acerca al umbral |
| **AnimatedButton** con `Gesture.Tap` | Reemplaza al `TouchableOpacity`: `withSpring` a 0.93 al tocar y de vuelta a 1 al soltar; `onPress` se invoca con `runOnJS` solo si el toque se completó (`success`) |
| **HomeScreen** con entrada escalonada | Cada card usa `useSharedValue` + `useAnimatedStyle` con `withDelay(index * 80, withTiming(...))` (opacity + translateY). Sin `Animated` de `react-native` |
| **DetailScreen** con fade + slide | `withTiming` de opacity (500 ms) y `withDelay(80, withTiming(translateY 30→0))` |
| **PinchableImage** (bonus) | `Gesture.Pinch` con patrón `savedScale`; el zoom se limita entre 1× y 4× con `withSpring` |

Además: al tocar una card se navega al detalle con `Gesture.Race(pan, tap)`; la barra inferior del
Home muestra el pedido (unidades y total); el botón "Añadir al pedido" se deshabilita si no queda
stock, y "Agotado" pone el inventario en 0 y quita el producto del pedido.

`App.tsx` envuelve todo en `GestureHandlerRootView` (con `flex: 1`) y `babel.config.js` mantiene
el plugin de worklets como **último** plugin.

## Bugs y ajustes sobre el starter

- **`"main": "App.tsx"`** en `package.json`, el bug recurrente: sin `registerRootComponent` la app no
  monta. Agregué `index.js` que registra `App` y apunté `main` a él.
- **El pan de la tarjeta bloqueaba el scroll de la lista.** Con `Gesture.Pan()` a secas, cualquier
  movimiento sobre la card se lo queda el gesto y la `FlatList` no scrollea en vertical. Agregué
  `.activeOffsetX([-10, 10])` y `.failOffsetY([-15, 15])`: el pan solo se activa tras 10 px
  horizontales y cede ante un scroll vertical.
- **Los indicadores de swipe del starter están dentro de la tarjeta animada**, así que se mueven con
  ella y nunca se ven detrás. Los saqué a un contenedor aparte (no se mueven) y les asigné una
  `opacity` interpolada según el desplazamiento; el starter calculaba esas opacidades en comentarios
  pero nunca las aplicaba.
- **`SwipeableCard` ignoraba la prop `onPress`**: no había forma de abrir el detalle desde una card.
  Se resolvió con `Gesture.Tap` compitiendo con el pan (`Gesture.Race`).
- **El zoom mínimo del starter (0.5×)** permitía encoger la foto por debajo de su marco; lo subí a 1×.
- `app.json` no tenía `foregroundImage` del icono adaptativo ni la carpeta `assets/`; los agregué.
  `tsconfig.json` traía un alias `@/*` sin `baseUrl` ni uso: lo quité.

## Cómo lo verifiqué (y qué no pude verificar aquí)

Levanté la app con `expo start --web` y probé de verdad en el navegador:

- Las cards entran en cascada (capturé el estado intermedio de la animación).
- Arrastre **derecha** sobre "Gaseosa": el pedido pasó a `1 productos · $6.000` y la card mostró
  "1 en el pedido" mientras volvía al centro con spring.
- Arrastre **izquierda** sobre "Agua": su etiqueta cambió de "Poco stock" a **"Agotado"**.
- Tap sobre "Helado de vainilla": navega al detalle, que carga la foto y el precio.
- Botón "Añadir al pedido" del detalle (`Gesture.Tap`): "En tu pedido" pasó de 0 a 1.
- `tsc --noEmit` sin errores.

**No pude probar el pellizco (`Gesture.Pinch`)**: en el navegador con mouse no hay gesto multitáctil.
La lógica (`savedScale` + límites 1×–4×) está implementada y compila, pero conviene comprobarla en
**Expo Go** con dos dedos. Tampoco puedo confirmar la fluidez a 60 fps en un teléfono real: en web
Reanimated corre en el hilo JS, no en el de UI.

Al reinstalar `node_modules` durante el trabajo, Metro dejó de resolver `expo` por una caché de
archivos vieja en `%TEMP%` (`metro-file-map-expo-*`); borrarla lo arregló. No es un problema del
proyecto, pero si te pasa el mismo "Unable to resolve module", es eso.

## Cómo correr

```bash
pnpm install
pnpm start
```

Escanea el QR con Expo Go (SDK 57) para probar todos los gestos, incluido el pellizco.
