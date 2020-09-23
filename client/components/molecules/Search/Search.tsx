import React, { useCallback, useState } from 'react';
import Select from 'react-select';
import * as S from './Search.styled';
import { BoardCategory } from '../../../generated/graphql';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

export const options = [
  { value: BoardCategory.All, label: BoardCategory.All },
  { value: BoardCategory.Job, label: BoardCategory.Job },
  { value: BoardCategory.Free, label: BoardCategory.Free },
  { value: BoardCategory.Fq, label: BoardCategory.Fq },
  { value: BoardCategory.Trade, label: BoardCategory.Trade },
];

export interface SearchProps {
  searchBoardList: ({ title, category }: { title: string; category: BoardCategory }) => void;
}

const Search: React.FC<SearchProps> = ({ searchBoardList }) => {
  const router = useRouter();
  const defaultValue = options.find((op) => op.value === (router?.query.category as BoardCategory));
  const [formData, setFormData] = useState({
    title: '',
    category: (router?.query.category as BoardCategory) ?? BoardCategory.All,
  });

  const onChange = useCallback(
    (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    },
    [formData],
  );

  const onChangeSelect = useCallback(
    (data: any) => {
      setFormData({
        ...formData,
        category: data.value,
      });
    },
    [formData],
  );

  const onClick = useCallback(async () => {
    console.log(formData);
    await searchBoardList(formData);
  }, [formData]);

  return (
    <S.Wrapper>
      <Select
        options={options}
        onChange={onChangeSelect}
        inputId={'boardCategory'}
        defaultValue={defaultValue}
      />
      <S.Input type="text" onChange={onChange} value={formData.title} name={'title'} />
      <S.Button onClick={onClick}>
        <FontAwesomeIcon icon={faSearch} />
      </S.Button>
    </S.Wrapper>
  );
};

export default Search;
