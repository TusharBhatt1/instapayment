import { ProductType } from "@/@types";
import useAddToWishlist from "@/hooks/useAddToWishlist";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiHeart } from "react-icons/ci";

export default function ProductCard({ product }: { product: ProductType }) {
  const { id, title, price, image, description } = product;
  const sizes = ["S", "M", "L"];
  const addToWishlistModal = useAddToWishlist();

  const handleAddToWishlist = (product: ProductType) => {
    addToWishlistModal.onOpen();
    addToWishlistModal.setProduct(product);
  };

  return (
    <div className="flex flex-col flex-wrap justify-between mt-4 rounded-md p-1 ">
      <div className=" flex flex-wrap justify-between">
        <Link href={`/product/${id}`}>
          <Image
            className="img"
            src={image}
            alt={title}
            height={80}
            width={80}
          />
        </Link>
      </div>
      <div className="grid grid-rows-2 gap-1pa items-start justify-start">
        <p className="text-xs text-slate-400 mt-1">
          {title.split(" ").slice(0, 4).join(" ")}
        </p>
        <div className="flex justify-between gap-4 items-center">
          <p>₹ {price}</p>
          <button
            className="text-gray-700 text-sm border rounded-lg p-1 duration-150 hover:bg-gray-100"
            onClick={() => handleAddToWishlist(product)}
          >
            Wishlist
          </button>{" "}
        </div>
        <div className="flex items-center gap-3 mt-3">
          {sizes.map((s, i) => (
            <span className="border border-black p-1 w-10  text-center" key={i}>
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
