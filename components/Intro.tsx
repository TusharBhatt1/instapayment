"use client"
import React, { useEffect } from "react";
import Lottie from "lottie-react";
import animation from "@/public/Groww-Animation.json";
import useIntro from "@/hooks/useIntro";

export default function Intro() {

    const {isOpen,onClose}=useIntro()
     
    useEffect(()=>{
    setTimeout(()=>onClose(),3000)
    },[])
    if(isOpen){
        return (
            <div className="flex justify-center h-[100vh] absolute bg-black z-50 w-[99.2vw] ">
              <div>
                <Lottie animationData={animation} />
              </div>
            </div>
          );
    }

}
