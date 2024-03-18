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
      const existingIndex = state.cache.findIndex((c) => c.id === id);
      if (existingIndex !== -1) {
        const item = state.cache.splice(existingIndex, 1)[0];
        state.cache.unshift(item);
      } else if (state.cache.length >= 5) {
        state.cache.pop();
        state.cache.unshift({ id, value });
      } else {
        state.cache.unshift({ id, value });
      }
      return { cache: [...state.cache] };
    }),
}));

export default useLRU;
