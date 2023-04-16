import React, { useState, useEffect } from 'react';
import Producto from "./Producto";

import { Row, Button, ButtonGroup } from 'react-bootstrap';

function ProductsByCategory() {
  const [category, setCategory] = useState('64296fbbd8baa8bf02a0e072');
  const [products, setProducts] = useState([]);
  

  useEffect(() => {
    const getProductsByCategory = async () => {
      try {
        const response = await fetch(`http://localhost:3000/products/categories/${category}`);
        if (response.ok) {
          const products = await response.json();
          setProducts(products);
          
        } else {
          throw new Error('Error al obtener productos por categoría');
        }
      } catch (error) {
        console.log(error);
        
      }
    };
    getProductsByCategory();
  }, [category]);

  return (
    <>
      <Row>
        <ButtonGroup className="mb-5 mt-5">
          <Button variant="outline-secondary" onClick={() => setCategory('642972cbd8baa8bf02a0e076')}>Desks</Button>
          <Button variant="outline-secondary" onClick={() => setCategory('64296fe9d8baa8bf02a0e074')}>Tables</Button>
          <Button variant="outline-secondary" onClick={() => setCategory('64296fbbd8baa8bf02a0e072')}>Chairs</Button>
        </ButtonGroup>
      </Row>

      
        <div>
          <Row>
            {products.map(producto => (
                <Producto 
                    name={producto.name} 
                    price={producto.price} 
                    description={producto.description} 
                    thumbnail={producto.thumbnail}
                    thumbnail2={producto.thumbnail2}
                    id={producto._id}
                    key={producto._id}
                    isNew={producto.isNew}
                    />
            ))}
          </Row>
        </div>
      
    </>
  );
}

export default ProductsByCategory;
