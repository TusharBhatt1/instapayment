"use client";
import Modal from "./Modal";
import useWishListModal from "@/hooks/useWishlistModal";
import useAddToWishlist from "@/hooks/useAddToWishlist";
import toast from "react-hot-toast";
import { JSX } from "react";

export default function AddToWishlistModal() {
  const wishlist = useWishListModal();
  const addToWishlistModal = useAddToWishlist();

  const onCreateNew = () => {
    addToWishlistModal.onClose();
    wishlist.onOpen();
  };

  const addToExisting = (listName: string) => {
    wishlist.setSelectedWishlist(listName);

    //check if it already exists in the selected one
    const selectWishlistItems = wishlist.all_wishlists.find(
      (l) => l.listName === listName
    )
    //@ts-ignore
    const alreadyExists = selectWishlistItems.listItems.some(
      (i) => i.id === addToWishlistModal.productToAdd.id
    );
    if (alreadyExists) {
      toast.error("Already Exists in the Wishlist");
      wishlist.setSelectedWishlist("");
      addToWishlistModal.onClose();
      return;
    } else {
      wishlist.addToSelectedWishlist(addToWishlistModal.productToAdd);
      wishlist.setSelectedWishlist("");
      toast.success("Added");
      addToWishlistModal.onClose();
    }
  };
  
  let body: JSX.Element;

  if (wishlist.all_wishlists.length === 0) {
    body = (
      <div>
        <p className="text-sm text-slate-400">
          No wishlist, kindly create new.
        </p>
      </div>
    );
  } else {
    body = (
      <div className="flex flex-col gap-4">
        <p className="text-slate-500 text-sm mb-2">In which one you want to add ?</p>
        {wishlist.all_wishlists.map((wishlist) => (
          <li
            className="text-bold bg-slate-100 hover:bg-green-300 p-1 rounded-md cursor-pointer"
            onClick={() => addToExisting(wishlist.listName)}
            key={wishlist.listName}
          >
            {wishlist.listName}
          </li>
        ))}
      </div>
    );
  }

  return (
    <Modal
      isOpen={addToWishlistModal.isOpen}
      onSubmit={onCreateNew}
      onClose={()=>{
        addToWishlistModal.onClose()
      //@ts-ignore
        addToWishlistModal.setProduct("")
      }}
      actionLabel="Create New"
      title="Select Wishlist"
      body={body}
    />
  );
}
