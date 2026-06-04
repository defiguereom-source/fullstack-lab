import React from 'react';
import type { Review } from '../types/type';

interface ReviewCardProps {
  review: Review;
  showActions?: boolean;
  onViewRepository?: (repositoryId: string) => void;
  onDeleteReview?: (reviewId: string) => void;
}

const getRatingVariant = (rating: number): string => {
  if (rating >= 80) return 'success';
  if (rating >= 50) return 'warning';
  return 'danger';
};

const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  showActions = false,
  onViewRepository,
  onDeleteReview,
}) => {
  const variant = getRatingVariant(review.rating);
  const repoName = review.repository?.fullName ?? review.repositoryId;

  return (
    <div className="card mb-3 shadow-sm border-0">
      <div className="card-body">
        {/* Header: badge + info */}
        <div className="d-flex gap-3 align-items-start">
          {/* Rating badge circular */}
          <div
            className={`d-flex align-items-center justify-content-center rounded-circle border border-2 border-${variant} text-${variant} fw-semibold flex-shrink-0`}
            style={{ width: 52, height: 52, fontSize: 18 }}
            aria-label={`Rating: ${review.rating}`}
          >
            {review.rating}
          </div>

          {/* Nombre repo + fecha + texto */}
          <div className="flex-grow-1 overflow-hidden">
            <h6 className="mb-1 fw-semibold text-truncate">{repoName}</h6>
            <p className="text-muted mb-2" style={{ fontSize: 13 }}>
              {formatDate(review.createdAt)}
            </p>
            <p className="mb-0 text-secondary" style={{ fontSize: 14, lineHeight: 1.55 }}>
              {review.text}
            </p>
          </div>
        </div>

        {/* Ejercicio 10.27 — botones de acción */}
        {showActions && (
          <div className="d-flex gap-2 mt-3">
            <button
              className="btn btn-primary btn-sm flex-fill"
              onClick={() => onViewRepository?.(review.repositoryId)}
            >
              View repository
            </button>
            <button
              className="btn btn-danger btn-sm flex-fill"
              onClick={() => onDeleteReview?.(review.id)}
            >
              Delete review
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;