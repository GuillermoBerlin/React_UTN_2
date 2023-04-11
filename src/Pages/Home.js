import React from 'react'
import Productos from '../Components/Productos'
import ProductsByCategory from '../Components/ProductsByCategory'

export default function Home() {
  return (
    <div>
      <Productos/>
      <ProductsByCategory/>
    </div>
  )
}

