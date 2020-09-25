import React, { useCallback, useContext, useState } from 'react';
import * as S from './GourmetCommentForm.styled';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { CurrentUserContext } from '../../../shared/getCurrentUser';
import Select from 'react-select';
import { gourmetScoreOptions } from '../../organisms/GourmetSearch/options';
import { ISearchData } from '../../organisms/GourmetSearch/GourmetSearch';

export interface CommentFormProps {
  commentId?: string;
  isEdit?: boolean;
  editId?: string;
  editBody?: string;
  onClickEditSubmit?: any;
  onClickCreateSubmit?: any;
}

const GourmetCommentForm: React.FC<CommentFormProps> = ({
  isEdit = false,
  editId,
  editBody,
  onClickEditSubmit,
  onClickCreateSubmit,
}) => {
  const { userId } = useContext(CurrentUserContext);
  const [score, setScore] = useState<ISearchData['score']>(0);

  const { register, handleSubmit, reset } = useForm({
    mode: 'all',
    defaultValues: {
      body: isEdit ? editBody : '',
    },
  });
  const onSubmit = handleSubmit(async (data: { body: string }) => {
    try {
      if (isEdit && editId) {
        onClickEditSubmit({
          ...data,
          score,
        });
      } else {
        onClickCreateSubmit({
          ...data,
          score,
        });
      }
      reset({
        body: '',
      });
    } catch (e) {
      alert(e.message);
    }
  });

  const onChangeSelectScore = useCallback(
    (data: any) => {
      setScore(data.value);
    },
    [score],
  );

  if (!userId) {
    return null;
  }
  return (
    <S.Wrapper isEdit={isEdit}>
      <S.Select>
        <Select
          options={gourmetScoreOptions}
          onChange={onChangeSelectScore}
          inputId={'GourmetScore'}
          placeholder={'리뷰점수를 입력해주세요.'}
        />
      </S.Select>
      <S.Form onSubmit={onSubmit}>
        <S.Input name={'body'} ref={register} placeholder={'Write your comment here...'} />
        <S.Submit type={'submit'}>
          <FontAwesomeIcon size={'lg'} icon={faPaperPlane} />
        </S.Submit>
      </S.Form>
    </S.Wrapper>
  );
};

export default GourmetCommentForm;
