import React from 'react';
import * as S from './GourmetMap.styled';
import { GetGourmetListResponseDto } from '../../../generated/graphql';
import GourmetGoogleMap from '../../molecules/GourmetGoogleMap/GourmetGoogleMap';

export interface GourmetMapProps {
  center: any;
  data: GetGourmetListResponseDto[];
}

const GourmetMap: React.FC<GourmetMapProps> = ({ center, data }) => {
  return (
    <S.Wrapper>
      <S.Map>{<GourmetGoogleMap center={center} data={data} />}</S.Map>
    </S.Wrapper>
  );
};

export default GourmetMap;
