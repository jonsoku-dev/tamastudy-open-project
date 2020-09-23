import React from 'react';
import BasicLayout from '../../../components/BasicLayout';
import { GetServerSideProps } from 'next';
import { ApolloClient, NormalizedCacheObject, useQuery } from '@apollo/client';
import { initializeApollo } from '../../../lib/apolloClient';
import { GetBoardDocument, GetBoardQuery, QueryGetBoardArgs } from '../../../generated/graphql';
import { useRouter } from 'next/router';
import BoardDetail from '../../../components/organisms/BoardDetail/BoardDetail';
import { isLoggedInSSR } from '../../../shared/isLoggedInSSR';

export interface BoardProps {}

const Board: React.FC<BoardProps> = () => {
  const router = useRouter();
  const { data, loading } = useQuery<GetBoardQuery, QueryGetBoardArgs>(GetBoardDocument, {
    variables: {
      boardId: router.query.boardId as string,
    },
    fetchPolicy: 'cache-first',
  });
  if (loading) {
    return <div>Loading ...</div>;
  }
  if (!data) {
    return null;
  }
  return (
    <BasicLayout title={'Board Page'} bg>
      <BoardDetail data={data.getBoard} />
    </BasicLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  console.log(ctx);
  const apolloClient: ApolloClient<NormalizedCacheObject> = initializeApollo();
  try {
    await isLoggedInSSR({ ctx });
    await apolloClient.query<GetBoardQuery, QueryGetBoardArgs>({
      query: GetBoardDocument,
      variables: {
        boardId: ctx.params?.boardId as string,
      },
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

export default Board;
