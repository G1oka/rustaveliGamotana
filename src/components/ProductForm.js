import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    prod_id: '',
    price: '',
    description: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('prod_id', formData.prod_id);
    data.append('price', formData.price);
    data.append('description', formData.description);
    if (formData.image) data.append('image', formData.image);

    axios.post('http://localhost:5000/api/products', data)
      .then(response => {
        console.log('Product uploaded:', response.data);
      })
      .catch(error => {
        console.error('Error uploading product:', error);
      });
  };

}

export default ProductForm;
