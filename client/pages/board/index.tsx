import React, { useCallback, useEffect } from 'react';
import { ApolloClient, NormalizedCacheObject, useQuery } from '@apollo/client';
import {
  BoardCategory,
  GetBoardListDocument,
  GetBoardListQuery,
  QueryGetBoardListArgs,
} from '../../generated/graphql';
import { GetServerSideProps } from 'next';
import { initializeApollo } from '../../lib/apolloClient';
import BasicLayout from '../../components/BasicLayout';
import BoardCard from '../../components/molecules/BoardCard/BoardCard';
import Search from '../../components/molecules/Search/Search';
import { useRouter } from 'next/router';
import { isLoggedInSSR } from '../../shared/isLoggedInSSR';

export interface BoardListProps {}

const BoardList: React.FC<BoardListProps> = () => {
  const router = useRouter();
  const { data: boardData, fetchMore } = useQuery<GetBoardListQuery, QueryGetBoardListArgs>(
    GetBoardListDocument,
    {
      fetchPolicy: 'cache-first',
      variables: {
        category: router?.query.category as BoardCategory,
        search: (router?.query.search as string) ?? '',
      },
    },
  );
  const more = async () => {
    if (boardData?.getBoardList.edges.length !== 0) {
      const after = boardData?.getBoardList.pageInfo.endCursor;
      if (boardData?.getBoardList.pageInfo.hasNextPage) {
        try {
          await fetchMore({
            variables: {
              after: parseInt(after!, 10),
            },
          });
        } catch (e) {
          console.log(e);
        }
      }
    }
  };
  const infiniteScroll = async () => {
    const scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
    );
    const scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      await more();
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', infiniteScroll, true);
    return () => {
      window.removeEventListener('scroll', infiniteScroll, true);
    };
  }, [infiniteScroll]);

  const searchBoardList = useCallback(
    async ({ title, category }: { title?: string; category: BoardCategory }) => {
      await router.push(`/board?category=${category}&search=${title}`);
      // await refetch({ filter: { search: title, category: category } });
    },
    [],
  );

  return (
    <BasicLayout title={'Board List'} bg>
      <Search searchBoardList={searchBoardList} />
      {boardData?.getBoardList.edges.length === 0 && <div>게시물이 존재하지 않습니다...</div>}
      {boardData?.getBoardList.edges.map((edge) => (
        <BoardCard
          key={edge.node.id}
          data={{
            id: edge.node.id,
            title: edge.node.title,
            desc: edge.node.desc,
            category: edge.node.category,
            createdAt: edge.node.createdAt,
            updatedAt: edge.node.updatedAt,
            view: edge.node.view,
            user: edge.node.user,
            likes: edge.node.likes,
            comments: edge.node.comments,
          }}
        />
      ))}
      {/*{boardData?.getBoardList.pageInfo.hasNextPage && (*/}
      {/*  <MoreFetch loading={loading} onClick={async () => await more()} />*/}
      {/*)}*/}
    </BasicLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apolloClient: ApolloClient<NormalizedCacheObject> = initializeApollo();
  try {
    let category = null;
    let search = '';
    await isLoggedInSSR({ ctx });
    if (ctx.query?.category) {
      category = ctx.query?.category as BoardCategory;
    }
    if (ctx.query?.search) {
      search = ctx.query?.search as string;
    }
    await apolloClient.query<GetBoardListQuery, QueryGetBoardListArgs>({
      query: GetBoardListDocument,
      fetchPolicy: 'cache-first',
      variables: {
        category: category,
        search: search,
      },
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

export default BoardList;
