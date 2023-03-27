import React from 'react'

export default function producto(props) {
  return (
    <div>
        <p>{props.name}</p>
        <p>{props.description}</p>
        <p>{props.price}</p>
    </div>
  )
}
