import type { Blog } from '../types/blog'

interface BlogCardProps {
  blog: Blog
}

const BlogCard = ({ blog }: BlogCardProps) => {
  return (
    <div className="card h-100 shadow-sm border-0 rounded-3">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-bold text-dark mb-1">{blog.title}</h5>
        <p className="text-muted small mb-3">
          <i className="bi bi-person-fill me-1"></i>{blog.author}
        </p>
        <a
          href={blog.url}
          target="_blank"
          rel="noreferrer"
          className="text-decoration-none text-primary small text-truncate mb-4"
        >
          <i className="bi bi-link-45deg me-1"></i>{blog.url}
        </a>
        <div className="mt-auto d-flex align-items-center justify-content-between">
          <span className="badge bg-dark rounded-pill px-3 py-2">
            <i className="bi bi-heart-fill me-1 text-danger"></i>
            {blog.likes} {blog.likes === 1 ? 'like' : 'likes'}
          </span>
          <a
            href={blog.url}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline-dark btn-sm"
          >
            Leer <i className="bi bi-arrow-right ms-1"></i>
          </a>
        </div>
      </div>
    </div>
  )
}

export default BlogCard