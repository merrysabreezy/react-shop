import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';
import { Product } from '../../../types/types';
import { getProductById } from '../../../api/product.api';
import ProductReviews from '../review';
import EmptyState, { ErrorState } from '../../../components/EmptyState';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getProductById(Number(id));
        setProduct(data);
        setError('');
      } catch (err) {
        setError('Failed to load product details.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();

    return () => {
      setError('');
      setLoading(false);
    };
  }, [id]);

  if (!id) {
    return <EmptyState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  if (!product) {
    return (
      <div className='loading-container'>
        <div className='loading'></div>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
      <>
        {'★'.repeat(fullStars)}
        {halfStar && '☆'}
        {'☆'.repeat(emptyStars)}
      </>
    );
  };

  const discountedPrice = (
    product.price *
    (1 - product.discountPercentage / 100)
  ).toFixed(2);

  const getStockStatus = (stock: number) => {
    if (stock === 0)
      return { label: 'Out of stock', className: 'out-of-stock' };
    if (stock <= 10) return { label: 'Low Stock', className: 'low-stock' };
    return { label: 'In Stock', className: 'in-stock' };
  };

  const { label, className } = getStockStatus(product.stock);

  return (
    <>
      {loading && (
        <div className='loading-container'>
          <div className='loading'></div>
        </div>
      )}

      <div className={`product-details-container ${loading ? 'blurred' : ''}`}>
        <div className='product-container'>
          <div className='image-container'>
            <img
              src={product.thumbnail}
              alt={product.title}
              className='product-image'
            />
          </div>

          <div className='details-container'>
            <h1 className='product-title'>{product.title}</h1>

            <div className='d-flex'>
              {product.brand && (
                <span className='product-brand border-right'>
                  Brand: <span className='brand-title'> {product.brand}</span>
                </span>
              )}
              {product.category && (
                <span className='product-category'>{product.category}</span>
              )}
            </div>

            <div className='rating-container'>
              <span className='product-rating'>
                {product.rating.toFixed(1)}
              </span>{' '}
              <span className='stars'>{renderStars(product.rating)}</span>
            </div>

            <div className='d-flex'>
              <div className={`availability-status ${className}`}>{label}</div>
              {product.stock > 0 && (
                <small className='product-stock border-right'>
                  {product.stock} {product.stock == 1 ? 'item ' : 'items '}
                  left
                </small>
              )}
              <small className='minimum-order'>
                Min Order: {product.minimumOrderQuantity}
              </small>
            </div>

            <div className='price-container'>
              <span className='original-price'>
                ${product.price.toFixed(2)}
              </span>
              <span className='discounted-price'>${discountedPrice}</span>
              <span className='discount-percentage'>
                {product.discountPercentage}% off
              </span>
            </div>

            <p className='product-description'>{product.description}</p>
          </div>
        </div>

        <ProductReviews reviews={product?.reviews} />
      </div>
    </>
  );
};

export default ProductDetails;
