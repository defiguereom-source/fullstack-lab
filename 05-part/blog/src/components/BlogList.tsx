import type { Blog } from '../types/blog'
import BlogCard from './BlogCard'


interface BlogListProps {
  blogs: Blog[]
  loading: boolean
}

const BlogList = ({ blogs, loading }: BlogListProps) => {
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-dark" role="status" />
        <p className="text-muted mt-3">Cargando blogs...</p>
      </div>
    )
  }

  if (blogs.length === 0) {
    return (
      <div className="text-center py-5 text-muted">
        <i className="bi bi-journal-x display-4 d-block mb-3"></i>
        <p className="fs-5">No hay blogs todavía. ¡Agrega el primero!</p>
      </div>
    )
  }

  return (
    <div className="row g-4">
      {blogs.map(blog => (
        <div key={blog._id} className="col-md-6 col-lg-4">
          <BlogCard blog={blog} />
        </div>
      ))}
    </div>
  )
}

export default BlogList