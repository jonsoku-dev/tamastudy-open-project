import React from 'react';
import Swiper from 'react-id-swiper';
import BoardBox from '../BoardBox/BoardBox';
import { BoardCategory, GetMainDataQuery } from '../../../generated/graphql';
import BoardFrame from '../../frames/BoardFrame/BoardFrame';

export interface MainBoardListProps {
  data: {
    jobBoardList: GetMainDataQuery['jobBoardList'];
    tradeBoardList: GetMainDataQuery['tradeBoardList'];
    freeBoardList: GetMainDataQuery['freeBoardList'];
    fqBoardList: GetMainDataQuery['fqBoardList'];
  };
}

const MainBoardList: React.FC<MainBoardListProps> = ({ data }) => {
  return (
    <BoardFrame>
      <Swiper slidesPerView={1.2} slidesOffsetBefore={2} rebuildOnUpdate>
        <div>
          <BoardBox category={BoardCategory.Trade} data={data.tradeBoardList} />
        </div>
        <div>
          <BoardBox category={BoardCategory.Fq} data={data.fqBoardList} />
        </div>
        <div>
          <BoardBox category={BoardCategory.Free} data={data.freeBoardList} />
        </div>
        <div>
          <BoardBox category={BoardCategory.Job} data={data.jobBoardList} />
        </div>
      </Swiper>
    </BoardFrame>
  );
};

export default MainBoardList;
