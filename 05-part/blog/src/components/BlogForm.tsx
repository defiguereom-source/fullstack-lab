import { useState } from 'react'
import type { NewBlog } from '../types/blog'
 
interface BlogFormProps {
  onSubmit: (blog: NewBlog) => Promise<void>
  onCancel: () => void
}
 
const INITIAL_FORM: NewBlog = { title: '', author: '', url: '', likes: 0 }
 
const BlogForm = ({ onSubmit, onCancel }: BlogFormProps) => {
  const [form, setForm] = useState<NewBlog>(INITIAL_FORM)
  const [submitting, setSubmitting] = useState(false)
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: name === 'likes' ? Number(value) : value,
    }))
  }
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    await onSubmit(form)
    setForm(INITIAL_FORM)
    setSubmitting(false)
  }
 
  return (
    <div className="card shadow-sm border-0 mb-5">
      <div className="card-header bg-dark text-white fw-semibold">
        <i className="bi bi-pencil-square me-2"></i>Agregar nuevo blog
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Título <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="title"
                className="form-control"
                placeholder="Título del blog"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Autor <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="author"
                className="form-control"
                placeholder="Nombre del autor"
                value={form.author}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-8">
              <label className="form-label fw-semibold">
                URL <span className="text-danger">*</span>
              </label>
              <input
                type="url"
                name="url"
                className="form-control"
                placeholder="https://ejemplo.com/post"
                value={form.url}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-semibold">Likes</label>
              <input
                type="number"
                name="likes"
                className="form-control"
                min={0}
                value={form.likes}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-4 d-flex gap-2">
            <button type="submit" className="btn btn-dark" disabled={submitting}>
              {submitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" />
                  Guardando...
                </>
              ) : (
                <>
                  <i className="bi bi-save me-1"></i>Guardar blog
                </>
              )}
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onCancel}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
 
export default BlogForm
 