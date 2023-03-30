import { Link } from "react-router-dom"

export default function producto(props) {
  return (
    <div>
        <p>{props.name}</p>
        <p>{props.description}</p>
        <p>{props.price}</p>
        <Link to={"./producto/"+props.id}>Ver Detalle</Link>
    </div>
  )
}
