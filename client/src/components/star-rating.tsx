import { useState } from "react";

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  readonly?: boolean;
}

export function StarRating({ rating, onRatingChange, readonly = false }: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);
  
  const handleStarClick = (starRating: number) => {
    if (!readonly) {
      onRatingChange(starRating);
    }
  };
  
  const handleStarHover = (starRating: number) => {
    if (!readonly) {
      setHoverRating(starRating);
    }
  };
  
  const handleStarLeave = () => {
    if (!readonly) {
      setHoverRating(0);
    }
  };
  
  const displayRating = readonly ? rating : (hoverRating || rating);
  
  const ratingLabels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
  const ratingText = displayRating > 0 ? ratingLabels[displayRating] : 'Click to rate';

  return (
    <div className="rating-group">
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((starRating) => (
          <span
            key={starRating}
            className={`star ${starRating <= displayRating ? 'filled' : ''}`}
            onClick={() => handleStarClick(starRating)}
            onMouseEnter={() => handleStarHover(starRating)}
            onMouseLeave={handleStarLeave}
            style={{ cursor: readonly ? 'default' : 'pointer' }}
            data-testid={`star-${starRating}`}
          >
            ★
          </span>
        ))}
      </div>
      {!readonly && (
        <span style={{ color: 'var(--color-text-secondary)' }} data-testid="rating-text">
          {ratingText}
        </span>
      )}
    </div>
  );
}
