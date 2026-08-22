// src/data/mockData.ts
// Datos de ejemplo genéricos para el proyecto.
// El estudiante debe reemplazar estos datos con los de su dominio asignado.

import type { ItemConcessions } from '../types';

// ============================================================
// LISTA DE ÍTEMS
// ============================================================
// TODO: reemplaza estos ítems con los de tu dominio asignado.
//   Biblioteca  → libros con author, year, genre
//   Farmacia    → medicamentos con price, stock, prescription
//   Gimnasio    → clases con instructor, schedule, capacity
//   Restaurante → platillos con price, category, spiceLevel
//   Cine        → películas con director, duration, genre
export const ITEMS: ItemConcessions[] = [
    {
        id: '1',
        name: 'Coca Cola 500ml',
        price: 3.99,
        type: 'drink',
        description: 'A cold refreshing coke drink.',
        image: 'https://exitocol.vtexassets.com/arquivos/ids/34385169/Coca-Cola-Vidrio-300-ml-310750_b.jpg?v=639211338918600000',
        stock: 5,
        available: true,
    },
    {
        id: '2',
        name: 'Empanada de Carne',
        price: 3500,
        type: 'food',
        description: 'Crispy fried empanada stuffed with shredded beef and potatoes.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQirHdGC8obKi5Hnbr5Cmsso1dhO6e8avzfLbbGe9IgqA&s=10',
        stock: 25,
        available: true,
    },
    {
        id: '3',
        name: 'Cerveza Águila 330ml',
        price: 5000,
        type: 'drink',
        description: 'Ice-cold national lager beer in a can.',
        image: 'https://exitocol.vtexassets.com/arquivos/ids/32289968/Cerveza-Lata-AGUILA-330-Mililitro-105964_a.jpg?v=639045299897300000',
        stock: 40,
        available: true,
    },
    {
        id: '4',
        name: 'Lechona Tolimense',
        price: 12000,
        type: 'food',
        description: 'Traditional slow-roasted pork served with yellow peas and a plain corn cake.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq4RkLeEZ5T0hWtz0LuSdtQ2qslYR624I_WZLgNkzwXQ&s=10',
        stock: 15,
        available: true,
    },
    {
        id: '5',
        name: 'Papa Rellena',
        price: 4000,
        type: 'food',
        description: 'Fried mashed potato ball stuffed with seasoned beef, rice, and boiled egg.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTauxg3PPanpDflkVGTN0E89EfBozIIBxdXp3AezsjLvg&s=10',
        stock: 20,
        available: true,
    },
    {
        id: '6',
        name: 'Gaseosa Postobón 400ml',
        price: 3500,
        type: 'drink',
        description: 'Ice-cold soda available in Apple or Colombiana flavors.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK3nTWYWIdK0Fp8TuPSx-32arK2XSR9x-qsJZB9s45BA&s=10',
        stock: 30,
        available: true,
    },
    {
        id: '7',
        name: 'Papas Criollas',
        price: 3000,
        type: 'snack',
        description: 'Deep-fried golden small potatoes seasoned with salt.',
        image: 'https://cloudfront-us-east-1.images.arcpublishing.com/elespectador/RAHLOC5TXJERFGGO3MZWETZHSU.jpg',
        stock: 35,
        available: true,
    },
    {
        id: '8',
        name: 'Chorizo con Arepa',
        price: 6000,
        type: 'food',
        description: 'Grilled pork sausage served with a white corn cake.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJrfc12EWN76RnXo_P84FX7P03nEd6I5p0-PDoX_JkmA&s=10',
        stock: 18,
        available: true,
    },
    {
        id: '9',
        name: 'Agua Mineral 500ml',
        price: 2500,
        type: 'drink',
        description: 'Purified still bottled water.',
        image: 'https://exitocol.vtexassets.com/arquivos/ids/34400431/Agua-Mineral-Natural-MANANTIAL-500-Mililitro-3014170_a.jpg?v=639211465253700000',
        stock: 50,
        available: true,
    },
    {
        id: '10',
        name: 'Jugo Natural 300ml',
        price: 4000,
        type: 'drink',
        description: 'Freshly squeezed natural juice.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4dxGHzgG3JPDG-XRvfqsxR1muGbGt3UDczl9M0NQqSQ&s=10',
        stock: 40,
        available: true,
    }
];