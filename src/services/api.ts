// src/services/api.ts
// Instancia Axios centralizada para el proyecto.
//
// API usada: JSONPlaceholder (https://jsonplaceholder.typicode.com), como proxy
// de red real mientras no hay backend propio desplegado para consumir desde el
// simulador — es la opción que sugiere la guía de la semana. Los hooks en
// src/hooks/useConcessions.ts mapean sus posts a la forma de ConcessionItem.

import axios from 'axios';

const API_BASE_URL =
  process.env['EXPO_PUBLIC_API_URL'] ?? 'https://jsonplaceholder.typicode.com';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Interceptor de respuesta — log de errores de red en desarrollo
apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (__DEV__) {
      if (axios.isAxiosError(error)) {
        console.error('[API Error]', error.response?.status, error.config?.url);
      } else {
        console.error('[API Error]', error);
      }
    }
    return Promise.reject(error);
  },
);
