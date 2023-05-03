import React, {useState, useEffect} from 'react'
import Producto from './Producto'
import {Row} from 'react-bootstrap'
import { BASE_URL } from "../constants/api";

export default function Productos() {

  const [listadoProductos, setListadoProductos] = useState([])
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/products`);
        const data = await response.json();
        setListadoProductos(data);
        
      } catch (error) {
        console.error(error);
      }
    };
       
    fetchData();
  }, []);
  
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
        isNew={producto.isNew}
        />
        
      ))}
    </Row>  
    </>
  )
}
