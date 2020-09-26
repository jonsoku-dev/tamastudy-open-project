import React from 'react';
import BasicLayout from '../../components/BasicLayout';
import {
  GetGourmetDocument,
  GetGourmetListQuery,
  QueryGetGourmetListArgs,
} from '../../generated/graphql';
import { GetServerSideProps } from 'next';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { initializeApollo } from '../../lib/apolloClient';
import { isLoggedInSSR } from '../../shared/isLoggedInSSR';
import GourmetTemplate from '../../components/templates/Gourmet/Gourmet';

export interface GourmetProps {}

const Gourmet: React.FC<GourmetProps> = () => {
  return (
    <BasicLayout title={'Gourmet'}>
      <GourmetTemplate />
    </BasicLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apolloClient: ApolloClient<NormalizedCacheObject> = initializeApollo();
  try {
    await isLoggedInSSR({ ctx });
    await apolloClient.query<GetGourmetListQuery, QueryGetGourmetListArgs>({
      query: GetGourmetDocument,
      fetchPolicy: 'cache-first',
      variables: {
        lat: "35.5991552",
        lng: "139.6211712",
      },
    });
  } catch (error) {
    console.error(error);
    // ctx.res.writeHead(302, { Location: '/404' });
    // ctx.res.end();
  }
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};

export default Gourmet;
