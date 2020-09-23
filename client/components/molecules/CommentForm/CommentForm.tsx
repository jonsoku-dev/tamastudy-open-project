import React, { useContext } from 'react';
import * as S from './CommentForm.styled';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useMutation } from '@apollo/client';
import {
  CreateBoardCommentDocument,
  CreateBoardCommentMutation,
  EditBoardCommentDocument,
  EditBoardCommentMutation,
  GetBoardDocument,
  MutationCreateBoardCommentArgs,
  MutationEditBoardCommentArgs,
} from '../../../generated/graphql';
import { useRouter } from 'next/router';
import { CurrentUserContext } from '../../../shared/getCurrentUser';

export interface CommentFormProps {
  isEdit?: boolean;
  editId?: string;
  editBody?: string;
  onClickEditSubmit?: any;
}

const CommentForm: React.FC<CommentFormProps> = ({
  isEdit = false,
  editId,
  editBody,
  onClickEditSubmit,
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

  const [editBoardCommentMutation] = useMutation<
    EditBoardCommentMutation,
    MutationEditBoardCommentArgs
  >(EditBoardCommentDocument, {
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
        await editBoardCommentMutation({
          variables: {
            boardCommentId: editId,
            input: data,
          },
        });
        onClickEditSubmit();
      } else {
        await createBoardCommentMutation({
          variables: {
            boardId: boardId,
            input: data,
          },
        });
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
