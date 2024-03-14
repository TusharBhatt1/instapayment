"use client"
import useLRU from '@/hooks/useLRU'
import React from 'react'
import Heading from './Heading'
import ProductCard from './ProductCard'

export default function RecentlyViewed() {
    const {cache}=useLRU()

  if(cache.length>0)
  {return (
    <div className='flex flex-col gap-4 px-12 mb-7'>
        <Heading
        title='Recently Viewed'
        />
        <div className='flex items-center flex-wrap gap-12'>
        {cache.map((product)=>(
            <div>
                <ProductCard key={product.key} product={product.value}/>
            </div>
        ))}
        </div>
    </div>
  )
        }
}
