import React from 'react';
import BasicLayout from '../../../components/BasicLayout';
import BoardCreateAndUpdate from '../../../components/organisms/BoardCreateAndUpdate/BoardCreateAndUpdate';
import { GetServerSideProps } from 'next';
import { ApolloClient, NormalizedCacheObject, useQuery } from '@apollo/client';
import { initializeApollo } from '../../../lib/apolloClient';
import { GetBoardDocument, GetBoardQuery, QueryGetBoardArgs } from '../../../generated/graphql';
import { useRouter } from 'next/router';
import { isLoggedInSSR } from '../../../shared/isLoggedInSSR';

export interface EditProps {}

const Edit: React.FC<EditProps> = () => {
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
  console.log(data);
  return (
    <BasicLayout title={'Edit Page'}>
      <BoardCreateAndUpdate isEdit editData={data.getBoard} />
    </BasicLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apolloClient: ApolloClient<NormalizedCacheObject> = initializeApollo();
  try {
    const isLoggedIn = await isLoggedInSSR({ ctx, redirectWhenLoggedOut: true });
    if (isLoggedIn) {
      await apolloClient.query<GetBoardQuery, QueryGetBoardArgs>({
        query: GetBoardDocument,
        variables: {
          boardId: ctx.params?.boardId as string,
        },
        fetchPolicy: 'cache-first',
      });
    }
    return {
      props: {
        initialApolloState: apolloClient.cache.extract(),
      },
    };
  } catch (error) {
    ctx.res.writeHead(302, { Location: '/board' });
    ctx.res.end();
    return {
      props: {
        initialApolloState: apolloClient.cache.extract(),
      },
    };
  }
};

export default Edit;
