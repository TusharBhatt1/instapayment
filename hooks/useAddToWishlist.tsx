import { ProductType } from "@/@types";
import { create } from "zustand";

interface AddToProps {
  productToAdd: ProductType;
  setProduct: (product: ProductType) => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useAddToWishlist = create<AddToProps>((set) => ({
  productToAdd: {
    id: 0,
    title: "",
    image: "",
    price: 0,
    quantity: 1,
    category: "",
    description: "",
    rating: { rate: 0, count: 0 },
  },
  setProduct: (product) => set({ productToAdd: product }),
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
export default useAddToWishlist;
