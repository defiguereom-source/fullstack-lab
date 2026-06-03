export const typeDefs = `#graphql

type Book {
    title: String!
    author: String!
    published: Int!
    genres: [String!]!
}

type Author{
    name: String!
    born: Int
    bookCount: Int!
}

type Query{
    bookCount: Int!
    authorCount: Int!
    allBooks(
        author: String
        genre: String
    ): [Book!]!

    allAuthors: [Author!]!
}
`