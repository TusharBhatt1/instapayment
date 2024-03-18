import React, { useState } from 'react'
import Image from "next/image";
import { FaEnvelope, FaInfoCircle, FaMapMarkerAlt, FaPhone, FaRupeeSign, FaShoppingCart, FaUser } from 'react-icons/fa';
import useCartDetails from '@/hooks/useCartDetails';
import useUserDetails from '@/hooks/useUserDetails';
import { CiCircleChevUp, CiCircleChevDown } from 'react-icons/ci';
import { ProductType } from '@/@types';

export default function ReviewDetails({grandTotal,cart}:{grandTotal:number,cart:ProductType[]}) {
    const { user } = useUserDetails();
    const [expandOrder, setExpandOrder] = useState(false);
    const pricing = [
      { name: "Subtotal", value: grandTotal },
      { name: "Shipping", value: 0 },
      { name: "GrandTotal", value: grandTotal },
    ];
  return (
    <div className="border border-gray-200 rounded-md p-4 bg-slate-50">
          <h2 className="pb-2">
            Review Details
            <FaInfoCircle className="inline-block ml-2 text-gray-400" />
          </h2>
          <div
            onClick={() => setExpandOrder(!expandOrder)}
            className="bg-white rounded-md cursor-pointer flex items-center justify-between p-1 border-b border-gray-200"
          >
            <span className="text-gray-600 p-2 ">
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
            <div
              className={`overflow-y-auto max-h-40 text-xs mb-7 transition-opacity duration-500 ease-in-out`}
            >
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
                    <span className="ml-2 text-xs ">
                      {item.title.split(" ").slice(0, 4).join(" ")}
                    </span>
                  </div>
                  <span>
                    <FaRupeeSign className="inline-block mr-1" />
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4 flex flex-col gap-3 bg-white rounded-md p-5">
            <p className="text-gray-600 font-semibold">Shipping Details</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <FaUser className="mr-2" />
                <p className="text-gray-700">{user.name}</p>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-2" />
                <p className="text-gray-700">{user.address}</p>
              </div>
              <div className="flex items-center">
                <FaPhone className="mr-2" />
                <p className="text-gray-700">
                  {user.num}, {user.alt_num}
                </p>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="mr-2" />
                <p className="text-gray-700">{user.email}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 p-3 px-5 mt-2 bg-white rounded-md">
            {pricing.map((price, i) => (
              <div
                className={`${
                  i == 2 && "font-bold"
                } flex flex-cols border-b border-slate-200 gap-2 justify-between`}
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
  )
}
