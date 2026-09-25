# Estadio Deportivo — Mis entregas de `proyecto-estadio-deportivo-reactnative`

> **Programa:** Tecnólogo en Análisis y Desarrollo de Software (ADSO)  
> **Institución:** SENA  
> **Aprendiz:** Yilmer Hernández Camargo  
> **Ficha:** 3228970  

---

## Presentación del Proyecto

Este repositorio documenta el progreso, entrega y evolución de mis actividades prácticas para el **Bootcamp de reactnative** durante el presente trimestre. 

Para fomentar un aprendizaje práctico y diversificado, el bootcamp asigna un dominio de negocio único a cada aprendiz. En mi caso, el proyecto gira en torno a la gestión e infraestructura lógica de un **Estadio Deportivo**, simulando las operaciones de backend necesarias para coordinar eventos masivos (partidos, conciertos, espectáculos) y sus servicios asociados.

---

## Entidades del Dominio

El sistema se estructura conceptualmente alrededor de cuatro entidades principales:

| Módulo | Descripción | Casos de Uso Principales |
| :--- | :--- | :--- |
| **events** | Gestión de programación para partidos, conciertos u otros espectáculos masivos. | Crear fechas, definir aforos y consultar estado de eventos. |
| **seats** | Representación física y distribución de las zonas del estadio. | Asignación de sectores, filas y numeración de asientos. |
| **tickets** | Proceso de reserva, venta y validación para el acceso al recinto. | Control de disponibilidad, compra y emisión de entradas. |
| **concessions** | Gestión de comercios internos y servicios de consumo dentro del estadio. | Catálogo de productos, control de inventario y órdenes. |

*Nota: La implementación de cada módulo se aborda de forma progresiva según los requerimientos entregables de cada semana.*

---

## Estructura y Navegación del Repositorio

El código fuente del proyecto no se almacena centralizado en la rama principal, sino estructurado mediante **ramas por entregable (`feature branches`)**:

* **`main`**: Funciona exclusivamente como portada, documentación general y punto de entrada al repositorio.
* **`week-XX`**: Ramas independientes para cada entrega semanal (ejemplo: `week-01`, `week-02`). Cada una contiene la implementación del código funcional, pruebas y configuraciones correspondientes a ese módulo.

```text
proyecto-estadio-deportivo-reactnative/
├── README.md (Rama: main - Portada principal)
└── [Ramas de trabajo]
    ├── 🌿 week-01 (App de tarjetas — concesiones)
    ├── 🌿 week-02 (Listas, inputs y estilos)
    ├── 🌿 week-03 (React Navigation 7)
    ├── 🌿 week-04 (Estado global con Zustand)
    ├── 🌿 week-05 (Networking y TanStack Query v5)
    ├── 🌿 week-06 (Formularios con React Hook Form + Zod)
    ├── 🌿 week-07 (Persistencia local)
    └── 🌿 week-08 (Autenticación y estado global)
```