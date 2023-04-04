import React, {useState, useEffect} from 'react'
import {useParams} from "react-router-dom"
import {Row, Col} from 'react-bootstrap'

export default function  () {
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

  return (
    <div>
      <Row style={{marginTop: "25px"}}>
                    <Col lg={8} className='d-none d-sm-block'> 
                        <img style={styles.mainImage} src={producto.thumbnail}/>
                        <img style={styles.mainImage} src={producto.thumbnail2}/>
                    </Col>

                    

                    <Col style={{marginTop: "25px"}}>           
                        <h2>{producto.name}</h2>
                        <p className="lead">{producto.description}</p>
                        <h3>{producto.price}€</h3>
                        <div style={{marginTop: "20px", borderBottom: "1px solid lightgray"}}>
                        <p className="lead">{producto.descriptionLong}</p>   
                        </div>                
                    </Col>
                </Row>
    </div>
  )
}
