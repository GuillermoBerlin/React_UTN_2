import React, {useState, useEffect} from 'react'
import {useParams, Link} from "react-router-dom"
import {Row, Col, Badge, Button} from 'react-bootstrap'

export default function Product() {
  const {id} = useParams()
  const [producto, setProducto] = useState({})
  const styles = {
    mainImage: {
      objectFit: "contain",
      width: "100%",
      minHeight: "300px",
      maxHeight: "500px",
      margin: "10px"
    }
  }

  //la id del producto tendria que ser productId desde el principio y no andar cambiandole el nombre para hacer el fetch

  const [productAdded, setProductAdded] = useState(false)

  const [userId, setUserId] = useState("")

  useEffect(() => {
    
    const getId = localStorage.getItem("userId");
    setUserId(getId);
  }, []);

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

  const addToCart = async () => {
    try {
      
      const productId = id; 

      const response = await fetch("http://localhost:3000/cart/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId, productId })
      });

      if (response.ok) {
        setProductAdded(true)
        
        console.log("Producto agregado al carrito exitosamente");
      } else {
        
        console.error("Error al agregar el producto al carrito");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Row style={{marginTop: "25px"}}>
        <Col lg={8} className='d-none d-sm-block'>
          <img style={styles.mainImage} src={producto.thumbnail}/>
          <img style={styles.mainImage} src={producto.thumbnail2}/>
        </Col>
        <Col style={{marginTop: "25px"}}>
          <div style={{borderBottom: "1px solid lightgray", paddingBottom:"20px"}}>
            {producto.isNew ? <Badge pill bg="danger" className="mt-2 mb-2">New</Badge> : null}
            <h2>{producto.name}</h2>
            <p className="lead">{producto.description}</p>
            <p className="lead">{producto.descriptionLong}</p>
            <h3>{producto.price}€</h3>
          </div>
          {!productAdded &&
          <Button variant="warning" onClick={addToCart} className="mt-4">Add to bag</Button>
          }
          {productAdded &&
            <Button variant="success" as={Link} to={"/cart/" + userId} className="mt-4">Go to Cart</Button>
          }
        </Col>
      </Row>
    </div>
  )
}

