import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import {Button, Form} from "react-bootstrap"
import { useParams, useNavigate } from 'react-router-dom';;

export default function NewProduct() {
  const navigate = useNavigate()
  const {register,handleSubmit, setValue, formState: { errors }} = useForm();
  const { id } = useParams()
  

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/products/${id}`);
      const data = await response.json();
      
      setValue('name', data.name);
      setValue('price', data.price);
      setValue('description', data.description);
      setValue('category', data.category);

    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
}, [id, setValue]);


  const onSubmit = async (data) =>{
    try {
      const response = await fetch('http://localhost:3000/products/'+id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        navigate("/")
        //navigate(`/products/${id}`)
      }

      const responseData = await response.json();
      console.log(responseData); 
    } catch (error) {
      console.error(error); 
    }
  }


  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
        
      });
      navigate("/"); 
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
        <Button type={'submit'} variant="secondary">Send</Button>
        <Button type="submit" variant="danger" onClick={handleDelete}>Delete</Button>
      </Form>
    </div>
  )
}