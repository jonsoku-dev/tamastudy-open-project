import React from 'react';
import * as S from './Nodata.styled';

export interface NodataProps {}

const Nodata: React.FC<NodataProps> = () => {
  return (
    <S.Wrapper>
      <img src="https://item.kakaocdn.net/do/a6321ea8fc4321dca60b2101594631a9617ea012db208c18f6e83b1a90a7baa7" alt="no data" />
      <span>No Comments...</span>
    </S.Wrapper>
  );
};

export default Nodata;
