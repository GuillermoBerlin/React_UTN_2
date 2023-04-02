import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button'

export default function producto(props) {
  return (
    <div>
        <p>{props.name}</p>
        <p>{props.category}</p>
        <p>{props.description}</p>
        <p>{props.price}</p>
        <Button as={Link} to={"./products/"+props.id}>See more</Button>
        <Button as={Link} to={"./products/modifyproduct/"+props.id}>Edit</Button>
    </div>
  ) 
}
