"use client";
import React from "react";
import Modal from "./Modal";
import useCartModal from "@/hooks/useCartModal";
import useCartDetails from "@/hooks/useCartDetails";
import Image from "next/image";
import { TiDeleteOutline } from "react-icons/ti";
import Empty from "@/Others/Empty";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CartModal() {
  const { onClose, isOpen } = useCartModal();
  const { cart, onRemoveItem } = useCartDetails();
  const router = useRouter();
  const subtotal = cart.reduce((a, b) => a + b.price, 0);

  const body = (
    <div>
      {cart.length === 0 ? (
        <div className="flex flex-col gap-7">
          <Empty />
          <p className="flex flex-col gap-2">
            <span className="font-bold">YOUR CART IS EMPTY.</span>
            <span> Let’s personalise your cart.</span>
          </p>
        </div>
      ) : (
        <div className="max-h-[60vh] overflow-auto">
          <div>
            {cart.map((item) => (
              <div
                className="flex justify-center gap-4  items-center border-b border-slate-200 p-4"
                key={item.id}
              >
                <Image
                  className="flex-1"
                  src={item.image}
                  height={20}
                  width={20}
                  alt={item.title}
                />
                <span className="flex-2 text-xs w-full">{item.title}</span>
                <div className=" flex-1 flex text-end w-full">
                  <span>₹{item.price}</span>
                  <span
                    className="ml-7 rounded-full cursor-pointer hover:bg-slate-200 inline-block"
                    onClick={() => {
                      onRemoveItem(item.id);
                      toast.success("Removed");
                    }}
                  >
                    <TiDeleteOutline size={20} />
                  </span>
                </div>
              </div>
            ))}
          </div>
         
        </div>
      )}
    </div>
  );
  const footer=(
    <div className="mt-4 border-x-slate-100 text-lg text-slate-400">
    <p>subtotal - ₹ {subtotal}</p>
  </div>
  )

  const onSubmit = () => {
    if (cart.length === 0) router.push("/");
    else router.push("/cart");
    onClose();
  };
  return (
    <Modal
      title="CART"
      isOpen={isOpen}
      footer={footer}
      isCart
      onClose={onClose}
      body={body}
      actionLabel={cart.length === 0 ? "Add Items" : "Place Order"}
      onSubmit={onSubmit}
    />
  );
}
