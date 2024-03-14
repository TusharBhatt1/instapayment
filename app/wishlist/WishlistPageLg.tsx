"use client";
import React, {useState } from "react";
import useWishListModal from "@/hooks/useWishlistModal";
import { MdDeleteOutline } from "react-icons/md";
import { ProductType } from "@/@types";
import Button from "@/components/Button";
import toast from "react-hot-toast";
import { FaCirclePlus } from "react-icons/fa6";
import useAddToWishlist from "@/hooks/useAddToWishlist";
import useCartDetails from "@/hooks/useCartDetails";


export default function WishlistPageLg() {
  const { all_wishlists, onOpen, removeItemFromWishlist,onDeleteWishlist } = useWishListModal();
  const {addToCart}=useCartDetails()
  const [selectedWishlist, setSelectedWishlist] = useState("");
  //@ts-ignore
  const [items, setItems] = useState<ProductType[]>([]);
  
  const handleSelect = (name: string) => {
    setSelectedWishlist(name);
    setItems(
      all_wishlists.filter((list) => list.listName === name)[0].listItems
    );
  };

  const handleRemoveItem = (listname: string, itemname: string) => {
    removeItemFromWishlist(listname, itemname);
    toast.success("Removed Item");
     setItems((prevItems) =>
    prevItems.filter((item) => item.title !== itemname)
  );
    
  };
  const handleDeleteList=(listName:string)=>{
  onDeleteWishlist(listName)
  setItems([])
  setSelectedWishlist("")
  toast.success("List Deleted");

  }

  return (
    <div className="flex p-4 w-[100vw] justify-center items-center">
      <div className="py-4 flex flex-col gap-4 w-1/2">
        {all_wishlists.length === 0 && selectedWishlist==="" ? (
          <div className="flex flex-col">
            <p className="text-slate-400">No wishlist</p>
            <Button label="Create" onClick={()=>onOpen()} />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex gap-7">
              {all_wishlists.map((wishlist) => (
                <div
                  className="flex justify-center items-center border-b border-slate-100"
                  key={wishlist.listName}
                >
                  <p
                    onClick={() => handleSelect(wishlist.listName)}
                    className={`border-2 cursor-pointer border-slate-200 ${
                      selectedWishlist === wishlist.listName &&
                      " bg-black text-white"
                    } px-7 py-2 rounded-lg`}
                  >
                    {wishlist.listName}
                  </p>
                  { selectedWishlist===wishlist.listName &&
                    <button onClick={()=>{handleDeleteList(wishlist.listName)}}>
                      <MdDeleteOutline size={30} />
                    </button>
                  }
                </div>
              ))}
              <button
                onClick={onOpen}
              >
                <FaCirclePlus size={32}/>
              </button>
            </div>
            <hr />
            {selectedWishlist &&
            <div className="text-sm">
                
              <p className="text-slate-400">ITEMS</p>
              {items.length===0 && <p>None</p>}
              {items.map((item) => (
                <div className="grid grid-cols-2 gap-4" key={item.id}>
                  <li>{item.title}</li>
                  <div className="flex items-center gap-7">
                  <button
                    onClick={() =>
                      handleRemoveItem(selectedWishlist, item.title)
                    }
                    className="text-red-500"
                  >
                    remove
                  </button>
                  <button className="text-blue-500" onClick={()=>{
                    toast.success("Added to cart")
                    addToCart(item)}}>
                    Add to cart
                  </button>
                  </div>
                </div>
              ))}
            </div>
}
          </div>
        )}
      </div>
    </div>
  );
}
