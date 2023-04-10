import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import {Button, Form} from "react-bootstrap"
import { useNavigate } from 'react-router-dom';

export default function NewProduct() {
  const {register,handleSubmit, formState: { errors }} = useForm();
  const navigate = useNavigate()
  

  const onSubmit = async (data) =>{
    try {
      const response = await fetch('http://localhost:3000/products/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem("token")
        },
        body: JSON.stringify(data)
      });
      const responseData = await response.json();
      navigate(`/products/${responseData._id}`)
      
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
        <Form.Group>
          <Form.Label>Image 1</Form.Label>
          <Form.Control type='text' {...register('thumbnail', { required: true })}  />
          {errors.thumbnail && <p>Please insert an URL</p>}
        </Form.Group>
        <Form.Group>
          <Form.Label>Image 2</Form.Label>
          <Form.Control type='text' {...register('thumbnail2', { required: true })}  />
          {errors.thumbnail2 && <p>Please insert an URL</p>}
        </Form.Group>
        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Select aria-label="Default select example" {...register('category', { required: true })} defaultValue={null}>
            <option value="">-Seleccionar una categoría-</option>
            <option value="64296fbbd8baa8bf02a0e072">Chairs</option>
            <option value="64296fe9d8baa8bf02a0e074">Tables</option>
            <option value="642972cbd8baa8bf02a0e076">Wardrobe</option>
          </Form.Select>
          {errors.category && <p>Por favor seleccione una categoría</p>} 
        </Form.Group>
        {errors.category && <p>Please select a category</p>} 
        <Button type={'submit'} className="mt-3">Save</Button>
      </Form>
    </div>
  )
}
