import React from 'react';
import * as S from './CommentBox.styled';
import CommentCard from '../../molecules/CommentCard/CommentCard';
import { Auth, BoardComment } from '../../../generated/graphql';
import Nodata from '../../atoms/Nodata/Nodata';

export interface CommentBoxProps {
  data: Array<
    { __typename?: 'BoardComment' } & Pick<BoardComment, 'id' | 'body' | 'createdAt'> & {
        user: { __typename?: 'Auth' } & Pick<Auth, 'id' | 'username' | 'avatar'>;
      }
  >;
}

const CommentBox: React.FC<CommentBoxProps> = ({ data }) => {
  return (
    <S.Wrapper>
      <S.Header>{data.length} Comments</S.Header>
      {data.length === 0 ? (
        <Nodata />
      ) : (
        <S.Content>
          {data.map((comment) => (
            <CommentCard key={comment.id} data={comment} />
          ))}
        </S.Content>
      )}
    </S.Wrapper>
  );
};
export default CommentBox;
