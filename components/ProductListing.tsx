"use client";

import useAllProducts from '@/hooks/useAllProducts';
import React, { useEffect } from 'react';
import ProductCard from './ProductCard';

export default function ProductListing() {

const {allProducts}=useAllProducts()
  return <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 sm:gap-7 mt-4'>
{allProducts.map((product)=>(
  <div>
    <ProductCard key={product.id} product={product}/>
  </div>
))}
  </div>;
}
