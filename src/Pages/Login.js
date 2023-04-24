import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form } from "react-bootstrap";
import AuthContext from '../Context.js/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const context = useContext(AuthContext);

  const [successfulLog, setSuccessfulLog] = useState(false);
  
  const [message, setMessage] = useState("");

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
      if (response.status === 201) {
        const res = response;
        console.log(responseData);
        console.log(res.status);

        localStorage.setItem('token', responseData.token);
        localStorage.setItem('name', responseData.name);
        localStorage.setItem('userId', responseData.userId);
        context.loginUser();
        setSuccessfulLog(true);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }else {
        // Código para el login fallido
        setMessage(responseData.message); // Guardar el mensaje del servidor en setMessage
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
          <Form.Control type='email' {...register('email', { required: true })} />
          {errors.email && <p>El email es requerido.</p>}
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' {...register('password', { required: true })} />
          {errors.password && <p>La contraseña es requerida.</p>}
        </Form.Group>
        <Button type={'submit'} className={`mt-3 ${successfulLog ? 'btn-success' : ''}`}>{successfulLog ? 'Success' : 'Submit'}</Button>
      </Form>
      {message && <p style={{color: 'red', marginTop: '8px'}}>{message}</p>} 
    </div>
  )
}
