import React from 'react';
import * as S from './GourmetList.styled';
import { GetGourmetListResponseDto } from '../../../generated/graphql';
import GourmetCard from '../../molecules/GourmetCard/GourmetCard';
import Swiper from 'react-id-swiper';

export interface GourmetListProps {
  data: GetGourmetListResponseDto[];
  selectedId: string;
  handleChangeId: any;
  rebuild: boolean;
}

const GourmetList: React.FC<GourmetListProps> = ({ data, selectedId, handleChangeId, rebuild }) => {
  const onClickItem = (id: string) => () => {
    handleChangeId(id);
  };

  return (
    <S.Wrapper>
      <S.SwiperWrapper>
        <Swiper rebuildOnUpdate={rebuild} slidesPerView={3.4} spaceBetween={8}>
          {data.map((item) => (
            <div key={item.id} onClick={onClickItem(item.id)}>
              <GourmetCard data={item} selected={selectedId === item.id} />
            </div>
          ))}
        </Swiper>
      </S.SwiperWrapper>
    </S.Wrapper>
  );
};

export default GourmetList;
