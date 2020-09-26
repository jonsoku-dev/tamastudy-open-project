import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import * as S from './GourmetGoogleMap.styled';

export interface MyMakerProps {
  item: any;
  selectedId: any;
  handleChangeId: any;
}

const MyMarker: React.FC<MyMakerProps> = ({ item, selectedId, handleChangeId }) => {
  const onClickMarker = (id: string) => {
    handleChangeId(id);
  };

  return (
    <S.MakerWrapper onClick={() => onClickMarker(item.id)} selected={item.id === selectedId}>
      <FontAwesomeIcon icon={faMapMarkerAlt} />
      <h1>{item.name}</h1>
    </S.MakerWrapper>
  );
};

export default MyMarker;
