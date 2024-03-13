import React from 'react'
import Navbar from './Navbar'
import getRandomcart from '@/fetch/getRandomcart'
import { Response } from '@/@types'
import getAllProduct from '@/fetch/getAllProducts'

export default async function NavWrapper() {
    const randomCart:Response= await getRandomcart()
    const allProducts=await getAllProduct()
  return (
    <Navbar randomCart={randomCart.data.products} allProductss={allProducts.data}/>
  )
}
