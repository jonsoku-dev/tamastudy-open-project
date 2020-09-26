import React from 'react';
import * as S from './GourmetMap.styled';
import { GetGourmetListResponseDto } from '../../../generated/graphql';
import GourmetGoogleMap from '../../molecules/GourmetGoogleMap/GourmetGoogleMap';

export interface GourmetMapProps {
  center: any;
  data: GetGourmetListResponseDto[];
  setCenter: any;
  selectedId: any;
  handleChangeId: any;
}

const GourmetMap: React.FC<GourmetMapProps> = ({
  center,
  data,
  setCenter,
  selectedId,
  handleChangeId,
}) => {
  return (
    <S.Wrapper>
      <S.Map>
        {
          <GourmetGoogleMap
            setCenter={setCenter}
            center={center}
            data={data}
            selectedId={selectedId}
            handleChangeId={handleChangeId}
          />
        }
      </S.Map>
    </S.Wrapper>
  );
};

export default GourmetMap;
