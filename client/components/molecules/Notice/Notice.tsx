import React from 'react';
import * as S from './Notice.styled';

export interface NoticeProps {
  name: string;
}

const Notice: React.FC<NoticeProps> = ({ name }) => {
  return (
    <S.Wrapper>
      <S.Name>{name}</S.Name>
    </S.Wrapper>
  );
};

export default Notice;
