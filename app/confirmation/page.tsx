"use client"
import React from 'react'
import animation from "@/public/confirmation animation.json"
import Lottie from 'lottie-react'
import Link from 'next/link'
export default function page() {
  return (
    <div>
        <div className='flex justify-center items-center gap-2'>
            <div className='w-1/4'>
            <Lottie height={20} animationData={animation}/>
            </div>
            <div className='flex flex-col justify-center items-center gap-4'>
            <p className='font-bold'>Your order will reach at your door step by 30th March , 2024</p>
            <Link className='border-2 text-white bg-blue-500 p-2 hover:bg-blue-700 px-4 rounded-md' href={"/"}>Home</Link>
            </div>
        </div>
    </div>
  )
}
