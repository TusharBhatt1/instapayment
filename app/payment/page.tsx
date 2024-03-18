"use client";

import useCartDetails from "@/hooks/useCartDetails";

import React, { useState } from "react";
import {
  FaCheckCircle,
} from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import PaymentForm from "./PaymentForm";
import { FaCreditCard, FaMobile } from "react-icons/fa";

import ReviewDetails from "./ReviewDetails";

export default function page() {
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const { cart, grandTotal } = useCartDetails();
 
  return (
    <div>
      {/* main */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 px-12">
        {/* //left */}
        <div className="flex flex-col gap-7">
          <div className="border w-full rounded-md border-slate-200 p-4 flex flex-col gap-2">
            <span className="border-b border-slate-100 font-bold p-2">
              Payment Methods
            </span>
            <div className="flex flex-col gap-4">
              <div
                onClick={() => setPaymentMethod("UPI")}
                className={`${
                  paymentMethod === "UPI" && "bg-green-200 "
                } hover:cursor-pointer hover:bg-green-200 border-b border-slate-200 flex justify-between p-2 items-center`}
              >
                {paymentMethod === "UPI" ? (
                  <FaCheckCircle />
                ) : (
                  <FaRegCheckCircle />
                )}
                <span className="flex gap-2 items-center">
                  <FaMobile /> UPI
                </span>
              </div>
              <div
                onClick={() => setPaymentMethod("Cards")}
                className={`${
                  paymentMethod === "Cards" && "bg-green-200"
                } hover:cursor-pointer hover:bg-green-200 flex justify-between p-2 items-center`}
              >
                {paymentMethod === "Cards" ? (
                  <FaCheckCircle />
                ) : (
                  <FaRegCheckCircle />
                )}

                <span className="flex gap-2 items-center ">
                  <FaCreditCard /> Cards
                </span>
              </div>
            </div>
          </div>
          <div>
            <PaymentForm
              grandTotal={grandTotal}
              paymentMethod={paymentMethod}
            />
          </div>
        </div>
        {/* right */}
        <ReviewDetails grandTotal={grandTotal} cart={cart}/>
      </div>
    </div>
  );
}
