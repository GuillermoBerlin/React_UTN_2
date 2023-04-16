import React, { useState, useContext } from 'react'
import { useForm } from 'react-hook-form';
import {Button, Form} from "react-bootstrap"
import AuthContext from '../Context.js/AuthContext';
import { useNavigate } from 'react-router-dom';



export default function Login() {

  const navigate = useNavigate()

  const {register,handleSubmit, formState: { errors }} = useForm();

  const context = useContext(AuthContext)
  
  const [successfullLog, setSuccessfulLog] = useState(false);
  const [code, setCode] = useState("");



  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           
        },
        body: JSON.stringify(data)
      });
      const responseData = await response.json();
      if (response.status == 201) {     
        const res = response;
        console.log(responseData);
        console.log(res.status);

        localStorage.setItem('token', responseData);
        context.loginUser()
        setSuccessfulLog(true);
        setCode(res.status);

        setTimeout(() => {
          localStorage.removeItem('token')
          context.logoutUser()
        }, 30 * 60 * 1000);
        setTimeout(() => {
          navigate("/"); // Cambia '/home' por la ruta de tu página de inicio
        }, 3000); // 3000 milisegundos = 3 segundos
      }

    } catch (error) { 
      console.error(error);
    }
  }
  
  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type='email' {...register('email', { required: true })}  />
          {errors.email && <p>El email es requerido.</p>}
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' {...register('password', { required: true })}  />
          {errors.password && <p>La contraseña es requerida.</p>}
        </Form.Group>
        <Button type={'submit'} className="mt-3">Send</Button>
      </Form>
      {successfullLog&&<p>status: {code}<br></br>Redireccionando...</p>}
    </div>
  )
}
