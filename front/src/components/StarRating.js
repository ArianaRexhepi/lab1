import React from 'react';
import './homepage.css';

const StarRating = ({ rating }) => {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating - filledStars >= 0.5;

  const stars = [];
  for (let i = 0; i < filledStars; i++) {
    stars.push(<i key={i} className="fas fa-star filled"></i>);
  }
  if (hasHalfStar) {
    stars.push(<i key={filledStars} className="fas fa-star-half filled"></i>);
  }
  const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<i key={filledStars + i + 1} className="fas fa-star empty"></i>);
  }

  return <div className="star-rating">{stars}</div>;
};

export default StarRating;
