import { useQuery } from '@apollo/client/react';
import { GET_CURRENT_USER } from '../GraphQL/queries';
import type {
  GetCurrentUserData,
  GetCurrentUserVars,
  ReviewEdge,
} from '../types/type';

const REVIEWS_FIRST = 4; 

export const useUserReviews = () => {
  const { data, loading, error, fetchMore, refetch } = useQuery<
    GetCurrentUserData,
    GetCurrentUserVars
  >(GET_CURRENT_USER, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  });

  const reviewConnection = data?.me?.reviews;
  const edges: ReviewEdge[] = reviewConnection?.edges ?? [];
  const pageInfo = reviewConnection?.pageInfo;
  const hasNextPage = pageInfo?.hasNextPage ?? false;

  /** Carga más reviews cuando el usuario llega al final de la lista */
  const fetchNextPage = () => {
    if (!hasNextPage || !pageInfo?.endCursor) return;

    fetchMore({
    variables: {
        includeReviews: true,
        after: pageInfo.endCursor,
        first: REVIEWS_FIRST,
    },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult?.me?.reviews) return prevResult;

        const prevEdges = prevResult.me?.reviews?.edges ?? [];
        const newEdges = fetchMoreResult.me.reviews.edges;

        return {
          ...fetchMoreResult,
          me: {
            ...fetchMoreResult.me!,
            reviews: {
              ...fetchMoreResult.me!.reviews!,
              edges: [...prevEdges, ...newEdges],
            },
          },
        };
      },
    });
  };

  return {
    reviews: edges.map((e) => e.node),
    loading,
    error,
    hasNextPage,
    fetchNextPage,
    refetch,
  };
};