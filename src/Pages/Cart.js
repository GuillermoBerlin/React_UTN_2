import React, { useState, useEffect } from "react";
import ProductoEnCart from "../Components/ProductoEnCart";
import {useParams} from "react-router-dom"

const Cart = () => {
  const [listadoProductos, setListadoProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const {id} = useParams()
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/cart/${id}`);
        const data = await response.json();
        // Verificar que la respuesta contiene un arreglo de productos
        if (Array.isArray(data.products)) {
          setListadoProductos(data.products);
          setLoading(false);
        } else {
          console.error("Cart is empty", data);
        }
      } catch (error) {
        console.error("ERRORCITO ERROR", error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading..</p>;
  } else {
    return (
      <div>
        {/* Renderizar los productos */}
        {listadoProductos.map(producto => (
          <ProductoEnCart
            name={producto.name}
            price={producto.price}
            description={producto.description}
            thumbnail={producto.thumbnail}
            thumbnail2={producto.thumbnail2}
            id={producto._id}
            key={producto._id}
          />
        ))}
      </div>
    );
  }
};

export default Cart;
