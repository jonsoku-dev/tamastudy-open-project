import React, { useCallback, useState } from 'react';
import * as S from './BoardCreateAndUpdate.styled';
import Select from 'react-select';
import {
  BoardCategory,
  CreateBoardDocument,
  CreateBoardMutation,
  EditBoardDocument,
  EditBoardMutation,
  GetBoardListDocument,
  GetBoardQuery,
  MutationCreateBoardArgs,
  MutationEditBoardArgs,
} from '../../../generated/graphql';
import CreateItemFrame from '../../frames/CreateItemFrame/CreateItemFrame';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

const options = [
  { value: BoardCategory.Job, label: BoardCategory.Job },
  { value: BoardCategory.Free, label: BoardCategory.Free },
  { value: BoardCategory.Fq, label: BoardCategory.Fq },
  { value: BoardCategory.Trade, label: BoardCategory.Trade },
];

export interface BoardCreateAndUpdateProps {
  isEdit?: boolean;
  editData?: GetBoardQuery['getBoard'];
}

const BoardCreateAndUpdate: React.FC<BoardCreateAndUpdateProps> = ({
  isEdit = false,
  editData,
}) => {
  const router = useRouter();

  const [file, setFile] = useState('');
  const [formData, setFormData] = useState({
    category: BoardCategory.Job,
    title: '',
    desc: '',
  });

  const [createBoardMutation] = useMutation<CreateBoardMutation, MutationCreateBoardArgs>(
    CreateBoardDocument,
    {
      refetchQueries: [{ query: GetBoardListDocument }],
    },
  );

  const [editBoardMutation] = useMutation<EditBoardMutation, MutationEditBoardArgs>(
    EditBoardDocument,
    {
      refetchQueries: [{ query: GetBoardListDocument }],
    },
  );
  const { register, handleSubmit, reset } = useForm({
    mode: 'all',
    defaultValues: {
      category: isEdit ? editData?.category : BoardCategory.Job,
      title: isEdit ? editData?.title : '',
      desc: isEdit ? editData?.desc : '',
    },
  });

  const onChange = ({
    target: {
      validity,
      files: [file],
    },
  }: any) => {
    return validity.valid && setFile(file);
  };

  const onSubmit = handleSubmit(async (data: { title: string; desc: string }) => {
    const input = {
      category: formData.category,
      ...data,
    };
    try {
      if (isEdit && editData) {
        await editBoardMutation({
          variables: {
            boardId: router.query.boardId as string,
            input,
          },
        });
      } else {
        await createBoardMutation({
          variables: {
            input,
            file,
          },
        });
      }
      reset({
        category: BoardCategory.Job,
        title: '',
        desc: '',
      });
      await router.push('/board', '/board');
    } catch (e) {
      alert(e.message);
    }
    console.log(input);
  });

  const onChangeSelect = useCallback(
    (data: any) => {
      setFormData({
        ...formData,
        category: data.value,
      });
    },
    [formData],
  );

  return (
    <S.Wrapper>
      <form onSubmit={onSubmit}>
        <CreateItemFrame name={'Category'} isRequired>
          <Select
            options={options}
            onChange={onChangeSelect}
            inputId={'boardCategory'}
            defaultValue={
              isEdit ? options.find((op) => op.value === editData?.category) : options[0]
            }
          />
        </CreateItemFrame>
        <CreateItemFrame name={'Title'} isRequired>
          <S.Input name={'title'} ref={register} placeholder={'Write your title here...'} />
        </CreateItemFrame>
        <CreateItemFrame name={'Desc'} isRequired>
          <S.Textarea name={'desc'} ref={register} placeholder={'Write your desc here...'} />
        </CreateItemFrame>
        <CreateItemFrame name={'Images'}>
          {!file && <input type="file" onChange={onChange} />}
          {file && (
            <img
              src={URL.createObjectURL(file)}
              alt={file}
              style={{ width: '300px', height: '300px' }}
            />
          )}
        </CreateItemFrame>
        <S.Submit>
          <button type={'submit'}>Submit</button>
        </S.Submit>
      </form>
    </S.Wrapper>
  );
};

export default BoardCreateAndUpdate;
