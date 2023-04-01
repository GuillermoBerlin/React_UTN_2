import React, {useState, useEffect} from 'react'
import {useParams} from "react-router-dom"

export default function  () {
  const {id} = useParams()   
  const [producto, setProducto] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/products/'+id);
        const data = await response.json();
        setProducto(data);
      } catch (error) {
        console.error(error);
      }
    };
       
    fetchData();
  }, [id]);  

  return (
    <div>
      <p>DETALLE</p>  
      <p>{producto.name}</p>
      <p>{producto.description}</p>
      <p>{producto.price}</p>
      
    </div>
  )
}
