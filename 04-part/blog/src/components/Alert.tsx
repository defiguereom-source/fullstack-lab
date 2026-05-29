interface AlertProps {
  type: 'success' | 'danger'
  message: string
  onClose: () => void
}

const Alert = ({ type, message, onClose }: AlertProps) => {
  const icon =
    type === 'success'
      ? 'bi-check-circle-fill'
      : 'bi-exclamation-triangle-fill'

  return (
    <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
      <i className={`bi ${icon} me-2`}></i>
      {message}
      <button type="button" className="btn-close" onClick={onClose} />
    </div>
  )
}

export default Alert