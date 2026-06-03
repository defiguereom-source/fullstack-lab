import { books, authors } from '../database/data'

const getBooks = () => books

const getAuthors = () => authors

const getBookCount = () => books.length

const getAuthorCount = () => authors.length

export default {
  getBooks,
  getAuthors,
  getBookCount,
  getAuthorCount
}