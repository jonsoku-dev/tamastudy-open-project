import React from 'react';
import * as S from './BoardFrame.styled';

export interface BoardFrameProps {}

const BoardFrame: React.FC<BoardFrameProps> = ({ children }) => {
  return <S.Wrapper>{children}</S.Wrapper>;
};

export default BoardFrame;
