import React from 'react';
import * as S from './GourmetList.styled';
import { GetGourmetListQuery } from '../../../generated/graphql';

export interface GourmetListProps {
  data: GetGourmetListQuery['getGourmetList'];
}

const GourmetList: React.FC<GourmetListProps> = ({ data }) => {
  return (
    <S.Wrapper>
      {data.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </S.Wrapper>
  );
};

export default GourmetList;
