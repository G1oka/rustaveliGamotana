import React from 'react';
import { FaShoppingCart, FaExchangeAlt } from 'react-icons/fa'; 

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.description} className="product-image" />
      <div className="product-info">
        <h3>{product.description}</h3>
        <p>{product.price} ₾</p>
        <div className="product-actions">
          <button className="cart-btn"><FaShoppingCart /> ყიდვა</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
