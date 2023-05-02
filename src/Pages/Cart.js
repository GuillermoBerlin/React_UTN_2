import React, { useState, useEffect, useCallback } from "react";
import ProductoEnCart from "../Components/ProductoEnCart";
import { useParams } from "react-router-dom";
import {Row} from 'react-bootstrap'

const Cart = () => {
  const [listadoProductos, setListadoProductos] = useState([]);
  const { id } = useParams();
  const [isCartEmpty, setIsCartEmpty] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  

  const deleteFromCart = useCallback(async (userId, productId) => {
    try {
      const response = await fetch("http://localhost:3000/cart/products", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, productId }),
      });

      if (response.ok) {
        console.log("Producto eliminado del carrito exitosamente");
        // Actualizar el estado local de listadoProductos después de eliminar un producto
        setListadoProductos((prevListadoProductos) =>
          prevListadoProductos.filter((producto) => producto.product._id !== productId)
        );
      } else {
        console.error("Error al eliminar el producto del carrito");
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const updateProductQuantity = async (userId, productId, quantity) => {
    try {
      const response = await fetch("http://localhost:3000/cart/products", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, productId, quantity }),
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
  }, []);

  const calculateTotalPrice = () => {
    let total = 0;
    listadoProductos.forEach(producto => {
      total += producto.product.price * producto.quantity;
    });
    setTotalPrice(total);
  }

  useEffect(() => {
    calculateTotalPrice();
  }, [listadoProductos, updateProductQuantity]);

  return (
    <>
      <Row>
      <p>Total: ${totalPrice}</p>
      {isCartEmpty && <h6 style={{ marginTop: "30px" }}>Your Cart is empty.</h6>}
      {listadoProductos.map((producto) => (
        <ProductoEnCart
          name={producto.product.name}
          price={producto.product.price}
          description={producto.product.description}
          thumbnail={producto.product.thumbnail}
          thumbnail2={producto.product.thumbnail2}
          id={producto.product._id}
          key={producto.product._id}
          updateProductQuantity={updateProductQuantity}
          deleteFromCart={deleteFromCart}
          quantity={producto.quantity}
        />
      ))}
      </Row>
    </>
  );
};

export default Cart;
