import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORY_REVIEWS } from '../GraphQL/queries';
import type {
  GetRepositoryReviewsData,
  GetRepositoryReviewsVars,
  ReviewEdge,
} from '../types/type';

const REVIEWS_FIRST = 4;

export const useRepositoryReviews = (repositoryId: string) => {
  const { data, loading, error, fetchMore } = useQuery<
    GetRepositoryReviewsData,
    GetRepositoryReviewsVars
  >(GET_REPOSITORY_REVIEWS, {
    variables: { id: repositoryId, first: REVIEWS_FIRST },
    fetchPolicy: 'cache-and-network',
    skip: !repositoryId,
  });

  const reviewConnection = data?.repository?.reviews;
  const edges: ReviewEdge[] = reviewConnection?.edges ?? [];
  const pageInfo = reviewConnection?.pageInfo;
  const hasNextPage = pageInfo?.hasNextPage ?? false;

  const fetchNextPage = () => {
    if (!hasNextPage || !pageInfo?.endCursor) return;

    fetchMore({
      variables: {
        id: repositoryId,
        first: REVIEWS_FIRST,
        after: pageInfo.endCursor,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult?.repository?.reviews) return prevResult;

        const prevEdges = prevResult.repository?.reviews?.edges ?? [];
        const newEdges = fetchMoreResult.repository.reviews.edges;

        return {
          ...fetchMoreResult,
          repository: {
            ...fetchMoreResult.repository!,
            reviews: {
              ...fetchMoreResult.repository!.reviews,
              edges: [...prevEdges, ...newEdges],
            },
          },
        };
      },
    });
  };

  return {
    reviews: edges.map((e) => e.node),
    repositoryFullName: data?.repository?.fullName,
    loading,
    error,
    hasNextPage,
    fetchNextPage,
  };
};