# Estadio Deportivo — Semana 01: App de Tarjetas (Concesiones)

> **Programa:** Tecnólogo en Análisis y Desarrollo de Software (ADSO)
> **Institución:** SENA — Ficha 3228970
> **Aprendiz:** Yilmer Hernández Camargo
> **Bootcamp:** `bc-reactnative` — Semana 01 (Core Components y Flexbox)

## Dominio asignado

**Estadio Deportivo** — recurso `ConcessionItem`: productos de las concesiones (comida, bebidas y merchandising) que se venden dentro del estadio.

Campos: `id`, `name`, `image`, `subtitle`, `type`, `price`, `stock`, `available`.

## Qué se implementó

- Pantalla principal (`HomeScreen`) con header del dominio y lista de tarjetas dentro de un `ScrollView`.
- Componente `ItemCard` reutilizable: imagen, nombre, subtítulo, tipo, precio y estado de stock, con `Pressable` y feedback visual al tocar.
- 6 productos de ejemplo en `src/data/mockData.ts`, con fotos propias en `assets/`.
- Estilos con `StyleSheet.create` (sin estilos inline), sin `position: absolute`, sin librerías de UI externas.
- Tipado estricto en TypeScript (`src/types/index.ts`).

## Cómo correr

```bash
pnpm install
pnpm start
```

Escanea el QR con Expo Go (Android/iOS) o presiona `a` / `i` en la terminal para abrir en un emulador.
