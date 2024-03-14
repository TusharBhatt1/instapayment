import React from 'react'
import Heading from '@/components/Heading'
import WishlistPageSm from './WishlistPageSm'
import WishlistPageLg from './WishlistPageLg'

export default function page() {

  return (
    <>
   
    <div className='flex sm:hidden w-full h-full flex-col ml-10'>
      <WishlistPageSm/>
    </div>

   <div className='hidden sm:flex ml-12'>
   <Heading title='All Wishlists'/>
   <WishlistPageLg/>
   </div>
   </>
  
  )
}
