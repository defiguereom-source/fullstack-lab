// simple resolver functions to fetch data for the GraphQL queries
import { books, authors } from '../database/data'

export const resolvers = {
    Query:{
        bookCount: () => books.length,
        authorCount: () => authors.length,
        allBooks: () => books,
        allAuthors: () => authors
    }
}