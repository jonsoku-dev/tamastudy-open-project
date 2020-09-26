import React from 'react';
import GoogleMapReact from 'google-map-react';
import { GetGourmetListResponseDto } from '../../../generated/graphql';
import * as S from './GourmetGoogleMap.styled';
import MyMarker from './MyMarker';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface GourmetGoogleMapProps {
  center: {
    lat: number;
    lng: number;
  };
  data: GetGourmetListResponseDto[];
  setCenter: any;
  selectedId: any;
  handleChangeId: any;
}

const GourmetGoogleMap: React.FC<GourmetGoogleMapProps> = ({
  setCenter,
  center,
  selectedId,
  data,
  handleChangeId,
}) => {
  const onDragEnd = async (e: any) => {
    await setCenter({
      lat: e.center.lat(),
      lng: e.center.lng(),
    });
  };

  return (
    <S.Wrapper>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyCafX8PxjVI-XCHsJ9bFeFbJPnwaZ4cc0M' }}
        center={center}
        zoom={14}
        onDragEnd={onDragEnd}
      >
        {data.map((item) => {
          return (
            <MyMarker
              key={item.id}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              lat={item.lat}
              lng={item.lng}
              item={item}
              selectedId={selectedId}
              handleChangeId={handleChangeId}
            />
          );
        })}
      </GoogleMapReact>
      <S.Center>
        <FontAwesomeIcon icon={faTimes} />
      </S.Center>
    </S.Wrapper>
  );
};

export default GourmetGoogleMap;
