import React from 'react';
import * as S from './Main.styled';
import useWindowSize from '../../../shared/hooks/useWindowSize';
import NoticeList from '../../organisms/NoticeList/NoticeList';
import MainBoardList from '../../organisms/MainBoardList/MainBoardList';
import MainNewsList from '../../organisms/MainNewsList/MainNewsList';
import MainTop from '../../organisms/MainTop/MainTop';
import MainOpenChat from '../../organisms/MainOpenChat/MainOpenChat';
import { useGetMainDataQuery } from '../../../generated/graphql';

export interface MainProps {}

const Main: React.FC<MainProps> = () => {
  const { data } = useGetMainDataQuery();
  const [, height] = useWindowSize();
  if (!data) {
    return null;
  }
  return (
    <S.Wrapper>
      <S.Section1 height={height}>
        <MainTop />
      </S.Section1>
      <S.Section2 height={height}>
        <NoticeList data={data.getNoticeList} />
      </S.Section2>
      <S.Section3 height={height}>
        <MainBoardList
          data={{
            jobBoardList: data.jobBoardList,
            tradeBoardList: data.tradeBoardList,
            freeBoardList: data.freeBoardList,
            fqBoardList: data.fqBoardList,
          }}
        />
      </S.Section3>
      <S.Section4 height={height}>
        <MainNewsList
          data={{
            usBoardList: data.usBoardList,
            jpBoardList: data.jpBoardList,
            krBoardList: data.krBoardList,
          }}
        />
      </S.Section4>
      <S.Section5 height={height}>
        <MainOpenChat data={data.getOpenchatList} />
      </S.Section5>
      {/*<S.Section5 height={height / 4}>*/}
      {/*  Footer*/}
      {/*</S.Section5>*/}
    </S.Wrapper>
  );
};

export default Main;
