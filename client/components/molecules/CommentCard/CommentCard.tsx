import React, { useCallback, useContext, useState } from 'react';
import * as S from './CommentCard.styled';
import Avatar from '../../atoms/Avatar/Avatar';
import {
  Auth,
  BoardComment,
  DeleteBoardCommentDocument,
  DeleteBoardCommentMutation,
  GetBoardDocument,
  MutationDeleteBoardCommentArgs,
} from '../../../generated/graphql';
import { CurrentUserContext } from '../../../shared/getCurrentUser';
import CommentForm from '../CommentForm/CommentForm';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

export interface CommentCardProps {
  data: { __typename?: 'BoardComment' | undefined } & Pick<
    BoardComment,
    'id' | 'body' | 'createdAt'
  > & { user: { __typename?: 'Auth' } & Pick<Auth, 'id' | 'username' | 'avatar'> };
}

const CommentCard: React.FC<CommentCardProps> = ({ data }) => {
  const router = useRouter();
  const boardId = router.query.boardId as string;
  const { userId } = useContext(CurrentUserContext);
  const [editMode, setEditMode] = useState(false);

  const [deleteBoardCommentMutation] = useMutation<
    DeleteBoardCommentMutation,
    MutationDeleteBoardCommentArgs
  >(DeleteBoardCommentDocument, {
    refetchQueries: [{ query: GetBoardDocument, variables: { boardId, isRefetch: true } }],
  });

  const onClickDelete = useCallback(async () => {
    try {
      await deleteBoardCommentMutation({
        variables: {
          boardCommentId: data.id,
        },
      });
    } catch (e) {
      alert(e.message);
    }
  }, [data]);

  const onClickEditButton = useCallback(() => {
    setEditMode(true);
  }, [editMode]);

  const onClickEditSubmit = useCallback(() => {
    setEditMode(false);
  }, [editMode]);

  return (
    <S.Wrapper>
      <Avatar avatar={data.user.avatar}/>
      <S.Content>
        <S.Name>
          <p>{data.user.username}</p>
          <span>{data.createdAt}</span>
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
      {data.user.id === userId && !editMode && (
        <S.Buttons>
          <button onClick={onClickEditButton}>Edit</button>
          <button onClick={onClickDelete}>Delete</button>
        </S.Buttons>
      )}
    </S.Wrapper>
  );
};

export default CommentCard;
