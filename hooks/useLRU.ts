//@ts-nocheck
import { ProductType } from "@/@types";
import { create } from "zustand";
interface CacheItem {
  id: string;
  value: ProductType;
}

interface LRUStore {
  cache: CacheItem[];
  setItem: (id: string, value: any) => void;
  getItem: (id: string) => ProductType;
}

const useLRU = create<LRUStore>((set) => ({
  cache: [],
  setItem: (id: string, value: any) => {
    set((state) => {
      const existingIndex = state.cache.findIndex((item) => item.id === id);
      if (existingIndex !== -1) {
        state.cache.unshift(state.cache.splice(existingIndex, 1)[0]);
        state.cache[0].value = value; // Update value
      } else {
        if (state.cache.length >= 5) {
          state.cache.pop();
        }

        state.cache.unshift({ id, value });
      }
      return { cache: [...state.cache] };
    });
  },
  getItem: (id: string) => {
    const itemIndex = state.cache.findIndex((item) => item.id === id);
    if (itemIndex !== -1) {
      // Move the item to the front
      const [item] = state.cache.splice(itemIndex, 1);
      state.cache.unshift(item);
      return item.value;
    }
    return undefined;
  },
}));

export default useLRU;
