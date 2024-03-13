import React from 'react'
import Product from './Product'

export default function page({ params }: { params: { id: number } }) {
    const {id}=params
    console.log(id)
    return (
    <div>
        <Product id={id}/>
    </div>
  )
}
