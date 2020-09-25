import React from 'react';
import BasicLayout from '../../components/BasicLayout';

export interface PostProps {}

const Post: React.FC<PostProps> = () => {
  return <BasicLayout title={'Post'}>あ</BasicLayout>;
};

export default Post;
