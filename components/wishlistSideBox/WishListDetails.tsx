import React, { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { ProductType } from "@/@types";
import useCartDetails from "@/hooks/useCartDetails";
import useWishListModal, { WishList } from "@/hooks/useWishlistModal";
import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import { FaCirclePlus } from "react-icons/fa6";
import Image from "next/image";
import { FaCartArrowDown } from "react-icons/fa";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { TiDelete } from "react-icons/ti";


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

  const handleDeleteWishlist = (index:number,listname: string) => {
    setExpandedWishlist((prev)=>prev===index ? null : index)
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
    <div className="w-[80vw] md:w-[28vw] flex flex-col gap-3">
      <div className="flex justify-between px-1 items-center">
      <p className="text-xl">All Wishlists</p>
      <Link href={"/wishlist"} className="hidden md:block text-xs font-bold text-blue-700">View All</Link>
      </div>
      <div className="border border-slate-300 rounded-md">
        <div>
          {all_wishlists.length===0 ? <p className="text-slate-400 p-4">No wishlist</p> : all_wishlists.map((wishlist, index) => (
            <div className="flex flex-col border-b border-slate-300">
              <div>
                <div
                  className={`${
                    expandedWishlist === index && "bg-slate-50"
                  } p-5 flex items-center justify-between hover:cursor-pointer  py-5`}
                  onClick={() => toggleExpand(index)}
                  key={wishlist.listName}
                >
                  <div
                    className={`${
                      expandedWishlist == index && `bg-slate-200`
                    }flex flex-col gap-3`}
                  >
                    <p className="text-bold">{wishlist.listName}</p>
                    <p className="text-xs text-slate-400">
                      {wishlist.listItems.length}{" "}
                      {`${wishlist.listItems.length > 1 ? "Items" : "Item"}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                  {expandedWishlist === index ? (
                    <CiCircleChevUp size={22} />
                  ) : (
                    <CiCircleChevDown size={22} />
                  )}
                  {/* <TiDelete onClick={()=>handleDeleteWishlist(index,wishlist.listName)} size={28}/> */}
                  </div>
                  
                </div>
                {expandedWishlist === index && (
                  <div className="py-3">
                    {wishlist.listItems.map((item) => (
                      <div className="flex items-center justify-between p-3" key={item.id}>
                      <Link href={`/product/${item.id}`} className="hover:font-bold flex items-center gap-2 text-xs">
                        <Image src={item.image} height={20}  width={20} alt={item.title}/>
                       {item.title.split(" ").slice(0, 4).join(" ")}
                      </Link>
                      <div className="flex items-center gap-4">
                       <FaCartArrowDown className="cursor-pointer" size={20} onClick={()=>handleBuyNow(item)}/>
                       <IoIosRemoveCircleOutline className="cursor-pointer" size={20} onClick={()=>handleRemoveItem(wishlist.listName,item.title)}/>
                      </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div
          onClick={() => wishListModal.onOpen()}
          className="text-blue-600 cursor-pointer p-4 font-bold border-t border-slate-300 flex items-center gap-3 text-md"
        >
          <FaCirclePlus size={22} />
          <span>Create Wishlist</span>{" "}
        </div>
      </div>
    </div>
  );
  
}
