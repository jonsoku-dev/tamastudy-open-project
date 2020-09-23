import React from 'react';
import Swiper from 'react-id-swiper';
import BoardBox from '../BoardBox/BoardBox';
import {
  BoardCategory,
  GetBoardListByCategoryDocument,
  GetBoardListByCategoryQuery,
} from '../../../generated/graphql';
import BoardFrame from '../../frames/BoardFrame/BoardFrame';
import { useQuery } from '@apollo/client';

export interface MainBoardListProps {}

const MainBoardList: React.FC<MainBoardListProps> = () => {
  const { data: boardData } = useQuery<GetBoardListByCategoryQuery>(
    GetBoardListByCategoryDocument,
    {
      fetchPolicy: 'cache-first',
    },
  );
  if (!boardData) {
    return null;
  }
  console.log(boardData);
  return (
    <BoardFrame>
      <Swiper slidesPerView={1.2} slidesOffsetBefore={2} rebuildOnUpdate>
        <div>
          <BoardBox category={BoardCategory.Trade} data={boardData?.tradeBoardList} />
        </div>
        <div>
          <BoardBox category={BoardCategory.Fq} data={boardData?.fqBoardList} />
        </div>
        <div>
          <BoardBox category={BoardCategory.Free} data={boardData?.freeBoardList} />
        </div>
        <div>
          <BoardBox category={BoardCategory.Job} data={boardData?.jobBoardList} />
        </div>
      </Swiper>
    </BoardFrame>
  );
};

export default MainBoardList;
