import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import {Button, Form} from "react-bootstrap"
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constants/api';

export default function NewProduct() {
  const navigate = useNavigate()
  const {register,handleSubmit, setValue, formState: { errors }} = useForm();
  const { id } = useParams()


  //Button isNew
  const [isNew, setIsNew] = useState(false);

  const handleCheckboxChange = () => {
    setIsNew(!isNew);
  };
  

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/products/${id}`);
      const data = await response.json();
      
      setValue('name', data.name);
      setValue('price', data.price);
      setValue('description', data.description);
      setValue('descriptionLong', data.descriptionLong);
      setValue('category', data.category);
      setValue('thumbnail', data.thumbnail);
      setValue('thumbnail2', data.thumbnail2);
      setValue('isNew', data.isNew);

    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
}, [id, setValue]);


  const onSubmit = async (data) =>{
    try {
      const putResponse = await fetch(`${BASE_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (putResponse.ok) {
        navigate(`/products/${id}`)
      } 
    } catch (error) {
      console.error(error); 
    }
  }


  const handleDelete = async () => {
    try {
      const response = await fetch(`${BASE_URL}/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        } 
      });
      if (response.ok) {
       navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <div>
      
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Check
              className="mt-4 mb-2"
              type="checkbox"
              id="exampleCheckbox"
              label="New Product"
              defaultChecked={isNew}
              onChange={handleCheckboxChange}
              {...register('isNew')}
            />
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
          <Form.Label>Description Long</Form.Label>
          <Form.Control type='text' {...register('descriptionLong', { required: true })}  />
          {errors.descriptionLong && <p>Please insert a description</p>}
        </Form.Group>
        <Form.Group>
          <Form.Label>Precio</Form.Label>
          <Form.Control type='text' {...register('price', { required: true })}  />
          {errors.price && <p>Please insert a price.</p>}
        </Form.Group>
        <Form.Group>
          <Form.Label>Image 1</Form.Label>
          <Form.Control type='text' {...register('thumbnail', { required: true })}  />
          {errors.thumbnail && <p>Please insert an URL.</p>}
        </Form.Group>
        <Form.Group>
          <Form.Label>Image 2</Form.Label>
          <Form.Control type='text' {...register('thumbnail2', { required: true })}  />
          {errors.thumbnail2 && <p>Please insert an URL.</p>}
        </Form.Group>
        <Form.Group>
        <Form.Label>Category</Form.Label>
        <Form.Select aria-label="Default select example" {...register('category', { required: true })} defaultValue={null}>
          <option value="">-Select a category-</option>
          <option value="64296fbbd8baa8bf02a0e072">Chairs</option>
          <option value="64296fe9d8baa8bf02a0e074">Tables</option>
          <option value="642972cbd8baa8bf02a0e076">wardrobe</option>
        </Form.Select>
        {errors.category && <p>Please select a category</p>} 
        </Form.Group>
        
        <Button className="mt-3" type={'submit'} >Save</Button>
        <Button className="mt-3" variant="danger" style={{marginLeft: '1rem'}} onClick={handleDelete}>Delete</Button>
        
      </Form>
    </div>
  )
}