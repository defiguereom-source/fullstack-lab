import express from 'express';
import cors from 'cors';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

import { typeDefs } from './schema';
import { resolvers } from './resolver';
// Start the Express server and apply the Apollo GraphQL middleware
async function start() {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(cors());
  app.use(express.json());

  app.use(
    '/graphql',
    expressMiddleware(server) as express.RequestHandler
  );

  app.listen(4000, () => {
    console.log('Server running on http://localhost:4000/graphql');
  });
}

start();