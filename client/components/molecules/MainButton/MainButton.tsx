import React from 'react';
import * as S from './MainButton.styled';

export interface MainButtonProps {
  name: string;
}

const MainButton: React.FC<MainButtonProps> = ({ name }) => {
  return (
    <S.Wrapper>
      <button>{name}</button>
    </S.Wrapper>
  );
};

export default MainButton;
