import React from 'react';
import BasicLayout from '../../components/BasicLayout';
import {
  GetBoardListDocument,
  GetBoardListQuery,
  GetGourmetDocument,
  GetGourmetListQuery,
  QueryGetBoardListArgs,
  useGetGourmetListQuery,
} from '../../generated/graphql';
import { GetServerSideProps } from 'next';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { initializeApollo } from '../../lib/apolloClient';
import { isLoggedInSSR } from '../../shared/isLoggedInSSR';
import GourmetSearch, { ISearchData } from '../../components/organisms/GourmetSearch/GourmetSearch';
import GourmetMap from '../../components/organisms/GourmetMap/GourmetMap';
import GourmetDetail from '../../components/organisms/GourmetDetail/GourmetDetail';
import GourmetList from '../../components/organisms/GourmetList/GourmetList';

export interface QueryGetGourmetListArgs {
  lat: number;
  lng: number;
}

export interface GourmetProps {}

const Gourmet: React.FC<GourmetProps> = () => {
  const { data, loading, refetch } = useGetGourmetListQuery({
    fetchPolicy: 'cache-first',
    variables: {
      lat: 90, // TODO:: default center lat
      lng: 120, // TODO:: default center lng
    },
    onError({ message }) {
      alert(message);
    },
  });

  const handleSearch = async ({ category, score, search }: ISearchData) => {
    await refetch({
      lat: 90,
      lng: 120,
      category,
      score,
      search,
    });
  };

  if (loading) {
    return null;
  }
  if (!data) {
    return null;
  }

  return (
    <BasicLayout title={'Gourmet'}>
      <GourmetSearch handleSearch={handleSearch} />
      <GourmetMap data={data.getGourmetList} />
      <GourmetList data={data.getGourmetList} />
      <GourmetDetail />
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
        lat: 0,
        lng: 0,
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
