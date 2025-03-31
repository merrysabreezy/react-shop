import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './views/product/list';
import ProductDetails from './views/product/detail';
import EmptyState from './components/EmptyState';

const App: React.FC = () => {
  return (
    <Router>
      <div style={{ display: 'flex', height: '100vh' }}>
        {/* Left side: Product details (or placeholder) */}
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path='/product/:id' element={<ProductDetails />} />
            <Route path='*' element={<EmptyState />} />
          </Routes>
        </div>

        {/* Right side: Product list */}
        <div
          className='right-panel'
          style={{
            width: '400px'
            // borderLeft: '1px solid #ccc',
            // overflowY: 'auto'
            // padding: '20px'
          }}
        >
          <ProductList />
        </div>
      </div>
    </Router>
  );
};

export default App;
