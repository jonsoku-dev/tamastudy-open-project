import React, { useCallback } from 'react';
import * as S from './GourmetDetail.styled';
import {
  GetGourmetDocument,
  useCreateGourmetCommentMutation,
  useDeleteGourmetCommentMutation,
  useGetGourmetQuery,
} from '../../../generated/graphql';
import UserLabel from '../../molecules/UserLabel/UserLabel';
import GourmetCommentBox from '../GourmetCommentBox/GourmetCommentBox';
import GourmetCommentForm from '../../molecules/GourmetCommentForm/GourmetCommentForm';

export interface GourmetDetailProps {
  selectedId: string;
}

const GourmetDetail: React.FC<GourmetDetailProps> = ({ selectedId }) => {
  const { data } = useGetGourmetQuery({
    variables: {
      gourmetId: selectedId,
    },
  });
  const [deleteMutation] = useDeleteGourmetCommentMutation();
  const [createMutation] = useCreateGourmetCommentMutation({
    onError({ message }) {
      console.error(message);
    },
  });

  const deleteGourmetComment = useCallback(
    async (id: string) => {
      await deleteMutation({
        variables: {
          gourmetCommentId: id,
        },
        refetchQueries: [
          {
            query: GetGourmetDocument,
            variables: {
              gourmetId: selectedId,
            },
          },
        ],
      });
    },
    [selectedId],
  );

  const createGourmetComment = useCallback(
    async (data: { body: string; score: number }) => {
      await createMutation({
        variables: {
          gourmetId: selectedId,
          input: data,
        },
        refetchQueries: [
          {
            query: GetGourmetDocument,
            variables: {
              gourmetId: selectedId,
            },
          },
        ],
      });
    },
    [selectedId],
  );
  if (!data) {
    return null;
  }
  const scoreArray: number[] = [];
  for (let i = 0; i < data?.getGourmet.score; i++) {
    scoreArray.push(i);
  }
  return (
    <S.Wrapper>
      <S.Image>{data?.getGourmet.images}</S.Image>
      <S.Category>{data?.getGourmet.category}</S.Category>
      <S.Name>{data?.getGourmet.name}</S.Name>
      <S.Score>
        {scoreArray.map((_, index) => (
          <span key={index}>⭐️</span>
        ))}
      </S.Score>
      <S.Address>{data?.getGourmet.address}</S.Address>
      <S.Desc>{data?.getGourmet.desc}</S.Desc>
      <S.User>
        <UserLabel
          avatar={data?.getGourmet.user.avatar}
          username={data?.getGourmet.user.username}
          email={data?.getGourmet.user.email}
        />
      </S.User>
      <S.CommentForm>
        <GourmetCommentForm onClickCreateSubmit={createGourmetComment} />
      </S.CommentForm>
      <S.Comment>
        <GourmetCommentBox data={data?.getGourmet.comments} deleteComment={deleteGourmetComment} />
      </S.Comment>
    </S.Wrapper>
  );
};

export default GourmetDetail;
