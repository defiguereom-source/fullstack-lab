import React, { useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';

import ReviewCard from './Reviewcard';
import { useRepositoryReviews } from '../hooks/Userepositoryreviews';


const RepositoryReviewsView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { reviews, repositoryFullName, loading, error, hasNextPage, fetchNextPage } =
    useRepositoryReviews(id ?? '');

  // ─── Infinite scroll ───────────────────────────────────────────────────────
  const observerRef = useRef<IntersectionObserver | null>(null);

  const sentinelRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) observerRef.current.disconnect();
      if (!node) return;

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage && !loading) {
            fetchNextPage();
          }
        },
        { threshold: 0.1 }
      );
      observerRef.current.observe(node);
    },
    [hasNextPage, loading, fetchNextPage]
  );

  if (error) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger">Error: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="container py-4" style={{ maxWidth: 640 }}>
      <h4 className="fw-semibold mb-1">{repositoryFullName ?? id}</h4>
      <p className="text-muted mb-4" style={{ fontSize: 14 }}>
        Reviews
      </p>

      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} showActions={false} />
      ))}

      {loading && (
        <div className="d-flex justify-content-center py-3">
          <div
            className="spinner-border text-primary"
            role="status"
            style={{ width: 28, height: 28 }}
          >
            <span className="visually-hidden">Loading…</span>
          </div>
        </div>
      )}

      {/* Sentinel */}
      {hasNextPage && !loading && (
        <div ref={sentinelRef} style={{ height: 1 }} aria-hidden="true" />
      )}

      {!hasNextPage && reviews.length > 0 && !loading && (
        <p className="text-center text-muted mt-2" style={{ fontSize: 13 }}>
          All reviews loaded.
        </p>
      )}
    </div>
  );
};

export default RepositoryReviewsView;