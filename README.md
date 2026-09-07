# Estadio Deportivo — Semana 07: Persistencia Local

> **Programa:** Tecnólogo en Análisis y Desarrollo de Software (ADSO)
> **Institución:** SENA — Ficha 3228970
> **Aprendiz:** Yilmer Hernández Camargo
> **Bootcamp:** `bc-reactnative` — Semana 07 (Persistencia Local)

## Dominio asignado

**Estadio Deportivo** — productos de las concesiones (comida y bebidas), consumidos vía
JSONPlaceholder como proxy de red (igual que semanas 05/06), enriquecidos con un catálogo fijo
de productos del estadio (precio, tipo, disponibilidad) mapeado por id de forma determinística.

## Los tres patrones de storage, aplicados al dominio

- **MMKV** (`usePreferences`) — 3 preferencias reactivas y síncronas: `sortOrder` (A→Z / Z→A),
  `compactMode` (menos info por tarjeta) e `itemsPerPage`. `HomeScreen` las aplica en vivo: ordena
  la lista y cambia el layout de cada fila sin ningún `async/await`.
- **AsyncStorage** (`useItems`) — cada fetch exitoso guarda la lista enriquecida en
  `@items_cache`. Si la petición de red falla, se recupera del caché y `HomeScreen` muestra el
  banner "⚠️ Sin red — mostrando datos guardados localmente".
- **Expo SecureStore** — un PIN de ejemplo (`concessions_register_pin`, el PIN de caja de las
  concesiones) se guarda/lee/elimina con `setItemAsync`/`getItemAsync`/`deleteItemAsync`. El valor
  nunca se muestra completo en pantalla — solo una versión enmascarada (`PIN•••821`).

## Bugs que encontré y corregí

- **`package.json` con `"main": "App.tsx"`** — mismo bug recurrente de siempre: sin
  `registerRootComponent`, la app nunca se monta. Agregué `index.js` y cambié `main` a
  `"index.js"`.
- **`itemSchema.ts` usaba `required_error`** — sintaxis de Zod v3, ya no existe en Zod v4 (la
  versión pineada en este proyecto). Cambié a `{ error: '...' }`.
- **`SettingsScreen.tsx` (dado) usaba `TYPOGRAPHY.subtitle`, `RADIUS.xs` y `COLORS.error`**, pero
  el `theme/index.ts` (también dado) no los definía — no compilaba. Agregué esos tres tokens al
  theme.
- **La API de `react-native-mmkv` cambió en la v4.3.2** (la pineada): `new MMKV(...)` ya no
  existe — ahora es `createMMKV(...)`, parte de la migración del paquete a Nitro Modules. El
  `src/storage/mmkv.ts` que trae el starter todavía usaba la sintaxis vieja y no compilaba. Lo
  corregí a la API real del paquete instalado.

## Cómo lo verifiqué (y qué no pude verificar aquí)

`react-native-mmkv` v4 resultó tener una implementación web propia (`createMMKV.web.ts`), así que
pude levantar la app en el navegador y probar MMKV y AsyncStorage de verdad:

- Cambié "Orden de la lista" a Z→A y "Modo compacto" a activado en Ajustes, volví a Home y
  confirmé que la lista aplicó ambos cambios en vivo (orden invertido, tarjetas compactas).
- Confirmé en `localStorage` del navegador que la clave `app-storage\pref_compactMode` quedaba en
  `"true"` — no es solo estado de React, es persistencia real.
- Confirmé que `@items_cache` (la caché de AsyncStorage) se escribe en cada fetch exitoso.

**Expo SecureStore no tiene implementación web** (a diferencia de MMKV) — al presionar "Guardar"
en el navegador lanza `setValueWithKeyAsync is not a function`. Esto es una limitación real del
entorno donde armé este proyecto (sin macOS/Xcode para iOS, sin emulador Android configurado), no
un bug del código: `SecureStore` sí es compatible con **Expo Go**, así que te recomiendo probar
esa sección específica desde tu teléfono con `pnpm start` y escaneando el QR — ahí sí vas a poder
guardar/leer/eliminar el PIN de verdad. El resto de la app (lista, crear, MMKV, AsyncStorage) la
dejé completamente verificada.

## Cómo correr

```bash
pnpm install
pnpm start
```

Escanea el QR con Expo Go para probar todo, incluido SecureStore. Para un build nativo completo
(requerido formalmente por la semana): `pnpm expo run:android` o `pnpm expo run:ios`.
