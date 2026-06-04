const reviews = [
  {
    id: 'r1',
    text: 'Great repo',
    rating: 90,
    createdAt: new Date().toISOString(),
    repositoryId: 'repo1',
    user: { id: '1', username: 'dan' },
    repository: { id: 'repo1', fullName: 'fullstack/repo1' },
  },
];
// Define the resolvers for the GraphQL schema
export const resolvers = {
  Query: {
    me: () => ({
      id: '1',
      username: 'dan',
      reviews: () => ({
        totalCount: reviews.length,
        edges: reviews.map((r) => ({
          node: r,
          cursor: r.id,
        })),
        pageInfo: {
          endCursor: reviews.at(-1)?.id ?? null,
          startCursor: reviews[0]?.id ?? null,
          hasNextPage: false,
        },
      }),
    }),

    repository: (_: any, args: any) => ({
      id: args.id,
      fullName: `repo/${args.id}`,
      reviews: () => ({
        totalCount: reviews.length,
        edges: reviews.map((r) => ({
          node: r,
          cursor: r.id,
        })),
        pageInfo: {
          endCursor: reviews.at(-1)?.id ?? null,
          startCursor: reviews[0]?.id ?? null,
          hasNextPage: false,
        },
      }),
    }),
  },

  Mutation: {
    deleteReview: (_: any, args: any) => {
      const index = reviews.findIndex((r) => r.id === args.id);
      if (index === -1) return false;

      reviews.splice(index, 1);
      return true;
    },
  },
};