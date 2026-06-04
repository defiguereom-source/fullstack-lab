import { gql } from 'graphql-tag';
// Define the GraphQL schema using SDL (Schema Definition Language)
export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    reviews(first: Int, after: String): ReviewConnection
  }

  type Repository {
    id: ID!
    fullName: String!
    reviews(first: Int, after: String): ReviewConnection
  }

  type Review {
    id: ID!
    text: String!
    rating: Int!
    createdAt: String!
    repositoryId: ID!
    user: User!
    repository: Repository!
  }

  type ReviewEdge {
    node: Review!
    cursor: String!
  }

  type PageInfo {
    endCursor: String
    startCursor: String
    hasNextPage: Boolean!
  }

  type ReviewConnection {
    totalCount: Int!
    edges: [ReviewEdge!]!
    pageInfo: PageInfo!
  }

  type Query {
    me: User
    repository(id: ID!): Repository
  }

  type Mutation {
    deleteReview(id: ID!): Boolean!
  }
`;