import axios from 'axios'
import type { Blog, NewBlog } from '../types/blog'

const baseUrl = 'http://localhost:3001/api/blogs'

const getAll = async (): Promise<Blog[]> => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (blog: NewBlog): Promise<Blog> => {
  const response = await axios.post(baseUrl, blog)
  return response.data
}

export default {
  getAll,
  create,
}