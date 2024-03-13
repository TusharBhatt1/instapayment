import { ProductType } from "@/@types";
import { create } from "zustand";
export interface WishList {
  listName: string;
  listItems: ProductType[];
}
interface Props {
  all_wishlists: WishList[];
  setAllWishlists: (item: WishList) => void;
  selectedWishlist: string;
  setSelectedWishlist: (value: string) => void;
  addToSelectedWishlist: (value: ProductType) => void;
  onDeleteWishlist: (listname: string) => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  removeItemFromWishlist: (listname: string, itemName: string) => void;
}
const useWishListModal = create<Props>((set) => ({
  all_wishlists: [],
  selectedWishlist: "",
  setSelectedWishlist: (value) => set({ selectedWishlist: value }),
  addToSelectedWishlist: (value) =>
    set((state) => {
      const wishlist = state.all_wishlists.find(
        (list) => list.listName === state.selectedWishlist
      );
      wishlist?.listItems.push(value);
      return { all_wishlists: [...state.all_wishlists] };
    }),
  removeItemFromWishlist: (listname, itemname) =>
    set((state) => {
      const updatedWishList = state.all_wishlists.map((wishlist) => {
        if (wishlist.listName === listname) {
          const updatedItems = wishlist.listItems.filter(
            (i) => i.title !== itemname
          );
          return { ...wishlist, listItems: updatedItems };
        }
        return wishlist;
      });
      return { all_wishlists: updatedWishList };
    }),
  setAllWishlists: (item) =>
    set((state) => ({ all_wishlists: [...state.all_wishlists, item] })),
  onDeleteWishlist: (listname: string) =>
    set((state) => ({
      all_wishlists: state.all_wishlists.filter(
        (item) => item.listName !== listname
      ),
    })),
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useWishListModal;
