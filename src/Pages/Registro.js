import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import {Button, Form} from "react-bootstrap"

export default function Registro() {
  const {register,handleSubmit, formState: { errors }} = useForm();

  const onSubmit = async (data) =>{
    try {
      const response = await fetch('http://localhost:3000/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const responseData = await response.json();
      console.log(responseData); 
    } catch (error) {
      console.error(error); 
    }
  }

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Label>Nombre</Form.Label>
          <Form.Control type='text' {...register('name', { required: true })}  />
          {errors.name && <p>El nombre es requerido.</p>}
        </Form.Group>
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
    </div>
  )
}
