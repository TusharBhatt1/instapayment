import { create } from "zustand";

export interface CacheItem {
  key: string;
  value: any;
}

class LRUCache {
  capacity: number;
  cache: CacheItem[];

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = [];
  }

  isCacheFull() {
    return this.cache.length === this.capacity;
  }

  setItem(key: string, value: any) {
    if (this.isCacheFull()) {
      this.cache.pop();
    }
    this.cache.unshift({ key, value });
  }

  getItem(key: string) {
    const cacheItem = this.cache.find((item) => item.key === key);
    if (cacheItem) {
      // Move the found item to the front
      this.cache = this.cache.filter((item) => item.key !== key); // Remove the item
      this.cache.unshift(cacheItem); // Move it to the front
      return cacheItem.value;
    }
    return undefined;
  }
}

interface LRUStore {
  cache: CacheItem[];
  setItem: (key: string, value: any) => void;
  getItem: (key: string) => any;
}

const useLRU = create<LRUStore>((set) => {
  const totalCache = new LRUCache(5);

  return {
    cache: [...totalCache.cache], // Return a copy of the cache array
    setItem: (key: string, value: any) => {
      const existingIndex = totalCache.cache.findIndex(
        (item) => item.key === key
      );

      // If key not found, add the item
      if (existingIndex === -1) totalCache.setItem(key, value);
      else totalCache.cache[existingIndex].value = value;

      set({ cache: [...totalCache.cache] });
    },
    getItem: (key: string) => {
      return totalCache.getItem(key);
    },
  };
});

export default useLRU;
