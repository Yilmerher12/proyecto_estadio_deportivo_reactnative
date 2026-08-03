// ============================================================
// MOCK DATA — src/data/mockData.ts
// ============================================================
// Catálogo de ejemplo para las concesiones del Estadio Deportivo.
// ============================================================

import { ConcessionItem } from '../types';

export const MOCK_ITEMS: ConcessionItem[] = [
    {
        id: '1',
        name: 'Burger',
        subtitle: 'Delicious beef burger with cheese, lettuce and tomato',
        image: require('../../assets/burger.jpg'),
        type: 'Food',
        price: 20000,
        stock: 20,
        available: true,
    },
    {
        id: '2',
        name: 'Coke',
        subtitle: 'Refreshing Coca-Cola can',
        image: require('../../assets/coca_cola.jpg'),
        type: 'Drink',
        price: 4000,
        stock: 10,
        available: true,
    },
    {
        id: '3',
        name: 'Lechona',
        subtitle: 'Traditional colombiand roasted pork dish',
        image: require('../../assets/LEchona_dish.jpg'),
        type: 'Food',
        price: 10000,
        stock: 15,
        available: true,
    },
    {
        id: '4',
        name: 'Millonarios Fc cap',
        subtitle: 'Official Millonarios Football Club cap',
        image: require('../../assets/millonarios_cap.webp'),
        type: 'Merchandise',
        price: 50000,
        stock: 5,
        available: true,
    },
    {
        id: '5',
        name: 'Millonarios Fc jersey',
        subtitle: 'Official Millonarios Football Club jersey',
        image: require('../../assets/millonarios_jeeyrs.jpg'),
        type: 'Merchandise',
        price: 150000,
        stock: 3,
        available: true,
    },
    {
        id: '6',
        name: 'Chicken Sandwich',
        subtitle: 'Grilled chicken sandwich with lettuce and mayo',
        image: require('../../assets/chicken_sandwich.jpg'),
        type: 'Food',
        price: 15000,
        stock: 8,
        available: true,
    }
]
export default MOCK_ITEMS;