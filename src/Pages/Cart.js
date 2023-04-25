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

  const updateProductQuantity = async (userId, productId, quantity) => {
    try {
      const response = await fetch("http://localhost:3000/cart/products", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId, productId, quantity })
      });
  
      if (response.ok) {
        console.log("Cantidad de producto actualizada exitosamente");
      } else {
        console.error("Error al actualizar la cantidad de producto");
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
            name={producto.product.name}
            price={producto.product.price}
            description={producto.product.description}
            thumbnail={producto.product.thumbnail}
            thumbnail2={producto.product.thumbnail2}
            id={producto.product._id}
            key={producto.product._id}
            deleteFromCart={deleteFromCart}
            quantity={producto.quantity}
            updateProductQuantity={updateProductQuantity}
          />
        ))}
    </>
  );
};

export default Cart;

