import { useMemo } from 'react';
import { ApolloClient, FieldPolicy, InMemoryCache } from '@apollo/client';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import Cookies from 'js-cookie';
import { ApolloLink } from 'apollo-link';
import { relayStylePagination } from '@apollo/client/utilities';

let apolloClient: any;

function createApolloClient() {
  // const httpLink = createHttpLink({
  //   uri: 'http://localhost:5000/graphql',
  //   credentials: 'include',
  // });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    // server
    // TODO
    // client
    console.log(graphQLErrors);
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) => {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
            locations,
          )}, Path: ${path}`,
        );
      });
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  const authLink = setContext((_, { headers }) => {
    if (typeof window !== 'undefined') {
      console.log('we are running on the client');
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${Cookies.get('token')}`,
        },
      };
    } else {
      console.log('we are running on the server');
      return {
        headers: {
          ...headers,
        },
      };
    }
  });

  const batchLink = new BatchHttpLink({
    uri: 'http://localhost:5000/graphql',
    credentials: 'include',
  });

  const fixedRelayStylePagination = (...args: any[]): FieldPolicy => ({
    ...relayStylePagination(...args),
    read: (...readArgs) => {
      const existing = readArgs[0];
      const originalRead = relayStylePagination(...args).read;
      if (!existing || !originalRead) {
        return;
      }
      return originalRead(...readArgs);
    },
    merge: function (existing, incoming, _a) {
      // 처음 검색했을 때... 더 좋은 방법을 찾아봐야함. 이건 너무 이상...
      if (_a.args?.filter && !_a.args?.paginate) {
        return {
          ...incoming,
          edges: incoming.edges,
          pageInfo: incoming.pageInfo,
        };
      }
      // 인피니티 스크롤 - fetchMore 함수로 가져온 데이터가 있을 때
      if (existing && incoming) {
        return {
          ...incoming,
          edges: [...existing.edges, ...incoming.edges],
          pageInfo: incoming.pageInfo,
        };
        // 인피니티 스크롤 - fetchMore 함수로 가져온 데이터가 없을 때
      } else {
        return incoming;
      }
    },
  });

  const cache = new InMemoryCache({
    typePolicies: {
      Board: {
        fields: {
          comments: {
            merge(_, incoming) {
              return incoming;
            },
          },
          likes: {
            merge(_, incoming) {
              return incoming;
            },
          }
        },
      },
      Query: {
        fields: {
          getBoardList: fixedRelayStylePagination(),
          getBoard: {
            merge(existing, incoming) {
              return { ...existing, ...incoming };
            },
          },
        },
      },
    },
  });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    link: ApolloLink.from([errorLink, authLink, batchLink]),
    cache,
  });
}

export const initializeApollo = (initialState = null) => {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...(initialState as any) });
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

export const useApollo = (initialState: any) => {
  return useMemo(() => initializeApollo(initialState), [initialState]);
};
