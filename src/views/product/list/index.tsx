import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../../api/product.api';
import { Product } from '../../../types/types';
import './ProductList.css';
import ProductCard from '../../../components/ProductCard';
import useWidth from '../../../utils/deviceHelper';
import { ErrorState } from '../../../components/EmptyState';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string>('');
  const { isMobile } = useWidth();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data.products);
      } catch (err) {
        setError('Failed to load products.');
      }
    };
    fetchProducts();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products.length / productsPerPage);

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <div className='product-list-container'>
      {isMobile && <div className='right-pane-title'> Products </div>}

      {currentProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}

      <div className='pagination'>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`pagination-button ${
              currentPage === i + 1 ? 'active' : ''
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
