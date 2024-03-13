import { ProductType } from "@/@types";
import { create } from "zustand";

interface CartDetails {
  cart: ProductType[];
  addRandomCart: (value: ProductType[]) => void;
  addToCart: (value: ProductType) => void;
  onRemoveItem: (id: number) => void;
  grandTotal: number;
  setGrandtotal: (value: number) => void;
}

const useCartDetails = create<CartDetails>((set) => ({
  cart: [],
  addRandomCart: (value) => set({ cart: value }),
  addToCart: (value) => {
    set((state) => {
      if (state.cart.find((item) => item.id === value.id)) {
        return state;
      } else {
        return { cart: [...state.cart, value] };
      }
    });
  },
  onRemoveItem: (id) =>
    set((state) => ({ cart: state.cart.filter((item) => item.id != id) })),
  grandTotal: 0,
  setGrandtotal: (value) => set({ grandTotal: value }),
}));

export default useCartDetails;
