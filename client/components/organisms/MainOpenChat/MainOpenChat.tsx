import React from 'react';
import * as S from './MainOpenChat.styled';
import MainTitle from '../../atoms/MainTitle/MainTitle';
import Swiper from 'react-id-swiper';

export interface MainTopProps {}

const MainOpenChat: React.FC<MainTopProps> = () => {
  return (
    <>
      <S.Logo>
        <img
          src="https://t1.daumcdn.net/cfile/blog/996D524B5B98DF442A"
          alt="logo"
        />
      </S.Logo>
      <MainTitle>
        <h1>OpenChat List</h1>
      </MainTitle>
      <S.Contents>
        <Swiper spaceBetween={16} slidesPerView={3} rebuildOnUpdate slidesOffsetBefore={16} slidesOffsetAfter={16}>
          {[1, 2, 3, 4, 5, 6, 7].map((_, idx) => (
            <S.ChatCard key={idx}>
              <S.CardTitle>한일 IT 커뮤니티</S.CardTitle>
              <S.CardInfo>
                <p>카테고리 : 잡담</p>
                <p>참여번호 : 0906</p>
              </S.CardInfo>
              <S.Kakao>
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
