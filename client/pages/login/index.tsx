import React, { useContext } from 'react';
import { GetServerSideProps } from 'next';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { initializeApollo } from '../../lib/apolloClient';
import BasicLayout from '../../components/BasicLayout';
import Form from '../../components/atoms/Form/Form';
import Input from '../../components/atoms/Input/Input';
import Submit from '../../components/atoms/Submit/Submit';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../shared/authHandler';
import { isLoggedInSSR } from '../../shared/isLoggedInSSR';

export interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const { loginMutation } = useContext(AuthContext);

  const { register, handleSubmit } = useForm({
    mode: 'all',
  });

  const onSubmit = handleSubmit(async (data: { email: string; password: string }) => {
    await loginMutation({
      variables: {
        input: data,
      },
    });
  });
  return (
    <BasicLayout title={'Login Page'}>
      <Form onSubmit={onSubmit}>
        <Input type={'email'} name={'email'} ref={register} placeholder={'Email...'} />
        <Input type={'password'} name={'password'} ref={register} placeholder={'Password...'} />
        <Submit />
      </Form>
    </BasicLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apolloClient: ApolloClient<NormalizedCacheObject> = initializeApollo();
  await isLoggedInSSR({ ctx, redirectWhenLoggedIn: true });
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};

export default Login;
