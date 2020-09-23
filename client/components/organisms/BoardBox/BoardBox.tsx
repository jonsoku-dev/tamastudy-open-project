import React from 'react';
import * as S from './BoardBox.styled';
import BoardCard from '../../molecules/BoardCard/BoardCard';
import Link from 'next/link';
import { BoardCategory, GetBoardListByCategoryQuery } from '../../../generated/graphql';

export interface BoardBoxProps {
  category: BoardCategory;
  data:
    | GetBoardListByCategoryQuery['jobBoardList']
    | GetBoardListByCategoryQuery['freeBoardList']
    | GetBoardListByCategoryQuery['fqBoardList']
    | GetBoardListByCategoryQuery['tradeBoardList'];
}

const BoardBox: React.FC<BoardBoxProps> = ({ category, data }) => {
  return (
    <S.Wrapper>
      <S.Header>
        <S.Title>
          <Link href={`/board?category=${category}`}>
            <a>{category}</a>
          </Link>
        </S.Title>
      </S.Header>
      {data.map((board) => <BoardCard key={board.id} data={board} isMain/>)}
    </S.Wrapper>
  );
};
export default BoardBox;
