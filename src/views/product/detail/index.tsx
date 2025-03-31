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
  console.log({ error });

  if (error) {
    return <div className='error-message'>{error}</div>;
  }

  if (!product) {
    return <div className='loading'>Loading product details...</div>;
  }

  const renderStars = (rating:number) => {
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
  const discountedPrice = (product.price * (1 - product.discountPercentage / 100)).toFixed(2);

return(
    <div className='product-details-container'>

   <div className="product-container">
      <div className="image-container">
        <img src={product.thumbnail} alt={product.title} className="product-image" />
      </div>
      <div className="details-container">
        <h1 className="product-title">{product.title}</h1>
         <div className='d-flex'>
          <span>Brand:</span>
          <span className="product-brand">{product.brand}</span>
          <span className="product-category">{product.category}</span>
         </div>
        {/* <p className="product-brand">Brand: {product.brand}</p> */}
        {/* <p className="product-category">{product.category}</p> */}
        <div className="rating-container">
          <span className="product-rating">{product.rating.toFixed(1)}</span>
          <span className="stars">{renderStars(product.rating)}</span>
        </div>
       <div className='d-flex'>
            <div className={`availability-status ${product.stock > 10 ? 'in-stock' : 'low-stock'}`}>
              {product.stock > 10 ? "In Stock" : "Low Stock"}
            </div>
          {/* <p className="product-availability">
            Availability: {product.availabilityStatus}</p>
          {product.stock && <p className="product-stock"> {product.stock} items left</p>} */}
        </div>  
        <p className="product-min-order">Minimum Order Quantity: {product.minimumOrderQuantity}</p>
        <div className="price-container">
          <span className="original-price">${product.price.toFixed(2)}</span>
          <span className="discounted-price">${discountedPrice}</span>
          <span className="discount-percentage">{product.discountPercentage}% off</span>
        </div>
       
        <p className="product-description">{product.description}</p>
      </div>
    </div>
          <ProductReviews reviews={product?.reviews} />
          </div>

)
  return (
    <div className='product-details-container'>
      <img
        src={product?.thumbnail}
        alt={product?.title}
        className='product-image'
      />
      <h2 className='product-detail-title'>{product?.title}</h2>
      <p className='product-brand'>Brand: {product?.brand}</p>
      <p className='product-category'>Category: {product?.category}</p>
      <p className='product-price'>Price: ${product?.price}</p>
      <p className='product-discount'>
        Discount: {product?.discountPercentage}%
      </p>
      <p className='product-stock'>Stock: {product?.stock}</p>
      <p className='product-rating'>Rating: {product?.rating} ⭐</p>
      <p className='product-description'>{product?.description}</p>

      {/* <ProductReviews reviews={product?.reviews} /> */}
    </div>
  );
}
