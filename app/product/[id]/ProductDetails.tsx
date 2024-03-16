import { ProductType } from "@/@types";
import useAddToWishlist from "@/hooks/useAddToWishlist";
import useCartDetails from "@/hooks/useCartDetails";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";

const ProductDetails = ({ details }: { details: ProductType }) => {
  const { title, price, description, image } = details;
  const images = [1, 2, 3, 4];
  const {addToCart}=useCartDetails()
  const [activeImg, setActiveImage] = useState(image);
  const addToWishlistModal = useAddToWishlist();

  const handleAddToWishlist = (product: ProductType) => {
    addToWishlistModal.onOpen();
    addToWishlistModal.setProduct(product);
  };

  return (
    <div className="flex flex-col justify-between lg:flex-row gap-16 lg:items-center">
      <div className="flex flex-col gap-6 lg:w-2/4">
        <img
          src={activeImg}
          alt=""
          className="w-full h-1/3 aspect-square object-contain rounded-xl"
        />
        <div className="flex flex-row justify-around h-24">
          {images.map((img) => (
            <Image
              key={img}
              src={image}
              alt={title}
              height={40}
              width={40}
              className="p-2 w-20 h-20 rounded-md cursor-pointer border border-slate-300"
              onClick={() => setActiveImage(image)}
            />
          ))}
        </div>
      </div>
      {/* ABOUT */}
      <div className="flex flex-col gap-4 lg:w-2/4">
        <div>
          <span className=" text-blue-600 font-semibold">Special One</span>
          <h1 className="text-3xl font-bold">{title}</h1>
        </div>
        <p className="text-gray-700">{description}</p>
        <h6 className="text-2xl font-semibold">₹ {price}</h6>
        <div className="flex flex-row items-center gap-12">
          <div className="flex flex-col md:flex-row gap-7 md:gap-20 items-center  w-full">
          <div className="flex flex-col gap-4 items-center">
            <div>
              <button className="bg-gray-200 py-2 px-5 rounded-lg text-blue-800 text-3xl">
                -
              </button>
              <span className="py-4 px-6 rounded-lg">{1}</span>
              <button className="bg-gray-200 py-2 px-4 rounded-lg text-blue-800 text-3xl">
                +
              </button>
            </div>
            <p className="text-sm text-slate-400">Oops last one ! Hurry up.</p>
          </div>
          <div className="flex flex-col gap-4">
          <button
          onClick={()=>{
            addToCart(details)
            toast.success("Added")
        }}
           className="bg-blue-800 text-white font-semibold py-3 px-16 rounded-xl h-full">
            Add to Cart
          </button>
          <button
            className="text-blue-500 border border-black rounded-lg p-2 duration-150 hover:bg-gray-100"
            onClick={() => handleAddToWishlist(details)}
          >
            Wishlist
          </button>{" "}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
