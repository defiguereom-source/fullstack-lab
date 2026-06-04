import React from 'react';

interface DeleteConfirmModalProps {
  show: boolean;
  reviewId: string | null;
  onConfirm: (id: string) => void;
  onCancel: () => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  show,
  reviewId,
  onConfirm,
  onCancel,
}) => {
  if (!show || !reviewId) return null;

  return (
    <div
    // eslint-disable-next-line react/forbid-dom-props
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1050,
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
    >
      <div
        className="bg-white rounded-3 shadow p-4"
        style={{ maxWidth: 360, width: '90%' }}
      >
        <h5 id="delete-modal-title" className="fw-semibold mb-2">
          Delete review
        </h5>
        <p className="text-secondary mb-4" style={{ fontSize: 14 }}>
          Are you sure you want to delete this review? This action cannot be undone.
        </p>
        <div className="d-flex gap-2 justify-content-end">
          <button
            className="btn btn-outline-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="btn btn-danger"
            onClick={() => onConfirm(reviewId)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;