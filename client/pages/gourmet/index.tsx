import React from 'react';
import BasicLayout from '../../components/BasicLayout';
import { useGetGourmetListQuery } from '../../generated/graphql';

export interface GourmetProps {}

const Gourmet: React.FC<GourmetProps> = () => {
  const { data } = useGetGourmetListQuery({
    variables: {
      lat: 90,
      lng: 120,
    },
  });
  console.log(data);
  return <BasicLayout title={'Gourmet'}>あ</BasicLayout>;
};

export default Gourmet;
