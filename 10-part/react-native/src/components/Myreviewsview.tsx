import React, { useCallback, useRef, useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { useNavigate } from 'react-router-dom';

import ReviewCard from './Reviewcard';
import DeleteConfirmModal from './Deleteconfirmmodal';
import { useUserReviews } from '../hooks/Useuserreviews';
import { DELETE_REVIEW } from '../GraphQL/queries';
import type { DeleteReviewData, DeleteReviewVars } from '../types/type';

// 
const MyReviewsView: React.FC = () => {
  const navigate = useNavigate();
  const { reviews, loading, error, hasNextPage, fetchNextPage, refetch } =
    useUserReviews();

  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const [deleteReview, { loading: deleting }] = useMutation<
    DeleteReviewData,
    DeleteReviewVars
  >(DELETE_REVIEW);

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

  // ─── Handlers ──────────────────────────────────────────────────────────────

  const handleViewRepository = (repositoryId: string) => {
    navigate(`/repositories/${repositoryId}`);
  };

  const handleDeleteRequest = (reviewId: string) => {
    setPendingDeleteId(reviewId);
  };

  const handleDeleteConfirm = async (reviewId: string) => {
    try {
      await deleteReview({ variables: { id: reviewId } });
      setPendingDeleteId(null);

      await refetch();
    } catch (err) {
      console.error('Error deleting review:', err);
      setPendingDeleteId(null);
    }
  };

  const handleDeleteCancel = () => {
    setPendingDeleteId(null);
  };

  // ─── Render ────────────────────────────────────────────────────────────────

  if (error) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger" role="alert">
          Error loading reviews: {error.message}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container py-4" style={{ maxWidth: 640 }}>
        <h4 className="fw-semibold mb-4">My reviews</h4>

        {reviews.length === 0 && !loading ? (
          <div className="text-center text-muted py-5">
            <p className="mb-0">You haven't written any reviews yet.</p>
          </div>
        ) : (
          reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              showActions
              onViewRepository={handleViewRepository}
              onDeleteReview={handleDeleteRequest}
            />
          ))
        )}

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

        {hasNextPage && !loading && (
          <div ref={sentinelRef} style={{ height: 1 }} aria-hidden="true" />
        )}

        {!hasNextPage && reviews.length > 0 && !loading && (
          <p className="text-center text-muted mt-2" style={{ fontSize: 13 }}>
            No more reviews to load.
          </p>
        )}
      </div>

      <DeleteConfirmModal
        show={!!pendingDeleteId}
        reviewId={pendingDeleteId}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />

      {deleting && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(255,255,255,0.6)',
            zIndex: 1060,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Deleting…</span>
          </div>
        </div>
      )}
    </>
  );
};

export default MyReviewsView;