import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { setContext } from '@apollo/client/link/context';

import './stylesheets/bootstrap-5.3.8-dist/css/bootstrap.min.css';

import AppNavbar from './components/Appnavbar';
import MyReviewsView from './components/Myreviewsview';
import RepositoryReviewsView from './components/Repositoryreviewsview';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('authToken');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      ReviewConnection: {
        fields: {
          edges: {
            keyArgs: false,
            merge(existing = [], incoming: unknown[]) {
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  }),
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <AppNavbar />

        <main>
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/my-reviews" replace />}
            />

            <Route
              path="/my-reviews"
              element={<MyReviewsView />}
            />

            <Route
              path="/repositories/:id"
              element={<RepositoryReviewsView />}
            />

            <Route
              path="*"
              element={<Navigate to="/my-reviews" replace />}
            />
          </Routes>
        </main>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;