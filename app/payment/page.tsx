"use client";

import useCartDetails from "@/hooks/useCartDetails";
import useUserDetails from "@/hooks/useUserDetails";
import Image from "next/image";
import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import PaymentForm from "./PaymentForm";
import { FaCreditCard, FaMobile } from "react-icons/fa";
import { CiCircleChevDown , CiCircleChevUp } from "react-icons/ci";

export default function page() {
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const {user}=useUserDetails()
  const [expandOrder, setExpandOrder]=useState(false)
  const {cart,grandTotal}=useCartDetails()
 
  return (
    <div>
      {/* main */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 px-12">
        {/* //left */}
        <div className="flex flex-col gap-4">
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
                <span className="flex gap-2 items-center"><FaMobile/> UPI</span>
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

                <span className="flex gap-2 items-center "><FaCreditCard/> Cards</span>
              </div>
            </div>
          </div>
          <div>
           <PaymentForm grandTotal={grandTotal} paymentMethod={paymentMethod}/>
          </div>
        </div>
        {/* right */}
        <div>
          <div className="border border-slate-100 p-4 rounded-md ">
            <p className="border-b border-slate-100" >Review Details</p>
            <p className="text-center text-xs mt-2 flex items-center justify-center gap-2">
               <span className="text-slate-400">Total ({cart.length})</span> 
               <span onClick={()=>setExpandOrder(!expandOrder)} className="cursor-pointer">
               {expandOrder ? <CiCircleChevUp size={22}/> : <CiCircleChevDown size={22}/>}
                </span> 
                 </p>

           {expandOrder && <div>
               {cart.map((item)=>(
                <div className="flex justify-between items-center p-2 border-b border-slate-200" key={item.id}>
                    <Image src={item.image} alt={item.title} height={20} width={20} className="rounded-full"/>
                    <span>₹ {item.price}</span>
                    
                </div>
               ))}
            </div>}
            <div className="mt-4 font-bold">
       
            <li>{user.name}</li>
            <li>{user.num} , {user.alt_num}</li>
            <li>{user.email}</li>
            <li>{user.address}</li>
           
         
            </div>
          </div>
          <div>
           
          </div>
        </div>
      </div>
    </div>
  );
}
