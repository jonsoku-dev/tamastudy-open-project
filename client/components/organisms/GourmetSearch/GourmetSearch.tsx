import React, { useCallback, useState } from 'react';
import * as S from './GourmetSearch.styled';
import Search from '../../atoms/Search/Search';
import Select from 'react-select';
import { gourmetCategoryOptions, gourmetScoreOptions } from './options';
import { QueryGetGourmetListArgs } from '../../../generated/graphql';

export interface ISearchData {
  category?: QueryGetGourmetListArgs['category'];
  score?: QueryGetGourmetListArgs['score'];
  search?: QueryGetGourmetListArgs['search'];
}

export interface GourmetSearchProps {
  handleSearch: any;
}

const GourmetSearch: React.FC<GourmetSearchProps> = ({ handleSearch }) => {
  const [category, setCategory] = useState<ISearchData['category']>(undefined);
  const [score, setScore] = useState<ISearchData['score']>(0);

  const onChangeSelectCategory = useCallback(
    (data: any) => {
      if (data.value === 'ALL') {
        setCategory(undefined);
      } else {
        setCategory(data.value);
      }
    },
    [category],
  );

  const onChangeSelectScore = useCallback(
    (data: any) => {
      if (data.value === 'ALL') {
        setScore(0);
      } else {
        setScore(data.value);
      }
    },
    [score],
  );

  const onClickSearch = (search: ISearchData['search']) => {
    handleSearch({ category, score, search });
  };

  return (
    <S.Wrapper>
      <Select
        options={gourmetCategoryOptions}
        onChange={onChangeSelectCategory}
        inputId={'GourmetCategory'}
        defaultValue={gourmetCategoryOptions[0]}
      />
      <Select
        options={gourmetScoreOptions}
        onChange={onChangeSelectScore}
        inputId={'GourmetScore'}
        defaultValue={gourmetScoreOptions[0]}
      />
      <Search onClickSearch={onClickSearch} />
    </S.Wrapper>
  );
};

export default GourmetSearch;
