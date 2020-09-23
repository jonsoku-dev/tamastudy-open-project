import React from 'react';
import BasicLayout from '../../components/BasicLayout';
import BoardCreateAndUpdate from '../../components/organisms/BoardCreateAndUpdate/BoardCreateAndUpdate';
import { GetServerSideProps } from 'next';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { initializeApollo } from '../../lib/apolloClient';
import { isLoggedInSSR } from '../../shared/isLoggedInSSR';

export interface CreateProps {}

const Create: React.FC<CreateProps> = () => {
  return (
    <BasicLayout title={'Create'}>
      <BoardCreateAndUpdate />
    </BasicLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apolloClient: ApolloClient<NormalizedCacheObject> = initializeApollo();
  await isLoggedInSSR({ ctx, redirectWhenLoggedOut: true });
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};

export default Create;
