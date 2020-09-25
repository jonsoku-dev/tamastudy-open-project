import React, { useContext } from 'react';
import * as S from './GourmetCommentBox.styled';
import Nodata from '../../atoms/Nodata/Nodata';
import { CurrentUserContext } from '../../../shared/getCurrentUser';
import GourmetCommentCard from '../../molecules/GourmetCommentCard/GourmetCommentCard';

export interface CommentBoxProps {
  data: any;
  deleteComment: any;
}

const GourmetCommentBox: React.FC<CommentBoxProps> = ({ data, deleteComment }) => {
  const { userId } = useContext(CurrentUserContext);
  return (
    <S.Wrapper>
      <S.Header>{data.length} Comments</S.Header>
      {data.length === 0 ? (
        <S.Content>
          <Nodata />
        </S.Content>
      ) : (
        <S.Content>
          {data.map((comment: any) => (
            <div key={comment.id}>
              <GourmetCommentCard
                data={comment}
                userId={userId}
                onClickDelete={deleteComment}
              />
            </div>
          ))}
        </S.Content>
      )}
    </S.Wrapper>
  );
};
export default GourmetCommentBox;
