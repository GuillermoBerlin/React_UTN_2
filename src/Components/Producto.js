import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button'

export default function producto(props) {
  return (
    <div>
        <p>{props.name}</p>
        <p>{props.description}</p>
        <p>{props.price}</p>
        <Link to={"./producto/"+props.id}><Button>Ver Detalle</Button></Link>
    </div>
  )
}
