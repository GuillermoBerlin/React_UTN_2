import { Link } from "react-router-dom";
import { Card, Button, Col, Badge } from "react-bootstrap";
import React, { useState, useEffect } from "react";

const styles = {
  img: {
    objectFit: "contain",
    minHeight: "200px",
    maxHeight: "200px",
  },
};

export default function ProductoEnCart(props) {
  const [showedImage, setShowedImage] = useState(props.thumbnail);
  const [userId, setUserId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(props.quantity); // State para la cantidad

  const priceInCart = props.price * quantity
  

  useEffect(() => {
    const getId = localStorage.getItem("userId");
    setUserId(getId);
    setProductId(props.id);
  }, []);

  useEffect(() => {
    setShowedImage(props.thumbnail);
    setQuantity(props.quantity);
  }, [props.thumbnail, props.quantity]);

  const handleMouseEnter = (e) => {
    setShowedImage(props.thumbnail2);
  };

  const handleMouseLeave = (e) => {
    setShowedImage(props.thumbnail);
  };

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    props.updateProductQuantity(userId, productId, newQuantity); // Llamada a la función de actualizar cantidad en el carrito
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      props.updateProductQuantity(userId, productId, newQuantity); // Llamada a la función de actualizar cantidad en el carrito
    }
  };

  return (
    <>
      
        <Card
          className="border-0 border-bottom m-4"
          style={{ width: "18rem" }}
        >
          <Link to={"/products/" + props.id}>
            <Card.Img
              className="fluid text-center"
              variant="top"
              src={showedImage}
              style={styles.img}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          </Link>
          <Card.Body>
            <Card.Title className="mt-2 mb-2">{props.name}</Card.Title>
            <Card.Text>{props.category}</Card.Text>
            <Card.Text>{props.description}</Card.Text>
            <Card.Title>{priceInCart}€</Card.Title>
            <div className="d-flex align-items-center">
              <Button
                variant="danger"
                onClick={() => props.deleteFromCart(userId, productId)}
                className="me-2"
                style={{ marginRight: '6rem' }}
              >
                Delete
              </Button>
              <div className="d-flex align-items-center">
                <Button
                  variant="outline-secondary"
                  onClick={handleDecrement}
                  className="me-2"
                >
                  -
                </Button>
                <Card.Title>{quantity}</Card.Title>
                <Button
                  variant="outline-secondary"
                  onClick={handleIncrement}
                  className="ms-2"
                >
                  +
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      
    </>
  );
}


