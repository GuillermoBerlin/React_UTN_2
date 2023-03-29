import React from 'react'
import { Link } from 'react-router-dom'

export default function Menu() {
  return (
    <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/alta">Registro</Link></li>
        <li><Link to="/ingresar">Login</Link></li>
    </ul>
  )
}
