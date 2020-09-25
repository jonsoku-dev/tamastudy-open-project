import React, { useCallback, useState } from 'react';
import * as S from './CommentCard.styled';
import Avatar from '../../atoms/Avatar/Avatar';
import CommentForm from '../CommentForm/CommentForm';
import { faReply } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fromNow } from '../../../shared/customDayjs';

export interface CommentCardProps {
  data: any;
  isReply?: boolean;
  onClickDelete: any;
  userId: string | undefined | null;
}

const CommentCard: React.FC<CommentCardProps> = ({
  data,
  isReply = false,
  onClickDelete,
  userId,
}) => {
  const [createMode, setCreateMode] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const onClickEditButton = useCallback(() => {
    setEditMode(true);
  }, [editMode]);

  const onClickEditSubmit = useCallback(() => {
    setEditMode(false);
  }, [editMode]);

  const onClickCreateButton = useCallback(() => {
    setCreateMode(true);
  }, [createMode]);

  const onClickCreateSubmit = useCallback(() => {
    setCreateMode(false);
  }, [createMode]);

  return (
    <>
      {' '}
      <S.Wrapper>
        {isReply && (
          <S.Reply>
            <FontAwesomeIcon size={'lg'} icon={faReply} />
          </S.Reply>
        )}
        <Avatar avatar={data.user.avatar} />
        <S.Content>
          <S.Name>
            <p>{data.user.username}</p>
            <span>{fromNow(data.createdAt)}</span>
          </S.Name>
          {editMode ? (
            <CommentForm
              isEdit
              isReply={isReply}
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
              <button onClick={onClickDelete(data.id)}>Delete</button>
            </>
          )}
          {!isReply && userId && <button onClick={onClickCreateButton}>reply</button>}
        </S.Buttons>
      </S.Wrapper>
      {!isReply && createMode && (
        <CommentForm commentId={data.id} onClickCreateSubmit={onClickCreateSubmit} />
      )}
    </>
  );
};

export default CommentCard;
