import React from 'react';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { GetServerSideProps } from 'next';
import BasicLayout from '../components/BasicLayout';
import { initializeApollo } from '../lib/apolloClient';
import { isLoggedInSSR } from '../shared/isLoggedInSSR';
import Main from '../components/templates/Main/Main';
import { GetMainDataDocument, GetMainDataQuery } from '../generated/graphql';

export interface indexProps {}

const Index: React.FC<indexProps> = () => {
  return (
    <BasicLayout title={''} isMain>
      <Main />
    </BasicLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apolloClient: ApolloClient<NormalizedCacheObject> = initializeApollo();
  try {
    await isLoggedInSSR({ ctx });
    await apolloClient.query<GetMainDataQuery>({
      query: GetMainDataDocument,
      fetchPolicy: 'cache-first',
    });
  } catch (error) {
    console.error(error);
    ctx.res.writeHead(302, { Location: '/404' });
    ctx.res.end();
  }
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};

export default Index;
