import React from 'react';
import * as S from './MainTop.styled';
import MainTitle from '../../atoms/MainTitle/MainTitle';
import MainButton from '../../molecules/MainButton/MainButton';

export interface MainTopProps {}

const MainTop: React.FC<MainTopProps> = () => {
  return (
    <>
      <S.Logo>
        <img
          alt="logo"
          src="https://lh3.googleusercontent.com/proxy/YwflbcVFP_yhT22mW18DI2qtWkYJhfUtgVEh5OxS_2PX6MwrrqS9YMJExX_maNhdYlEiBnWiyxb_p_zIxIvU6Z8f3E8JcQsHRr8x7xvc5VO02xlno11yFv6GUF78HA"
        />
      </S.Logo>
      <MainTitle>
        <h1>Welcome to</h1>
        <h1>Tamastudy</h1>
      </MainTitle>
      <S.Desc>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut beatae corporis distinctio
          eius in non officiis omnis quidem reprehenderit veniam! Aliquid atque et explicabo
          laudantium optio! Aspernatur distinctio harum provident.
        </p>
      </S.Desc>
      <MainButton name={'About'} />
    </>
  );
};

export default MainTop;
