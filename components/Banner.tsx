"use client"
import Image from 'next/image';
import React from 'react';
const Banner = () => {
  return (
    <div className="relative bg-gray-100 z-0">
      <Image
      height={4000}
      width={4100}
        className="object-cover w-full h-96"
        src="https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,b_rgb:f5f5f5/3396ee3c-08cc-4ada-baa9-655af12e3120/scarpa-da-running-su-strada-invincible-3-xk5gLh.png"
        alt="banner"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl text-white font-bold">Shop Now!</h1>
          <p className="text-lg md:text-xl text-white mt-4">New Arrivals - Limited Time Only</p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
