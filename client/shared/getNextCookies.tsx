import cookies from 'next-cookies';
import { GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { CurrentUserDocument } from '../generated/graphql';

export const getNextCookies = (
  ctx: GetServerSidePropsContext<ParsedUrlQuery>,
  apolloClient: ApolloClient<NormalizedCacheObject>,
) => {
  const token = cookies(ctx).token;
  if (!token) {
    apolloClient.writeQuery({
      query: CurrentUserDocument,
      data: {
        currentUser: null,
      },
    });
  }
  return token;
};
