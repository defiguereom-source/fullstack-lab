interface NavbarProps {
  showForm: boolean
  onToggleForm: () => void
}
 
const Navbar = ({ showForm, onToggleForm }: NavbarProps) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <span className="navbar-brand fw-bold fs-4">
          <i className="bi bi-journal-richtext me-2"></i>BlogApp
        </span>
        <button
          className="btn btn-outline-light btn-sm ms-auto"
          onClick={onToggleForm}
        >
          <i className={`bi ${showForm ? 'bi-x-lg' : 'bi-plus-lg'} me-1`}></i>
          {showForm ? 'Cancelar' : 'Nuevo blog'}
        </button>
      </div>
    </nav>
  )
}
 
export default Navbar