import React from 'react';
import * as S from './NoticeList.styled';
import MainButton from '../../molecules/MainButton/MainButton';
import MainTitle from '../../atoms/MainTitle/MainTitle';

export interface NoticeListProps {}

const NoticeList: React.FC<NoticeListProps> = () => {
  return (
    <S.Wrapper>
      <MainTitle>Notice</MainTitle>
      <S.Content>
        <div>
          <div>
            <strong>new</strong>
            <span>Notice sample</span>
          </div>
          <p>3일 전</p>
        </div>
        <div>
          <div>
            <strong>new</strong>
            <span>Notice sample</span>
          </div>
          <p>3일 전</p>
        </div>
        <div>
          <div>
            <span>Notice sample</span>
          </div>
          <p>7일 전</p>
        </div>
        <div>
          <div>
            <span>Notice sample</span>
          </div>
          <p>21일 전</p>
        </div>
      </S.Content>
      <S.Button>
        <MainButton name={'More'} />
      </S.Button>
    </S.Wrapper>
  );
};

export default NoticeList;
