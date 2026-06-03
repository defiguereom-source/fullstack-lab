export const books = [
  {
    title: 'Clean Code',
    author: 'Robert Martin',
    published: 2008,
    genres: ['refactoring']
  }
]

export const authors = [
  {
    name: 'Robert Martin',
    born: 1952
  }
]

export type Book = typeof books[number]
export type Author = typeof authors[number]