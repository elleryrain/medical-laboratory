import { create } from "zustand";

interface WarehouseItem {
  id: number;
  name: string;
  total: number;
  unused: number;
  inUse: number;
  resource?: string;
}

export interface WarehouseStore {
  items: WarehouseItem[];
}

export const useWarehouseStore = create<WarehouseStore>(() => ({
  items: [
    { id: 0, name: "Циркониевый диск", total: 4, unused: 4, inUse: 2 },
    { id: 1, name: "Воск моделировочный для Када", total: 6, unused: 6, inUse: 0 },
    { id: 2, name: "PEEK", total: 2, unused: 2, inUse: 0 },
    { id: 3, name: "Пластина для кап", total: 7, unused: 7, inUse: 0 },
    { id: 4, name: "Пластик PMMA", total: 9, unused: 9, inUse: 0 },
    { id: 5, name: "Пластик PMMA", total: 11, unused: 11, inUse: 0 },
  ],
}));