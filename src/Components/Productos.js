import React, {useState, useEffect} from 'react'
import Producto from './Producto'
import {Row} from 'react-bootstrap'

export default function Productos() {

  const [listadoProductos, setListadoProductos] = useState([])
  const [loading, setLoading] = useState(true)
  
  //key={producto._id}
  
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
    <Row>
      {listadoProductos.map(producto => (
        <Producto 
        name={producto.name} 
         
        price={producto.price} 
        description={producto.description} 
        thumbnail={producto.thumbnail}
        thumbnail2={producto.thumbnail2}
        id={producto._id}
        key={producto._id}
        />
        
      ))}
    </Row>  
    </>
  )}
}
