import React, {useState, useEffect} from 'react'
import {useParams} from "react-router-dom"
import {Row, Col, Badge} from 'react-bootstrap'

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
                    <div style={{borderBottom: "1px solid lightgray", paddingBottom:"20px"}}>  
                        {producto.isNew ? <Badge pill bg="danger" className="mt-2 mb-2">New</Badge> : null}     
                        <h2>{producto.name}</h2>
                        <p className="lead">{producto.description}</p>
                        <p className="lead">{producto.descriptionLong}</p>  
                        <h3>{producto.price}€</h3> 
                        </div>  
                                      
                    </Col>
                </Row>
    </div>
  )
}
