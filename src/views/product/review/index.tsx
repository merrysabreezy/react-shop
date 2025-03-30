import { Review } from '../../../types/types';

const ProductReviews = () => {
  const reviews: Review[] = [
    { date: '2024-01-10', comment: 'Great product!', rating: 5 },
    { date: '2024-02-15', comment: 'Good value for money.', rating: 4 },
    { date: '2024-03-05', comment: 'Average quality.', rating: 3 }
  ];

  return (
    <div className='reviews-section'>
      <h3 className='reviews-title'>Customer Reviews</h3>
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index} className='review-item'>
            <p className='review-date'>{review.date}</p>
            <p className='review-comment'>{review.comment}</p>
            <p className='review-rating'>Rating: {review.rating} ⭐</p>
          </div>
        ))
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
};

export default ProductReviews;
