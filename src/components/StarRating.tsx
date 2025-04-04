import React from 'react';
import { StarRatingProps } from '../types/types';

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const totalStars = 5;
  const fullStar = '★';
  const emptyStar = '☆';
  const starElements = [];

  for (let i = 1; i <= totalStars; i++) {
    starElements.push(
      <span key={i} style={styles.star}>
        {i <= rating ? fullStar : emptyStar}
      </span>
    );
  }

  return <div>{starElements}</div>;
};

export default StarRating;

const styles = {
  star: {
    color: '#ffa500',
    fontSize: '20px',
    marginRight: '5px'
  }
};
