import React, { useCallback, useContext } from 'react';
import * as S from './CommentBox.styled';
import CommentCard from '../../molecules/CommentCard/CommentCard';
import Nodata from '../../atoms/Nodata/Nodata';
import {
  Board,
  DeleteBoardCommentDocument,
  DeleteBoardCommentMutation,
  DeleteBoardCommentReplyDocument,
  DeleteBoardCommentReplyMutation,
  GetBoardDocument,
  MutationDeleteBoardCommentArgs,
  MutationDeleteBoardCommentReplyArgs,
} from '../../../generated/graphql';
import { useRouter } from 'next/router';
import { CurrentUserContext } from '../../../shared/getCurrentUser';
import { useMutation } from '@apollo/client';

export interface CommentBoxProps {
  data: Board['comments'];
}

const CommentBox: React.FC<CommentBoxProps> = ({ data }) => {
  const router = useRouter();
  const boardId = router.query.boardId as string;
  const { userId } = useContext(CurrentUserContext);

  const [deleteBoardCommentMutation] = useMutation<
    DeleteBoardCommentMutation,
    MutationDeleteBoardCommentArgs
  >(DeleteBoardCommentDocument, {
    refetchQueries: [{ query: GetBoardDocument, variables: { boardId, isRefetch: true } }],
  });

  const [deleteBoardCommentReplyMutation] = useMutation<
    DeleteBoardCommentReplyMutation,
    MutationDeleteBoardCommentReplyArgs
  >(DeleteBoardCommentReplyDocument, {
    refetchQueries: [{ query: GetBoardDocument, variables: { boardId, isRefetch: true } }],
  });

  const onClickDeleteComment = useCallback(
    (boardCommentId: string) => async () => {
      try {
        await deleteBoardCommentMutation({
          variables: {
            boardCommentId,
          },
        });
      } catch (e) {
        alert(e.message);
      }
    },
    [data],
  );

  const onClickDeleteReply = useCallback(
    (boardCommentReplyId: string) => async () => {
      try {
        await deleteBoardCommentReplyMutation({
          variables: {
            boardCommentReplyId,
          },
        });
      } catch (e) {
        alert(e.message);
      }
    },
    [data],
  );

  return (
    <S.Wrapper>
      <S.Header>{data.length} Comments</S.Header>
      {data.length === 0 ? (
        <Nodata />
      ) : (
        <S.Content>
          {data.map((comment) => (
            <div key={comment.id}>
              <CommentCard data={comment} userId={userId} onClickDelete={onClickDeleteComment} />
              {comment.boardCommentReplies.map((reply) => (
                <CommentCard
                  key={reply.id}
                  isReply
                  data={reply}
                  userId={userId}
                  onClickDelete={onClickDeleteReply}
                />
              ))}
            </div>
          ))}
        </S.Content>
      )}
    </S.Wrapper>
  );
};
export default CommentBox;
