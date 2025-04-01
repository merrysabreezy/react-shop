import StarRating from '../../../components/StarRating';
import { ProductReviewType } from '../../../types/types';
import { getInitials } from '../../../utils/nameInitialHelper';
import "./Reviews.css"

const ProductReviews = ({reviews}: ProductReviewType) => {
return(
     <div className='reviews-section'>
      <div className='reviews-title'>Customer Reviews</div>
      {reviews.length > 0 ? ( reviews.map((review, index) => (
        <div key={index} className="review-card">
          <div className="avatar">
            {getInitials(review.reviewerName)}
          </div>
          <div className="review-content">
            <div className="reviewer-info">
              <b>{review.reviewerName}</b>
              <i className='review-date'>
                {new Date(review.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </i>
            </div>
            <StarRating rating={review.rating} />
            <p className='comment'>{review.comment}</p>
          </div>
        </div>
      ))) :(<p>No reviews available</p>)}
    </div>
    )};

export default ProductReviews;