// src/stores/savedStore.ts
// Store Zustand para gestionar los productos de concesiones guardados.

import { create } from 'zustand';
import type { ItemConcessions } from '../types';

interface SavedStore {
    // Lista de ítems guardados
    items: ItemConcessions[];
    addItem: (item: ItemConcessions) => void;
    removeItem: (id: string) => void;
    clearAll: () => void;
    isItemSaved: (id: string) => boolean;
}


export const useSavedStore = create<SavedStore>((set, get) => ({
    items: [],

    addItem: (item) => {
        const alreadySaved = get().items.some((i) => i.id === item.id);
        if (alreadySaved) return;
        set((state) => ({ items: [...state.items, item] }));
    },

    removeItem: (id) => {
        set((state) => ({ items: state.items.filter((i) => i.id !== id) }));
    },

    clearAll: () => {
        set({ items: [] });
    },

    isItemSaved: (id) => {
        return get().items.some((i) => i.id === id);
        },
}));