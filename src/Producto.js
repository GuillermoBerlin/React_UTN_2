import React from 'react'

export default function producto(props) {
  return (
    <div>
        <p>{props.nombre}</p>
        <p>{props.precio}</p>
    </div>
  )
}
