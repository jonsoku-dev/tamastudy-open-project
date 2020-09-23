import React from 'react';
import * as S from './MoreFetch.styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';

export interface MoreFetchProps {
  loading: boolean;
  onClick: any;
}

const MoreFetch: React.FC<MoreFetchProps> = ({ loading, onClick }) => {
  return (
    <S.Wrapper onClick={onClick}>
      {loading ? <FontAwesomeIcon icon={faSpinner} /> : <FontAwesomeIcon icon={faPlus} />}
    </S.Wrapper>
  );
};

export default MoreFetch;
