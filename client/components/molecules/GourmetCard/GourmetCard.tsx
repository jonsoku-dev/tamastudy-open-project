import React from 'react';
import * as S from './GourmetCard.styled';
import { GetGourmetListResponseDto } from '../../../generated/graphql';

export interface GourmetCardProps {
  selected?: boolean;
  data: GetGourmetListResponseDto;
}

const GourmetCard: React.FC<GourmetCardProps> = ({ selected = false, data }) => {
  const scoreArray: number[] = [];
  for (let i = 0; i < data.score; i++) {
    scoreArray.push(i);
  }
  return (
    <S.Wrapper selected={selected}>
      <S.Info>
        <S.Category>{data.category}</S.Category>
        <S.Name>{data.name}</S.Name>
      </S.Info>
      <S.Score>
        {scoreArray.map((_, index) => (
          <span key={index}>⭐️</span>
        ))}
      </S.Score>
    </S.Wrapper>
  );
};

export default GourmetCard;
