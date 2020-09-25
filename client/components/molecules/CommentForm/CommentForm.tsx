import React, { useContext } from 'react';
import * as S from './CommentForm.styled';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useMutation } from '@apollo/client';
import {
  CreateBoardCommentDocument,
  CreateBoardCommentMutation,
  CreateBoardCommentReplyDocument,
  CreateBoardCommentReplyMutation,
  EditBoardCommentDocument,
  EditBoardCommentMutation,
  EditBoardCommentReplyDocument,
  EditBoardCommentReplyMutation,
  GetBoardDocument,
  MutationCreateBoardCommentArgs,
  MutationCreateBoardCommentReplyArgs,
  MutationEditBoardCommentArgs,
  MutationEditBoardCommentReplyArgs,
} from '../../../generated/graphql';
import { useRouter } from 'next/router';
import { CurrentUserContext } from '../../../shared/getCurrentUser';

export interface CommentFormProps {
  commentId?: string;
  isEdit?: boolean;
  isReply?: boolean;
  editId?: string;
  editBody?: string;
  onClickEditSubmit?: any;
  onClickCreateSubmit?: any;
}

const CommentForm: React.FC<CommentFormProps> = ({
  commentId,
  isEdit = false,
  isReply = false,
  editId,
  editBody,
  onClickEditSubmit,
  onClickCreateSubmit,
}) => {
  const { userId } = useContext(CurrentUserContext);
  const router = useRouter();
  const boardId = router.query.boardId as string;

  const [createBoardCommentMutation] = useMutation<
    CreateBoardCommentMutation,
    MutationCreateBoardCommentArgs
  >(CreateBoardCommentDocument, {
    refetchQueries: [{ query: GetBoardDocument, variables: { boardId, isRefetch: true } }],
  });

  const [createBoardCommentReplyMutation] = useMutation<
    CreateBoardCommentReplyMutation,
    MutationCreateBoardCommentReplyArgs
  >(CreateBoardCommentReplyDocument, {
    refetchQueries: [{ query: GetBoardDocument, variables: { boardId, isRefetch: true } }],
  });

  const [editBoardCommentMutation] = useMutation<
    EditBoardCommentMutation,
    MutationEditBoardCommentArgs
  >(EditBoardCommentDocument, {
    refetchQueries: [{ query: GetBoardDocument, variables: { boardId, isRefetch: true } }],
  });

  const [editBoardCommentReplyMutation] = useMutation<
    EditBoardCommentReplyMutation,
    MutationEditBoardCommentReplyArgs
  >(EditBoardCommentReplyDocument, {
    refetchQueries: [{ query: GetBoardDocument, variables: { boardId, isRefetch: true } }],
  });

  const { register, handleSubmit, reset } = useForm({
    mode: 'all',
    defaultValues: {
      body: isEdit ? editBody : '',
    },
  });
  const onSubmit = handleSubmit(async (data: { body: string }) => {
    try {
      if (isEdit && editId) {
        if (isReply) {
          await editBoardCommentReplyMutation({
            variables: {
              boardCommentReplyId: editId,
              input: data,
            },
          });
        } else {
          await editBoardCommentMutation({
            variables: {
              boardCommentId: editId,
              input: data,
            },
          });
        }
        onClickEditSubmit();
      } else {
        if (commentId) {
          await createBoardCommentReplyMutation({
            variables: {
              boardCommentId: commentId,
              body: data.body,
            },
          });
          onClickCreateSubmit();
        } else {
          await createBoardCommentMutation({
            variables: {
              boardId: boardId,
              input: data,
            },
          });
        }
      }
      reset({
        body: '',
      });
    } catch (e) {
      alert(e.message);
    }
  });

  if (!userId) {
    return null;
  }
  return (
    <S.Wrapper isEdit={isEdit}>
      <S.Form onSubmit={onSubmit}>
        <S.Input name={'body'} ref={register} placeholder={'Write your comment here...'} />
        <S.Submit type={'submit'}>
          <FontAwesomeIcon size={'lg'} icon={faPaperPlane} />
        </S.Submit>
      </S.Form>
    </S.Wrapper>
  );
};

export default CommentForm;
