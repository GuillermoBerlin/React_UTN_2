import React, {useState, useEffect} from 'react'
import Producto from './Producto'

export default function Productos() {

  const [listadoProductos, setListadoProductos] = useState([])
  const [loading, setLoading] = useState(true)
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');
        const data = await response.json();
        setListadoProductos(data);
        setLoading(false)
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);
  
  if(loading){
    return (
      <p>Loading..</p>
    )
  }else{
    return(
    <>
      {listadoProductos.map(producto => (
        <Producto name={producto.name} price={producto.price} description={producto.description}/>
      ))}
    </>
  )}
  
}
