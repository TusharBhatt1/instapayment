import { ProductType } from "@/@types";
import React from "react";
import CartItem from "./Card/CartItem";

export default function OrderList({ cart }: { cart: ProductType[] }) {
  return (
    <div className="w-full  p-2">
      <div className="flex flex-col gap-4">
        {cart.map((item) => (
          <CartItem key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}
