import React, { useCallback } from 'react';
import MainTitle from '../../atoms/MainTitle/MainTitle';
import * as S from './MainNewsList.styled';
import Swiper from 'react-id-swiper';
import { GetMainDataQuery } from '../../../generated/graphql';

export interface MainNewsListProps {
  data: {
    usBoardList: GetMainDataQuery['usBoardList'];
    jpBoardList: GetMainDataQuery['jpBoardList'];
    krBoardList: GetMainDataQuery['krBoardList'];
  };
}

const MainNewsList: React.FC<MainNewsListProps> = ({ data }) => {
  const onClickNews = useCallback(
    (portal: any) => () => {
      if (!portal.includes('http') || !portal.includes('https')) {
        portal = `https://${portal}`;
      }
      const win = window.open(portal, '_blank');
      console.log('test', portal);
      if (win) {
        win.focus();
      }
    },
    [],
  );
  if (!data) {
    return null;
  }
  return (
    <S.Wrapper>
      <MainTitle>
        <h1>Today's News</h1>
      </MainTitle>
      <S.Section>
        <S.SwiperWrapper>
          <Swiper
            spaceBetween={8}
            slidesPerView={3}
            rebuildOnUpdate
            slidesOffsetBefore={2}
            activeSlideKey={'3'}
          >
            {data.krBoardList.map((item, idx) => (
              <S.NewsContainer key={item.id} onClick={onClickNews(item.portal)}>
                <S.NewsBox idx={idx}>
                  <h3>{item.title}</h3>
                  <p>{item.content}</p>
                </S.NewsBox>
              </S.NewsContainer>
            ))}
          </Swiper>
        </S.SwiperWrapper>
      </S.Section>
      <S.Section>
        <S.SwiperWrapper>
          <Swiper
            spaceBetween={8}
            slidesPerView={3}
            rebuildOnUpdate
            slidesOffsetBefore={2}
            activeSlideKey={'7'}
          >
            {data.usBoardList.map((data, idx) => (
              <S.NewsContainer key={data.id} onClick={onClickNews(data.portal)}>
                <S.NewsBox idx={idx}>
                  <h3>{data.title}</h3>
                  <p>{data.content}</p>
                </S.NewsBox>
              </S.NewsContainer>
            ))}
          </Swiper>
        </S.SwiperWrapper>
      </S.Section>
      <S.Section>
        <S.SwiperWrapper>
          <Swiper
            spaceBetween={8}
            slidesPerView={3}
            rebuildOnUpdate
            slidesOffsetBefore={2}
            activeSlideKey={'1'}
          >
            {data.jpBoardList.map((data, idx) => (
              <S.NewsContainer key={data.id} onClick={onClickNews(data.portal)}>
                <S.NewsBox idx={idx}>
                  <h3>{data.title}</h3>
                  <p>{data.content}</p>
                </S.NewsBox>
              </S.NewsContainer>
            ))}
          </Swiper>
        </S.SwiperWrapper>
      </S.Section>
    </S.Wrapper>
  );
};

export default MainNewsList;
