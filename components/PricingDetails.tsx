import React, { useState } from "react";
import { CiDiscount1 } from "react-icons/ci";
import Button from "./Button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
export default function PricingDetails({
  cartLength,
  cartPrice,
  setGrandtotal,
  onOpen
}: {
  cartLength: number;
  cartPrice: number;
  setGrandtotal:(v:number)=>void,
  onOpen:()=>void
}) {
  const [donation, setDonation] = useState(0);
  const [coupon, setCoupon] = useState(0);
  const pricingDetails = [
    {
      label: "Total MRP",
      amount: cartPrice,
    },
    {
      label: "Coupon",
      amount: coupon,
    },
    {
      label: "Donation",
      amount: donation,
    },
    {
      label: "Shipping",
      amount: 0,
    },
  ];
  const grandTotal = pricingDetails.reduce((a, b) => a + b.amount, 0);

 const router=useRouter()

  return (
    <div className="w-full bg-slate-10  bg-slate-40 flex flex-col gap-4 p-1">
      <div className="border-b border-slate-100 text-slate-400">
        {/* Cart ready to take off 🚀 with ({cartLength}{" "} */}
        Order Summary ({cartLength} {" "}
        {`${cartLength > 1 ? "items" : "item"}`})
      </div>
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center gap-2">
          <span>
            <CiDiscount1 size={22} />
          </span>
          <span>get upto ₹500 off on your first order </span>
        </div>
        <button
        content="button"
          onClick={() => {
            if (coupon === 0) {
                toast.success("Coupon Applied")
                setCoupon(- 500)
            }
            else setCoupon(0);
          }}
          className={`${
            coupon !== 0 && "bg-blue-500 text-white"
          } button p-2 w-[100px]`}
        >{`${coupon === 0 ? "Apply" : "Applied"}`}</button>
        <div></div>
      </div>
      <div className="flex flex-col gap-5">
        <span className="font-bold flex justify-start items-center gap-2">
          <input
            type="checkbox"
            onClick={() => {
              if (donation === 0) setDonation(10);
              else setDonation(0);
            }}
            checked={donation != 0}
          />
          Donate for a change{" "}
          <span className="text-xs font-light text-slate-400">
            (We donate to 100+ NGOs around the world)
          </span>
        </span>
        <div className="flex items-center justify-start gap-2">
          <button
            className={`${donation === 10 && "button bg-blue-500 text-white"}`}
            onClick={() => setDonation(10)}
          >
            ₹10
          </button>
          <button
            className={`${donation === 50 && "button bg-blue-500 text-white"}`}
            onClick={() => setDonation(50)}
          >
            ₹50
          </button>
          <button
            className={`${donation === 100 && "button bg-blue-500 text-white"}`}
            onClick={() => setDonation(100)}
          >
            ₹100
          </button>
        </div>
        <div>
          <span className="text-sm font-bold text-slate-500">
            Pricing Details ({cartLength}{" "}
            {`${cartLength > 1 ? "items" : "item"}`})
          </span>
          <div className="flex flex-col">
            {pricingDetails.map((pr, index) => (
              <div
                className=" flex justify-between items-center gap-4 p-2 border-b border-slate-300"
                key={index}
              >
                <span>{pr.label}</span>
               {pr.label==="Shipping" ? <span className="flex justify-center items-center gap-2" ><span className="text-xs line-through">₹100</span><span className="text-green-500">FREE</span></span> : <span>₹ {pr.amount}</span>}
              </div>
            ))}
          </div>
          <p className="mt-2 text-lg font-bold flex justify-between items-center">
            <span>Grand Total</span>
            <span className=" text-blue-700">₹ {grandTotal}</span>
          </p>
          <div className="mt-4 flex justify-center items-center">
            <Button label="Proceed" onClick={()=>{
                setGrandtotal(grandTotal)
                onOpen()

                }} />
           
          </div>
        </div>
      </div>
    </div>
  );
}
