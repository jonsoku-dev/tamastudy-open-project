import React, { useCallback } from 'react';
import * as S from './MainOpenChat.styled';
import MainTitle from '../../atoms/MainTitle/MainTitle';
import Swiper from 'react-id-swiper';
import { GetMainDataQuery } from '../../../generated/graphql';

export interface MainTopProps {
  data: GetMainDataQuery['getOpenchatList'];
}

const MainOpenChat: React.FC<MainTopProps> = ({ data }) => {
  const onClickLink = useCallback(
    (link: any) => () => {
      if (!link.includes('http') || !link.includes('https')) {
        link = `https://${link}`;
      }
      const win = window.open(link, '_blank');
      console.log('test', link);
      if (win) {
        win.focus();
      }
    },
    [],
  );
  return (
    <>
      <S.Logo>
        <img src="https://t1.daumcdn.net/cfile/blog/996D524B5B98DF442A" alt="logo" />
      </S.Logo>
      <MainTitle>
        <h1>OpenChat List</h1>
      </MainTitle>
      <S.Contents>
        <Swiper
          spaceBetween={16}
          slidesPerView={3}
          rebuildOnUpdate
          slidesOffsetBefore={16}
          slidesOffsetAfter={16}
        >
          {data.map((item, idx) => (
            <S.ChatCard key={idx}>
              <S.CardTitle>{item.name}</S.CardTitle>
              <S.CardInfo>
                <p>카테고리 : {item.category}</p>
                <p>참여번호 : {item.participationNumber}</p>
              </S.CardInfo>
              <S.Kakao onClick={onClickLink(item.link)}>
                <img
                  src="https://mblogthumb-phinf.pstatic.net/MjAxODAyMDJfMTA5/MDAxNTE3NTAyODA4ODAz.pfFBh3N_7cDEfgp925XW22NJgDO2-2_CdhjOOJsaqjog.YUrOiE5xseldfEb3R9_y8LMPuy8o4ml5JCqLHi1yHGgg.PNG.marketstory24/%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%86%A1_%EB%A1%9C%EA%B3%A0_4.png?type=w800"
                  alt=""
                />
              </S.Kakao>
            </S.ChatCard>
          ))}
        </Swiper>
      </S.Contents>
    </>
  );
};

export default MainOpenChat;
