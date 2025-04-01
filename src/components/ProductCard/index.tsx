import React from 'react';
import { ProductCardProps } from '../../types/types';
import './ProductCard.css';
import { Link } from 'react-router-dom';
import StarRating from '../StarRating';
import { scrollToTop } from '../../utils/pageHelper';

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const discountedPrice = (product.price * (1 - product.discountPercentage / 100)).toFixed(2);

  return (
    <Link
      to={`/product/${product.id}`}
      key={product.id}
      className='product-link'
      onClick={()=> scrollToTop()}
    >
      <div className='product-card'>
        <img
          src={product.thumbnail}
          alt={product.title}
          className='product-thumbnail'
        />
        <div className='product-info'>
          <div className='product-title'>{product.title}</div>
          <p className='product-price'>
            <span className='original-price'>${product.price}</span>
            <span className='discounted-price'>${discountedPrice}</span>
          </p>
          {/* <p className='product-rating'>Rating: {product.rating} ⭐</p> */}
          <StarRating rating={product.rating} />
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
