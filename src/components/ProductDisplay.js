import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductDisplay = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        setProducts(response.data); 
      })
      .catch(error => {
        setError('Error fetching data');
        console.error('Error fetching data:', error);
      });
  }, []); 

  return (
    <div>
      {error && <p>{error}</p>}
      <ul>
        {products.map(product => (
          <li key={product._id}>
            <h3>{product.name}</h3>
            <p>Product ID: {product.prod_id}</p>
            <p>Price: ${product.price}</p>
            <p>Description: {product.description}</p>
            {product.image && <img src={product.image} alt={product.name} style={{ width: '100px' }} />} 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductDisplay;
