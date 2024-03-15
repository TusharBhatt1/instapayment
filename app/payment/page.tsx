"use client";

import useCartDetails from "@/hooks/useCartDetails";
import useUserDetails from "@/hooks/useUserDetails";
import Image from "next/image";
import React, { useState } from "react";
import {
  FaCheckCircle,
  FaInfoCircle,
  FaRupeeSign,
  FaShoppingCart,
} from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import PaymentForm from "./PaymentForm";
import { FaCreditCard, FaMobile } from "react-icons/fa";
import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";

export default function page() {
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const { user } = useUserDetails();
  const [expandOrder, setExpandOrder] = useState(false);
  const { cart, grandTotal } = useCartDetails();
  const pricing = [
    { name: "Subtotal", value: grandTotal + 50 },
    { name: "Shipping", value: 0 },
    { name: "GrandTotal", value: grandTotal },
  ];
  return (
    <div>
      {/* main */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 px-12">
        {/* //left */}
        <div className="flex flex-col gap-7">
          <div className="border w-full rounded-md border-slate-200 p-4 flex flex-col gap-2">
            <span className="border-b border-slate-100 font-bold">
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
        <div className="border border-gray-200 rounded-md p-4 bg-slate-50">
          <h2 className="border-b border-gray-200 pb-2">
            Review Details
            <FaInfoCircle className="inline-block ml-2 text-gray-400" />
          </h2>
          <div
            onClick={() => setExpandOrder(!expandOrder)}
            className="bg-white rounded-md cursor-pointer flex items-center justify-between p-1 border-b border-gray-200"
          >
            <span className="text-gray-600 p-1 ">
              <FaShoppingCart className="inline-block mr-1" />
              Total ({cart.length})
            </span>
            <span className="cursor-pointer">
              {expandOrder ? (
                <CiCircleChevUp size={24} />
              ) : (
                <CiCircleChevDown size={24} />
              )}
            </span>
          </div>
          {expandOrder && (
            <div className="overflow-y-auto max-h-40 text-xs">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 border-b border-gray-200"
                >
                  <div className="flex items-center">
                    <Image
                      src={item.image}
                      alt={item.title}
                      height={20}
                      width={20}
                      className="rounded-full"
                    />
                    <span className="ml-2">{item.title}</span>
                  </div>
                  <span>
                    <FaRupeeSign className="inline-block mr-1" />
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
          )}
          <div className="mt-4 font-bold bg-white rounded-md p-2">
            <p className="text-gray-600">Shipping Details:</p>
            <ul className="list-disc pl-6">
              <li>{user.name}</li>
              <li>
                {user.num}, {user.alt_num}
              </li>
              <li>{user.email}</li>
              <li>{user.address}</li>
            </ul>
          </div>
          <div className="flex flex-col gap-4 p-2 mt-2 bg-white rounded-md">
            {pricing.map((price, i) => (
              <div
                className="flex flex-cols border-b border-slate-200 gap-2 justify-between"
                key={i}
              >
                <span>{price.name}</span>
                <span>
                  <FaRupeeSign className="inline-block mr-1" />
                  {price.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
