import { useEffect, useState } from 'react'

import Navbar from './components/Navbar'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'

import blogService from './services/BlogService'

import type { Blog, NewBlog } from './types/blog'
import './stylesheets/bootstrap-5.3.8-dist/css/bootstrap.min.css'

function App() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await blogService.getAll()
        setBlogs(data)
      } catch (error) {
        console.error('Error loading blogs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  const handleCreateBlog = async (blog: NewBlog) => {
    try {
      const createdBlog = await blogService.create(blog)

      setBlogs(prev => [...prev, createdBlog])

      setShowForm(false)
    } catch (error) {
      console.error('Error creating blog:', error)
    }
  }

  const handleToggleForm = () => {
    setShowForm(prev => !prev)
  }

  const handleCancelForm = () => {
    setShowForm(false)
  }

  return (
    <div className="App">
      <Navbar
        showForm={showForm}
        onToggleForm={handleToggleForm}
      />

      <div className="container py-4">
        <h1 className="mb-4">Blogs</h1>

        {showForm && (
          <BlogForm
            onSubmit={handleCreateBlog}
            onCancel={handleCancelForm}
          />
        )}

        <BlogList
          blogs={blogs}
          loading={loading}
        />
      </div>
    </div>
  )
}

export default App