import React from 'react';
import * as S from './GourmetMap.styled';
import { GetGourmetListQuery } from '../../../generated/graphql';

export interface GourmetMapProps {
  data: GetGourmetListQuery['getGourmetList'];
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
