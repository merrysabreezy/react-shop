import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './views/product/list';
import ProductDetails from './views/product/detail';
import EmptyState from './components/EmptyState';

const App: React.FC = () => {
  return (
    <Router>
      <div className='main-container'>
        {/* Left side: Product details (or placeholder) */}
        <div  className="left-panel">
          <Routes>
            <Route path='/product/:id' element={<ProductDetails />} />
            <Route path='*' element={<EmptyState />} />
          </Routes>
        </div>

        {/* Right side: Product list */}
        <div className='right-panel'>
          <ProductList />
        </div>
      </div>
    </Router>
  );
};

export default App;
