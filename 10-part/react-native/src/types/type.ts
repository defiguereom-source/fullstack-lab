// ─── Tipos GraphQL ────────────────────────────────────────────────────────────

export interface User {
  id: string;
  username: string;
}

export interface Repository {
  id: string;
  fullName: string;
}

export interface Review {
  id: string;
  text: string;
  rating: number;
  createdAt: string;
  repositoryId: string;
  user: User;
  repository?: Repository;
}

export interface PageInfo {
  endCursor: string | null;
  startCursor: string | null;
  hasNextPage: boolean;
}

export interface ReviewEdge {
  node: Review;
  cursor: string;
}

export interface ReviewConnection {
  totalCount: number;
  edges: ReviewEdge[];
  pageInfo: PageInfo;
}

// ─── Variables de queries ────────────────────────────────────────────────────

export interface GetCurrentUserVars {
  includeReviews?: boolean;
  first?: number;
  after?: string;
}
export interface GetCurrentUserData {
  me: {
    id: string;
    username: string;
    reviews?: ReviewConnection;
  } | null;
}

export interface GetRepositoryReviewsVars {
  id: string;
  first?: number;
  after?: string;
}

export interface GetRepositoryReviewsData {
  repository: {
    id: string;
    fullName: string;
    reviews: ReviewConnection;
  } | null;
}

export interface DeleteReviewVars {
  id: string;
}

export interface DeleteReviewData {
  deleteReview: boolean;
}