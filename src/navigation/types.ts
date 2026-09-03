// src/navigation/types.ts
// Tipado del stack de navegación

export type RootStackParamList = {
  Home: undefined;
  Create: undefined;
  Edit: { id: string; name: string };
};
