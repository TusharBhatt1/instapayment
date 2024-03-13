"use client";
import Empty from "@/Others/Empty";
import CartItem from "@/components/Card/CartItem";
import OrderList from "@/components/OrderList";
import PricingDetails from "@/components/PricingDetails";
import useCartDetails from "@/hooks/useCartDetails";
import useOTPModal from "@/hooks/useOTPModal";
import Link from "next/link";
import React from "react";

export default function page() {
  const { cart, setGrandtotal } = useCartDetails();
  const { onOpen } = useOTPModal();
  const subtotal = cart.reduce((a, b) => a + b.price, 0);

  if (cart.length === 0)
    return (
      <div className="flex flex-col gap-2 justify-center items-center p-4">
        <Empty />
        <p>Cart is Empty</p>
        <Link className="font-bold underline" href={"/"}>
          Add
        </Link>
      </div>
    );
  return (
    <div className="flex flex-col sm:flex-row justify-between border border-slate-100 py-7 px-8 md:px-32 gap-12">
     <OrderList cart={cart}/>
     
      <PricingDetails
        onOpen={onOpen}
        cartLength={cart.length}
        cartPrice={subtotal}
        setGrandtotal={setGrandtotal}
      />
    </div>
    
  );
}
