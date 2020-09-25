import React from 'react';
import * as S from './GourmetMap.styled';
import { GetGourmetListResponseDto } from '../../../generated/graphql';

export interface GourmetMapProps {
  data: GetGourmetListResponseDto[];
}

const GourmetMap: React.FC<GourmetMapProps> = ({ data }) => {
  return (
    <S.Wrapper>
      {data.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </S.Wrapper>
  );
};

export default GourmetMap;
