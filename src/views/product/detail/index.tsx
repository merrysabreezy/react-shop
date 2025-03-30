import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';
import { Product } from '../../../types/types';
import { getProductById } from '../../../api/product.api';
import ProductReviews from '../review';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const data = await getProductById(Number(id));
        setProduct(data);
      } catch (err) {
        setError('Failed to load product details.');
      }
    };
    fetchProduct();
  }, [id]);

  if (!id) {
    return (
      <div className='placeholder'>Please select a product from the list.</div>
    );
  }

  if (error) {
    return <div className='error-message'>{error}</div>;
  }

  if (!product) {
    return <div className='loading'>Loading product details...</div>;
  }

  return (
    <div className='product-details-container'>
      <img
        src={product.thumbnail}
        alt={product.title}
        className='product-image'
      />
      <h2 className='product-detail-title'>{product.title}</h2>
      <p className='product-brand'>Brand: {product.brand}</p>
      <p className='product-category'>Category: {product.category}</p>
      <p className='product-price'>Price: ${product.price}</p>
      <p className='product-discount'>
        Discount: {product.discountPercentage}%
      </p>
      <p className='product-stock'>Stock: {product.stock}</p>
      <p className='product-rating'>Rating: {product.rating} ⭐</p>
      <p className='product-description'>{product.description}</p>

      <ProductReviews />
    </div>
  );
}
