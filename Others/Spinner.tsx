import React from "react";
import { BiLoader } from "react-icons/bi";
export default function Spinner() {
  return (
    <div className="flex justify-center items-center">
     
        <BiLoader className="animate-spin" size={24} />
   
    </div>
  );
}
