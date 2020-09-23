import React, { useCallback } from 'react';
import * as S from './BoardCard.styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faEye } from '@fortawesome/free-solid-svg-icons';
import Avatar from '../../atoms/Avatar/Avatar';
import { GetBoardListByCategoryFieldsFragment } from '../../../generated/graphql';
import { useRouter } from 'next/router';
import { fromNow } from '../../../shared/customDayjs';

export interface BoardCardProps {
  data: GetBoardListByCategoryFieldsFragment;
  isMain?: boolean;
}

const BoardCard: React.FC<BoardCardProps> = ({ data, isMain = false }) => {
  const router = useRouter();
  const onClickDetail = useCallback(async () => {
    await router.push(`/board/[boardId]`, `/board/${data.id}`);
  }, [data]);
  return (
    <S.Wrapper onClick={onClickDetail} isMain={isMain}>
      <S.Comment>
        <FontAwesomeIcon size={'2x'} icon={faComment} />
        <p>{data.comments.length}</p>
      </S.Comment>
      <S.Title>
        <S.Category>{data.category}</S.Category>
        <S.MainTitle>{data.title}</S.MainTitle>
      </S.Title>
      <S.View>
        <FontAwesomeIcon size={'lg'} icon={faEye} />
        <p>{data.view}</p>
      </S.View>
      <S.User>
        <Avatar avatar={data.user.avatar} />
        <S.Info>
          <h3>{data.user.username}</h3>
          <p>{fromNow(data.createdAt)}</p>
        </S.Info>
      </S.User>
    </S.Wrapper>
  );
};

export default BoardCard;
