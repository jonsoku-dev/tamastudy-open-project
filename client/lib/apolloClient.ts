import { useMemo } from 'react';
import { ApolloClient, FieldPolicy, InMemoryCache, split } from '@apollo/client';
import { ApolloLink } from 'apollo-link';
import { getMainDefinition, relayStylePagination } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import Cookies from 'js-cookie';
import { onError } from '@apollo/client/link/error';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';

let apolloClient: any;

function createApolloClient() {
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
      BoardComment: {
        fields: {
          boardCommentReplies: {
            merge(_, incoming) {
              return incoming;
            },
          },
        },
      },
      GetGourmetResponseDto: {
        fields: {
          comments: {
            merge(_, incoming) {
              return incoming;
            },
          },
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
          getGourmet: {
            merge(existing, incoming) {
              return { ...existing, ...incoming };
            },
          },
        },
      },
    },
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

  const uploadLink = createUploadLink({
    uri: 'http://localhost:5000/graphql',
    credentials: 'include',
  });

  const wsLink = process.browser
    ? new WebSocketLink({
        uri: 'ws://localhost:5000/graphql',
        options: {
          reconnect: true,
          connectionParams: {
            headers: {
              authorization: `Bearer ${Cookies.get('token')}`,
            },
          },
        },
      })
    : () => {
        console.log('SSR');
      };

  const combinedLinks = split(
    ({ query }) => {
      const { kind, operation }: any = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    wsLink,
    uploadLink,
  );

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message }) => {
        console.log(`Unexpected error: ${message}`);
      });
    }
    if (networkError) {
      console.log(`Network error: ${networkError}`);
    }
  });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    link: ApolloLink.from([errorLink, authLink, combinedLinks]),
    cache,
  });
}

export const initializeApollo = (initialState = null) => {
  const _apolloClient = apolloClient ?? createApolloClient();
  if (initialState) {
    const existingCache = _apolloClient.extract();
    _apolloClient.cache.restore({ ...existingCache, ...(initialState as any) });
  }
  if (typeof window === 'undefined') return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
};

export const useApollo = (initialState: any) => {
  return useMemo(() => initializeApollo(initialState), [initialState]);
};
