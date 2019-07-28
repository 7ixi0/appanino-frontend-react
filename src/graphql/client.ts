import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

const loggedIn = () => !!localStorage.getItem('token');

export const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    new HttpLink({
      uri: process.env.REACT_APP_GRAPHQL_URI,
      credentials: 'same-origin',
    }),
  ]),
  cache: new InMemoryCache(),
  resolvers: {
    Query: {
      isLoggedIn() {
        return loggedIn();
      },
    },
  },
});

// Pre-populate cache
client.writeData({
  data: {
    isLoggedIn: loggedIn(),
  },
});
