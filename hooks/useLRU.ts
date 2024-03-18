import { ProductType } from "@/@types";
import { create } from "zustand";
interface CacheItem {
  id: string;
  value: ProductType;
}

interface LRUStore {
  cache: CacheItem[];
  setItem: (id: string, value: any) => void;
}

const useLRU = create<LRUStore>((set) => ({
  cache: [],
  setItem: (id, value) =>
    set((state) => {
      const existingIndex = state.cache.findIndex((c) => c.id == id);
      if (existingIndex !== -1) {
        const updatedCache = [
          { id, value },
          ...state.cache.slice(0, existingIndex),
          ...state.cache.slice(existingIndex + 1),
        ];
        return { cache: updatedCache };
      } else if (state.cache.length >= 5) {
        const updatedCache = [{ id, value },...state.cache.slice(0, 4)];
        return { cache: updatedCache };
      } else {
        const updatedCache = [{ id, value }, ...state.cache];
        return { cache: updatedCache };
      }
    }),
}));

export default useLRU;
