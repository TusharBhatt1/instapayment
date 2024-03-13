"use client";
import WishListDetails from "./WishListDetails";
import useWishListModal from "@/hooks/useWishlistModal";

export default function WishLists() {
  const { all_wishlists } = useWishListModal();
  return <WishListDetails all_wishlists={all_wishlists} />;
}
