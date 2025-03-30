import React from 'react';
import { ProductCardProps } from '../../types/types';
import './ProductCard.css';
import { Link } from 'react-router-dom';

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link
      to={`/product/${product.id}`}
      key={product.id}
      className='product-link'
    >
      <div className='product-card'>
        <img
          src={product.thumbnail}
          alt={product.title}
          className='product-thumbnail'
        />
        <div className='product-info'>
          <div className='product-title'>{product.title}</div>
          <p className='product-price'>${product.price}</p>
          <p className='product-rating'>Rating: {product.rating} ⭐</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
