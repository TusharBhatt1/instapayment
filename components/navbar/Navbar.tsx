"use client";
import React, { useEffect } from "react";
import logo from "@/public/groww60x60.3befb3a3.svg";
import Link from "next/link";
import Image from "next/image";
import { GiShoppingCart } from "react-icons/gi";
import { CiHeart } from "react-icons/ci";
import useCartModal from "@/hooks/useCartModal";
import { icons } from "@/Others/Icons";
import useCartDetails from "@/hooks/useCartDetails";
import { ProductType } from "@/@types";
import useAllProducts from "@/hooks/useAllProducts";
import Searchbar from "./Searchbar";

export default function Navbar({
  randomCart,
  allProductss,
}: {
  randomCart: ProductType[];
  allProductss: ProductType[];
}) {
  const { addRandomCart, cart } = useCartDetails();

  useEffect(() => {
    addRandomCart(randomCart);
    setAllProducts(allProductss.slice(0, 8));
  }, []);
  const cartModal = useCartModal();
  const { setAllProducts } = useAllProducts();

  const categories = ["Men", "Women", "Kids"];

  return (
    <div className="flex flex-col gap-2 z-40 ">
      <div className="fixed w-full bg-black text-white flex justify-between sm:justify-around items-center p-4 border-b z-50 border-slate-100">
        <Link className="flex items-center gap-3" href={"/"}>
          <Image priority src={logo} height={40} width={40} alt="logo" />
          <span className="hidden md:block font-extrabold text-2xl">unbox</span>
        </Link>

        <div className="hidden md:flex justify-center items-center gap-7">
          {categories.map((ctg) => (
            <span
              key={ctg}
              className="p-1"
            >
              {ctg}
            </span>
          ))}
        </div>
        <div className="hidden md:block">
          <Searchbar />
        </div>
        <div className="flex justify-center items-center gap-7">
          <Link href={"/wishlist"}>
            <CiHeart size={28} />
          </Link>
          <div
            className="flex items-center cursor-pointer"
            onClick={cartModal.onOpen}
          >
            <div>
              <GiShoppingCart size={28} />
            </div>
            <span className="text-black bg-white rounded-full p-1 px-2 relative bottom-2">
              {cart.length}
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-2 pt-24 mb-4 justify-evenly flex-wrap px-2 sm:px-0">
        {icons.map((i, index) => (
          <div className="flex flex-col justify-center items-center gap-2 " key={index}>
            <Image src={i.image} alt="icon" height={55} width={55} />
            <span className="text-xs font-bold">{i.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
