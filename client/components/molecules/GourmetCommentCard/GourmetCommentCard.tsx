import React, { useCallback, useState } from 'react';
import * as S from './GourmetCommentCard.styled';
import Avatar from '../../atoms/Avatar/Avatar';
import CommentForm from '../CommentForm/CommentForm';
import { fromNow } from '../../../shared/customDayjs';

export interface CommentCardProps {
  data: any;
  onClickDelete: any;
  userId: string | undefined | null;
}

const GourmetCommentCard: React.FC<CommentCardProps> = ({ data, onClickDelete, userId }) => {
  const [editMode, setEditMode] = useState(false);

  const onClickEditButton = useCallback(() => {
    setEditMode(true);
  }, [editMode]);

  const onClickEditSubmit = useCallback(() => {
    setEditMode(false);
  }, [editMode]);

  const _onClickDelete = useCallback((id: string) => {
    onClickDelete(id);
  }, []);

  const scoreArray: number[] = [];
  for (let i = 0; i < data.score; i++) {
    scoreArray.push(i);
  }

  return (
    <>
      <S.Wrapper>
        <Avatar avatar={data.user.avatar} />
        <S.Content>
          <S.Name>
            <p>{data.user.username}</p>
            <span>{fromNow(data.createdAt)}</span>
            <p>
              {scoreArray.map((_, index) => (
                <span key={index}>⭐️</span>
              ))}
            </p>
          </S.Name>
          {editMode ? (
            <CommentForm
              isEdit
              editId={data.id}
              editBody={data.body}
              onClickEditSubmit={onClickEditSubmit}
            />
          ) : (
            <S.Body>{data.body}</S.Body>
          )}
        </S.Content>
        <S.Buttons>
          {data.user.id === userId && !editMode && (
            <>
              <button onClick={onClickEditButton}>Edit</button>
              <button onClick={() => _onClickDelete(data.id)}>Delete</button>
            </>
          )}
        </S.Buttons>
      </S.Wrapper>
    </>
  );
};

export default GourmetCommentCard;
