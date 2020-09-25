import React, { useContext } from 'react';
import * as S from './BoardDetail.styled';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  DeleteBoardDocument,
  DeleteBoardMutation,
  GetBoardDocument,
  GetBoardListDocument,
  GetBoardQuery,
  LikeDocument,
  LikeMutation,
  MutationDeleteBoardArgs,
  MutationLikeArgs,
  MutationUnLikeArgs,
  UnLikeDocument,
  UnLikeMutation,
} from '../../../generated/graphql';
import Avatar from '../../atoms/Avatar/Avatar';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import CommentBox from '../CommentBox/CommentBox';
import CommentForm from '../../molecules/CommentForm/CommentForm';
import { CurrentUserContext } from '../../../shared/getCurrentUser';
import { fromNow } from '../../../shared/customDayjs';
import UserLabel from '../../molecules/UserLabel/UserLabel';

export interface BoardDetailProps {
  data: GetBoardQuery['getBoard'];
}

const BoardDetail: React.FC<BoardDetailProps> = ({ data }) => {
  const { userId } = useContext(CurrentUserContext);
  const router = useRouter();
  const boardId = router.query.boardId as string;

  const [likeMutation] = useMutation<LikeMutation, MutationLikeArgs>(LikeDocument, {
    variables: { boardId },
    refetchQueries: [{ query: GetBoardDocument, variables: { boardId, isRefetch: true } }],
  });

  const [unLikeMutation] = useMutation<UnLikeMutation, MutationUnLikeArgs>(UnLikeDocument, {
    variables: { boardId },
    refetchQueries: [{ query: GetBoardDocument, variables: { boardId, isRefetch: true } }],
  });

  const [deleteBoardMutation] = useMutation<DeleteBoardMutation, MutationDeleteBoardArgs>(
    DeleteBoardDocument,
    {
      variables: { boardId },
      refetchQueries: [{ query: GetBoardListDocument }],
    },
  );

  const liked = data.likes.find((like) => like.userId === userId);
  const onClickLike = async () => {
    try {
      if (!userId) {
        return alert('로그인해주세요.');
      }
      await likeMutation();
    } catch (e) {
      alert(e.message);
    }
  };
  const onClickUnLike = async () => {
    try {
      if (!userId) {
        return alert('로그인해주세요.');
      }
      await unLikeMutation();
    } catch (e) {
      alert(e.message);
    }
  };
  const onClickEdit = async () => {
    try {
      if (!userId) {
        return alert('로그인해주세요.');
      }
      await router.push('/board/[boardId]/edit', `/board/${boardId}/edit`);
    } catch (e) {
      alert(e.message);
    }
  };
  const onClickDelete = async () => {
    try {
      if (confirm('삭제하시겠습니까?')) {
        if (!userId) {
          return alert('로그인해주세요.');
        }
        await deleteBoardMutation();
        await router.push('/board');
      }
    } catch (e) {
      alert(e.message);
    }
  };
  return (
    <S.Wrapper>
      <S.Header>
        <S.Title>{data.title}</S.Title>
        <S.Date>
          <div>
            <span>Category</span>
            <strong>{data.category}</strong>
          </div>
          <div>
            <span>View</span>
            <strong>{data.view}</strong>
          </div>
          <div>
            <span>Created</span>
            <strong>{fromNow(data.createdAt)}</strong>
          </div>
          <div>
            <span>Updated</span>
            <strong>{fromNow(data.updatedAt)}</strong>
          </div>
        </S.Date>
      </S.Header>
      <S.Content>
        <S.Side>
          {liked ? (
            <FontAwesomeIcon icon={faHeart} onClick={onClickUnLike} />
          ) : (
            <FontAwesomeIcon icon={farHeart} onClick={onClickLike} />
          )}
          <span>{data.likes.length}</span>
        </S.Side>
        <S.Desc>desc</S.Desc>
      </S.Content>
      <S.User>
        <UserLabel
          avatar={data.user.avatar}
          username={data.user.username}
          email={data.user.email}
        />
      </S.User>
      {userId === data.user.id && (
        <S.Buttons>
          <button onClick={onClickEdit}>Edit</button>
          <button onClick={onClickDelete}>Delete</button>
        </S.Buttons>
      )}
      <CommentForm />
      <S.Comment>
        <CommentBox data={data.comments} />
      </S.Comment>
    </S.Wrapper>
  );
};

export default BoardDetail;
