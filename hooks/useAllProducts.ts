import { ProductType } from "@/@types";
import { create } from "zustand";

interface AllProducts {
  allProducts: ProductType[] ,
  setAllProducts: (value: ProductType[]) => void;
 
}

const useAllProducts = create<AllProducts>((set) => ({
  allProducts: [],
  setAllProducts: (value) => set({ allProducts: value }),

}));

export default useAllProducts;
