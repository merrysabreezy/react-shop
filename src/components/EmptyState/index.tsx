import './EmptyState.css';

const EmptyState = () => {
  return (
    <div className='empty-state-container'>
      <div className='empty-state-message'>
        <div className='animated-cart'>
          <div className='cart-wheel left'></div>
          <div className='cart-wheel right'></div>
          <div className='cart-body'></div>
        </div>
        <p>Please select a product from the list to preview</p>
      </div>
    </div>
  );
};

export default EmptyState;
