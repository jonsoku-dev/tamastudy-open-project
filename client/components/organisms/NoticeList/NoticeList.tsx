import React from 'react';
import * as S from './NoticeList.styled';
import MainButton from '../../molecules/MainButton/MainButton';
import MainTitle from '../../atoms/MainTitle/MainTitle';
import { GetMainDataQuery } from '../../../generated/graphql';
import { fromNow } from '../../../shared/customDayjs';

export interface NoticeListProps {
  data: GetMainDataQuery['getNoticeList'];
}

const NoticeList: React.FC<NoticeListProps> = ({ data }) => {
  if (!data) {
    return null;
  }
  return (
    <S.Wrapper>
      <MainTitle>Notice</MainTitle>
      <S.Content>
        {data.map((notice) => (
          <div key={notice.id}>
            <div>
              <strong>new</strong>
              <span>{notice.title}</span>
            </div>
            <p>{fromNow(notice.createdAt)}</p>
          </div>
        ))}
      </S.Content>
      <S.Button>
        <MainButton name={'More'} />
      </S.Button>
    </S.Wrapper>
  );
};

export default NoticeList;
