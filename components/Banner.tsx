"use client";
import useIntro from "@/hooks/useIntro";
import Image from "next/image";
const Banner = () => {
  const { isOpen } = useIntro();
  if (!isOpen) {
    return (
      <div className="relative bg-gray-100 z-0 ">
        <Image
          height={2000}
          width={2000}
          className="object-cover w-full h-[80vh] z-0"
          src="https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,b_rgb:f5f5f5/3396ee3c-08cc-4ada-baa9-655af12e3120/scarpa-da-running-su-strada-invincible-3-xk5gLh.png"
          alt="banner"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl text-white font-bold">
              Shop Now!
            </h1>
            <p className="text-lg md:text-xl text-white mt-4">
              New Arrivals - Limited Time Only
            </p>
          </div>
        </div>
        <p className="font-bold text-lg text-center p-2 bg-black text-white mt-7">
          Free Shipping on All orders
        </p>
      </div>
    );
  }
};

export default Banner;
