import React, { useCallback, useState } from 'react';
import * as S from './Gourmet.styled';
import { GetGourmetListResponseDto, useGetGourmetListQuery } from '../../../generated/graphql';
import GourmetSearch, { ISearchData } from '../../organisms/GourmetSearch/GourmetSearch';
import GourmetMap from '../../organisms/GourmetMap/GourmetMap';
import GourmetList from '../../organisms/GourmetList/GourmetList';
import GourmetDetail from '../../organisms/GourmetDetail/GourmetDetail';

export interface QueryGetGourmetListArgs {
  lat: number;
  lng: number;
}

export interface GourmetProps {}

const Gourmet: React.FC<GourmetProps> = () => {
  const [selectedItemId, setSelectedItemId] = useState<string>('');
  const [rebuild, setRebuild] = useState<boolean>(false);

  const { data, loading, refetch } = useGetGourmetListQuery({
    fetchPolicy: 'cache-first',
    variables: {
      lat: 90, // TODO:: default center lat
      lng: 120, // TODO:: default center lng
    },
    onError({ message }) {
      alert(message);
    },
  });
  const handleSearch = async ({ category, score, search }: ISearchData) => {
    await refetch({
      lat: 90,
      lng: 120,
      category,
      score,
      search,
    });
    setRebuild(true);
  };

  const handleChangeId = useCallback((id: string) => {
    setSelectedItemId(id);
    setRebuild(false);
  }, []);

  if (loading) {
    return null;
  }
  if (!data) {
    return null;
  }

  const id = selectedItemId === '' ? data?.getGourmetList[0]?.id ?? '' : selectedItemId;

  return (
    <S.Wrapper>
      <GourmetSearch handleSearch={handleSearch} />
      <GourmetMap data={data.getGourmetList as GetGourmetListResponseDto[]} />
      <GourmetList
        data={data.getGourmetList as GetGourmetListResponseDto[]}
        selectedId={id}
        handleChangeId={handleChangeId}
        rebuild={rebuild}
      />
      <GourmetDetail selectedId={id} />
    </S.Wrapper>
  );
};

export default Gourmet;
