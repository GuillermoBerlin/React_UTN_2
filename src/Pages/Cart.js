import React, { useState, useEffect } from "react";
import ProductoEnCart from "../Components/ProductoEnCart";
import {useParams} from "react-router-dom"


const Cart = () => {
  const [listadoProductos, setListadoProductos] = useState([]);
  const {id} = useParams()
  const [isCartEmpty, setIsCartEmpty] = useState(true)
  

  const deleteFromCart = async (userId, productId) => {
    try {
      const response = await fetch("http://localhost:3000/cart/products", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId, productId })
      });

      if (response.ok) {
        console.log("Producto eliminado del carrito exitosamente");
      } else {
        console.error("Error al eliminar el producto del carrito");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/cart/${id}`);
        const data = await response.json();
        
        if (Array.isArray(data.products)) {
          setListadoProductos(data.products);
          setIsCartEmpty(data.products.length === 0); 
        } else {
          console.error("Cart is empty", data);
          setIsCartEmpty(true);
        }
      } catch (error) {
        console.error("ERRORCITO ERROR", error);
      }
    };

    fetchData();
  }, [deleteFromCart]);

  return (
    <>
        {isCartEmpty && <h6 style={{marginTop: "30px"}}>Your Cart is empty.</h6>}
        {listadoProductos.map(producto => (
          <ProductoEnCart
            name={producto.name}
            price={producto.price}
            description={producto.description}
            thumbnail={producto.thumbnail}
            thumbnail2={producto.thumbnail2}
            id={producto._id}
            key={producto._id}
            deleteFromCart={deleteFromCart}
          />
        ))}
    </>
  );
};

export default Cart;

