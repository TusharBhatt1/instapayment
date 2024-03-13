"use client";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import useOTPModal from "@/hooks/useOTPModal";
import useCartDetails from "@/hooks/useCartDetails";
import { MdOutlineLocalOffer } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import PhoneValidation from "../otpVerification/PhoneValidation";
import EnterOtp from "../otpVerification/EnterOtp";

export default function OTPModal() {
  const { onClose, isOpen } = useOTPModal();
  const { grandTotal } = useCartDetails();
  const [showEnterOTP,setShowEnterOTP]=useState(false)
  const [isValid , setIsValid]=useState(false)


  const body = (
    <div className="bg-slate-50 flex flex-col gap-4 text-md p-2">
      <div className="flex font-bold text-lg justify-between items-center p-1 bg-white border-b border-slate-100">
        <span>Grandtotal</span>
        <span>₹{grandTotal}</span>
      </div>
      <div className="flex flex-col gap-4  p-1">
        <div className="flex items-center gap-2 bg-white p-2">
          <>
            <MdOutlineLocalOffer />
            <span>View Offers and Coupons</span>
          </>
          <MdKeyboardDoubleArrowRight />
        </div>
        <p className="text-xs font-bold">Have a gift card?</p>
      </div>
      <div>
    {!showEnterOTP ? <PhoneValidation setShowEnterOTP={setShowEnterOTP} setIsValid={setIsValid}/>
    :<EnterOtp onClose={onClose}/>
    
     }
    
      </div>
    </div>
  );

  const footer=(
    <div className="font-bold mt-7 text-xs flex justify-around items-center border-2 border-slate-100 py-4 rounded-lg">
        <div>
        <p className="text-slate-400">Your Order is Protectd by</p>
        <p className="text-bold text-blue-600">Simpl Sure</p>
        </div>
        <div className="flex justify-between items-center gap-2 border border-blue-600  p-1 rounded-lg">
         <p className="text-slate-500 line-through text-xs">₹50</p>
         <p className="text-green-500">Free</p>
        </div>
    </div>
  ) 
  return (
    <Modal
      onClose={onClose}
      title="Verify Number"
      isOpen={isOpen}
      body={body}
      disabled={!isValid || showEnterOTP}
      actionLabel="Send OTP"
      onSubmit={()=>setShowEnterOTP(true)}
      footer={footer}
    />
  );
}
