import { CurrentUserDocument } from '../generated/graphql';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

export const ssrCurrentUser = async (
  token: string,
  apolloClient: ApolloClient<NormalizedCacheObject>,
) => {
  try {
    await apolloClient.query({
      query: CurrentUserDocument,
      fetchPolicy: 'cache-first',
      context: {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    });
  } catch (e) {
    if (e.message === 'Unauthorized') {
      apolloClient.writeQuery({
        query: CurrentUserDocument,
        data: {
          isLoggedIn: null,
        },
      });
    }
  }
};
