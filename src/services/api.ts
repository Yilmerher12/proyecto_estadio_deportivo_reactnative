// src/services/api.ts — Instancia centralizada de Axios
//
// API usada: JSONPlaceholder, como proxy de red real (igual que en semana 05)
// mientras no hay un backend propio desplegado para el simulador.

import axios from 'axios';

const API_BASE_URL =
  process.env['EXPO_PUBLIC_API_URL'] ?? 'https://jsonplaceholder.typicode.com';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor global de errores
apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (__DEV__) {
      if (axios.isAxiosError(error)) {
        console.error('[API error]', error.response?.status, error.config?.url);
      } else {
        console.error('[API error]', error);
      }
    }
    return Promise.reject(error);
  },
);
