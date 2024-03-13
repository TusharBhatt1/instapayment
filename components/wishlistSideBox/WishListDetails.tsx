
import React, { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { ProductType } from "@/@types";
import useCartDetails from "@/hooks/useCartDetails";
import useWishListModal, { WishList } from "@/hooks/useWishlistModal";

interface WishlistDetailsProps {
  all_wishlists: WishList[];
}

export default function WishListDetails({
  all_wishlists,
}: WishlistDetailsProps) {
  const [expandedWishlist, setExpandedWishlist] = useState<number | null>(null);
  const wishListModal = useWishListModal();
  const { addToCart } = useCartDetails();

  const toggleExpand = (index: number) => {
    setExpandedWishlist((prev) => (prev === index ? null : index));
  };

  const handleDeleteWishlist = (listname: string) => {
    wishListModal.onDeleteWishlist(listname);
    toast.success("Removed");
  };
  const handleRemoveItem = (listname: string, itemname: string) => {
    wishListModal.removeItemFromWishlist(listname, itemname);
  };

  const handleBuyNow = (item: ProductType) => {
    addToCart(item);
   
    toast.success("Added to cart");
  };

  return (
    <div className="mt-10 md:mt-20 flex w-[80vw]  md:w-[28vw] ml-2 sm:ml-4 mr-4 shadow-md  p-2 h-[50vh] md:h-[55vh] flex-col justify-center items-center">
      <div className=" rounded-md justify-center p-4 items-center h-full w-full overflow-x-auto ">
        <div className="w-full h-full m-auto">
          <p className="text-center">
            All WishLists ({all_wishlists.length})
          </p>
          <hr />
          <div className="space-y-4 mt-4">
            {all_wishlists.length !== 0 ? (
              all_wishlists.map((wishlist, index) => (
                <div
                  key={index}
                  className="border-b-2 border-slate-200 p-2 rounded"
                >
                  <div className="grid grid-cols-3 items-center mb-2">
                    <p
                      className=" text-sm  cursor-pointer"
                      onClick={() => toggleExpand(index)}
                    >
                      {wishlist.listName} {" "}
                      <span className="text-xs text-slate-300">
                        ({wishlist.listItems.length})
                      </span>
                    </p>
                    <button
                      onClick={() => toggleExpand(index)}
                      className="text-blue-500  focus:outline-none"
                    >
                      {expandedWishlist === index ? "▲" : "▼"}
                    </button>
                    <button
                      className="text-sm text-red-500 mx-4"
                      onClick={() => handleDeleteWishlist(wishlist.listName)}
                    >
                      Remove
                    </button>
                  </div>
                  {expandedWishlist === index && (
                    <ul className="list-disc">
                      {wishlist.listItems.map((item: ProductType) => (
                        <div
                          className="flex justify-between gap-2 px-2 items-center"
                          key={item.id}
                        >
                          <Link
                            className="hover:underline"
                            href={`/product/${item.id}`}
                          >
                            <li className="mb-2">
                              <span className="text-sm">{item.title}</span>{" "}
                              <span className="text-xs text-slate-400">
                                - Rs {item.price}
                              </span>
                            </li>
                          </Link>
                          <div className="flex gap-4">
                            <button
                              className="hover:font-bold  text-sm  text-blue-600"
                              onClick={() => handleBuyNow(item)}
                            >
                              Buy
                            </button>
                            <button
                              className="hover:font-bold  text-sm  text-red-600"
                              onClick={() =>
                                handleRemoveItem(wishlist.listName, item.title)
                              }
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </ul>
                  )}
                </div>
              ))
            ) : (
              <p className="text-slate-400 p-4">No Wishlist</p>
            )}
          </div>
        </div>
      </div>
      <button
        className="border-blue-100 text-blue-500 font-extrabold border-2 mt-4 m-auto rounded-lg p-1"
        onClick={() => wishListModal.onOpen()}
      >
        + Create new wishlist
      </button>
    </div>
  );
}
