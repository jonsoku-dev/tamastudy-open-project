import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { initializeApollo } from '../lib/apolloClient';
import cookies from 'next-cookies';
import { CurrentUserDocument } from '../generated/graphql';
import { GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';

export interface IsLoggedInSSRInterface {
  ctx: GetServerSidePropsContext<ParsedUrlQuery>;
  redirectWhenLoggedIn?: boolean;
  redirectWhenLoggedOut?: boolean;
}

export const isLoggedInSSR = async ({
  ctx,
  redirectWhenLoggedIn = false,
  redirectWhenLoggedOut = false,
}: IsLoggedInSSRInterface): Promise<boolean> => {
  const apolloClient: ApolloClient<NormalizedCacheObject> = initializeApollo();
  try {
    const token = cookies(ctx).token;
    if (!token && redirectWhenLoggedOut) {
      ctx.res.writeHead(302, { Location: '/login' });
      ctx.res.end();
      return false;
    }
    await apolloClient.query({
      query: CurrentUserDocument,
      fetchPolicy: 'cache-first',
      context: {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    });
    if(redirectWhenLoggedIn) {
      ctx.res.writeHead(302, { Location: '/' });
      ctx.res.end();
      return true;
    }
    return true;
  } catch (e) {
    if (e.message === 'Unauthorized') {
      apolloClient.writeQuery({
        query: CurrentUserDocument,
        data: {
          isLoggedIn: null,
        },
      });
      if (redirectWhenLoggedOut) {
        ctx.res.writeHead(302, { Location: '/login' });
        ctx.res.end();
      }
    }
    return false;
  }
};
