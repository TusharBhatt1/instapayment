"use client";
import animation from "@/public/form-animation.json"
import useCartDetails from "@/hooks/useCartDetails";
import React from "react";
import UserDetailsForm from "./UserDetailsForm";
import Lottie from "lottie-react"
export default function page() {
  const { cart } = useCartDetails();
  return (
    <div className="flex flex-col md:flex-row justify-center">
      <div className="hidden md:block">
        <Lottie animationData={animation}/>
      </div>
      <div>
        <UserDetailsForm />
      </div>
    </div>
  );
}
