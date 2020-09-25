import React, { useCallback, useState } from 'react';
import * as S from './Search.styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export interface SearchProps {
  onClickSearch: any;
}

const Search: React.FC<SearchProps> = ({ onClickSearch, ...props }) => {
  const [search, setSearch] = useState('');

  const onChange = useCallback(
    (e) => {
      setSearch(e.target.value);
    },
    [search],
  );

  const onClick = () => {
    onClickSearch(search);
  };

  return (
    <S.Wrapper {...props}>
      <S.Input type="text" onChange={onChange} value={search} />
      <S.Button onClick={onClick}>
        <FontAwesomeIcon icon={faSearch} />
      </S.Button>
    </S.Wrapper>
  );
};
export default Search;
