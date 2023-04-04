import { Link } from "react-router-dom"
import {Card, Button, Col} from 'react-bootstrap'

export default function producto(props) {

  const styles = {
    img: {
        objectFit: "contain",
        minHeight: "200px",
        maxHeight: "200px",
        
    },
}

  return (
    <>
    <Col>
    <Card style={{ width: '18rem' }}>
      <Card.Img style={styles.img} variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>{props.category}</Card.Text>
        <Card.Text>{props.description}</Card.Text>
        <Card.Title>{props.price}€</Card.Title>
        <Button as={Link} to={"./products/"+props.id}>See more</Button>
        <Button as={Link} to={"./products/modifyproduct/"+props.id}>Edit</Button>
      </Card.Body>
    </Card>
    </Col>
    </>
  ) 
}
