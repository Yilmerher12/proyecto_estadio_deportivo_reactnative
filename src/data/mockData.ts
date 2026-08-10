import { ItemConcessions as ItemConcessions } from '../types';

// ============================================
// MOCK DATA — Semana 02
// Reemplaza estos items genéricos con datos
// reales de tu dominio asignado.
//
// REQUISITO: mínimo 10 items
// ============================================

// TODO: Renombra ITEMS a algo descriptivo de tu dominio
//       Ejemplo: BOOKS, MEDICINES, MEMBERS, DISHES...
// TODO: Actualiza el tipo Item con los campos de tu dominio
// TODO: Rellena con datos reales y variados de tu dominio

export const ITEMS: ItemConcessions[] = [
    {
        id: '1',
        name: 'Coca Cola 500ml',
        price: 3.99,
        type: 'drink',
        description: 'A cold refreshing coke drink.',
        stock: 5,
        available: true,
        // TODO: agregar campos de tu dominio
    },
    {
        id: '2',
        name: 'Empanada de Carne',
        price: 3500,
        type: 'food',
        description: 'Crispy fried empanada stuffed with shredded beef and potatoes.',
        stock: 25,
        available: true,
    },
    {
        id: '3',
        name: 'Cerveza Águila 330ml',
        price: 5000,
        type: 'drink',
        description: 'Ice-cold national lager beer in a can.',
        stock: 40,
        available: true,
    },
    {
        id: '4',
        name: 'Lechona Tolimense',
        price: 12000,
        type: 'food',
        description: 'Traditional slow-roasted pork served with yellow peas and a plain corn cake.',
        stock: 15,
        available: true,
    },
    {
        id: '5',
        name: 'Papa Rellena',
        price: 4000,
        type: 'food',
        description: 'Fried mashed potato ball stuffed with seasoned beef, rice, and boiled egg.',
        stock: 20,
        available: true,
    },
    {
        id: '6',
        name: 'Gaseosa Postobón 400ml',
        price: 3500,
        type: 'drink',
        description: 'Ice-cold soda available in Apple or Colombiana flavors.',
        stock: 30,
        available: true,
    },
    {
        id: '7',
        name: 'Papas Criollas',
        price: 3000,
        type: 'snack',
        description: 'Deep-fried golden small potatoes seasoned with salt.',
        stock: 35,
        available: true,
    },
    {
        id: '8',
        name: 'Chorizo con Arepa',
        price: 6000,
        type: 'food',
        description: 'Grilled pork sausage served with a white corn cake.',
        stock: 18,
        available: true,
    },
    {
        id: '9',
        name: 'Agua Mineral 500ml',
        price: 2500,
        type: 'drink',
        description: 'Purified still bottled water.',
        stock: 50,
        available: true,
    },
    {
        id: '10',
        name: 'Jugo Natural 300ml',
        price: 4000,
        type: 'drink',
        description: 'Freshly squeezed natural juice.',
        stock: 40,
        available: true,
    }
    // TODO: puedes agregar más items para hacer la demo más rica
];