import { ProductType } from "@/@types";
import useCartDetails from "@/hooks/useCartDetails";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { GiReturnArrow } from "react-icons/gi";
import Link from "next/link";

export default function CartItem({ product }: { product: ProductType }) {
  const { id, title, image, price,quantity } = product;
  const { onRemoveItem } = useCartDetails();
  return (
    <div className="flex justify-between items-start w-full p-2 rounded-md border-b border-slate-200">
      <div>
        <div className="flex justify-center items-center gap-5">
          <Link href={`/product/${id}`}>
            <Image src={image} alt={title} height={40} width={40} />
          </Link>
          <div className="flex flex-col gap-2 md:gap-4">
            <span> {title.split(" ").slice(0, 4).join(" ")}</span>
            <div className="flex gap-4 text-center">
              <span className="bg-slate-100 rounded-xl p-1 px-2">Qty:<span className="font-bold">{" "}1</span></span>
              <span className="bg-slate-100 rounded-xl p-1 px-2">Size:<span className="font-bold">{" "}Free</span></span>
              <span className="hidden sm:block text-xs rounded-xl p-1 px-2 border text-blue-600 font-bold border-blue-500">{quantity} left</span>
            </div>
            <p className=" font-bold">₹ {price}</p>
            <span className="flex justify-center items-center gap-1 font-bold"><GiReturnArrow/> 14 Days return</span>
          </div>
        </div>
      </div>
      <div>
        <IoClose
          size={24}
          className="hover:bg-slate-100 cursor-pointer rounded-full"
          onClick={() => {
            onRemoveItem(id);
            toast.success("Removed");
          }}
        />
      </div>
    </div>
  );
}
