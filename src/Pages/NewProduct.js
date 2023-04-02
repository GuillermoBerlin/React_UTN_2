import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import {Button, Form} from "react-bootstrap"

export default function NewProduct() {
  const {register,handleSubmit, formState: { errors }} = useForm();

  const onSubmit = async (data) =>{
    try {
      const response = await fetch('http://localhost:3000/products/', {
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
          <Form.Label>Descripcion</Form.Label>
          <Form.Control type='text' {...register('description', { required: true })}  />
          {errors.description && <p>Please insert a description</p>}
        </Form.Group>
        <Form.Group>
          <Form.Label>Precio</Form.Label>
          <Form.Control type='text' {...register('price', { required: true })}  />
          {errors.price && <p>Please insert a price.</p>}
        </Form.Group>
        <Form.Select aria-label="Default select example" {...register('category', { required: true })} defaultValue={null}>
          <option value="">-Select a category-</option>
          <option value="64296fbbd8baa8bf02a0e072">Chairs</option>
          <option value="64296fe9d8baa8bf02a0e074">Tables</option>
          <option value="642972cbd8baa8bf02a0e076">wardrobe</option>
        </Form.Select>
        {errors.category && <p>Please select a category</p>} 
        <Button type={'submit'}>Mandar</Button>
      </Form>
    </div>
  )
}
