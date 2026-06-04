import { gql } from '@apollo/client';

// ─── Fragmentos reutilizables ───────────────────────────────────────────────

export const REVIEW_FIELDS = gql`
  fragment ReviewFields on Review {
    id
    text
    rating
    createdAt
    repositoryId
    user {
      id
      username
    }
    repository {
      id
      fullName
    }
  }
`;

// ─── Ejercicio 10.26: usuario actual con reviews (directiva @include) ────────

export const GET_CURRENT_USER = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        totalCount
        edges {
          node {
            ...ReviewFields
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
  ${REVIEW_FIELDS}
`;


export const GET_REPOSITORY_REVIEWS = gql`
  query getRepositoryReviews($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      id
      fullName
      reviews(first: $first, after: $after) {
        totalCount
        edges {
          node {
            ...ReviewFields
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
  ${REVIEW_FIELDS}
`;

// ─── Ejercicio 10.27: eliminar review ───────────────────────────────────────

export const DELETE_REVIEW = gql`
  mutation deleteReview($id: ID!) {
    deleteReview(id: $id)
  }
`;