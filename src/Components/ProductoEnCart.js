import { Link } from "react-router-dom"
import {Card, Button, Col, Badge} from 'react-bootstrap'
import React, {useState, useEffect} from "react";

const styles = {
  img: {
      objectFit: "contain",
      minHeight: "200px",
      maxHeight: "200px",
      
  },
}

export default function ProductoEnCart(props) {

  const [showedImage, setShowedImage] = useState(props.thumbnail)

  const [userId, setUserId] = useState("")

  const [productId, setProductId] = useState() 

  useEffect(() => {
    
    const getId = localStorage.getItem("userId");
    setUserId(getId);
    setProductId(props.id)
  }, []);
  

useEffect(() => {
  setShowedImage(props.thumbnail);
}, [props.thumbnail])

const handleMouseEnter = e => {
  setShowedImage(props.thumbnail2);
}

const handleMouseLeave = e => {
  setShowedImage(props.thumbnail);
}



  return (
    <>
    <Col>
    <Card className="border-0 border-bottom m-4" style={{ width: '18rem' }}>
    <Link to={"/products/"+props.id}><Card.Img className="fluid text-center" variant="top" src={showedImage} style={styles.img} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}/></Link>
      <Card.Body>
        {props.isNew ? <Badge pill bg="danger" className="mt-2 mb-2">New</Badge> : null}
        <Card.Title className="mt-2 mb-2">{props.name}</Card.Title>
        <Card.Text>{props.category}</Card.Text>
        <Card.Text>{props.description}</Card.Text>
        <Card.Title>{props.price}€</Card.Title>
        
        <Button variant="danger" onClick={() => props.deleteFromCart(userId, productId)} className="mt-4">Delete</Button>
      </Card.Body>
    </Card>
    </Col>
    </>
  ) 
}
