import React, { useCallback } from 'react';
import MainTitle from '../../atoms/MainTitle/MainTitle';
import * as S from './MainNewsList.styled';
import Swiper from 'react-id-swiper';
import { useQuery } from '@apollo/client';
import { GetNewsListDocument, GetNewsListQuery } from '../../../generated/graphql';

export interface MainNewsListProps {}

const MainNewsList: React.FC<MainNewsListProps> = () => {
  const { data: newsData } = useQuery<GetNewsListQuery>(GetNewsListDocument, {
    fetchPolicy: 'cache-first',
  });
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
  if (!newsData) {
    return null;
  }
  console.log(newsData);
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
            {newsData.krBoardList.map((data, idx) => (
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
            activeSlideKey={'7'}
          >
            {newsData.usBoardList.map((data, idx) => (
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
            {newsData.jpBoardList.map((data, idx) => (
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
