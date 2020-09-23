import React, { useContext, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { ApolloClient, NormalizedCacheObject, useQuery } from '@apollo/client';
import { initializeApollo } from '../../lib/apolloClient';
import BasicLayout from '../../components/BasicLayout';
import Form from '../../components/atoms/Form/Form';
import Input from '../../components/atoms/Input/Input';
import Submit from '../../components/atoms/Submit/Submit';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { AuthContext } from '../../shared/authHandler';
import { CurrentUserDocument, CurrentUserQuery } from '../../generated/graphql';
import { isLoggedInSSR } from '../../shared/isLoggedInSSR';

export interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  const { data } = useQuery<CurrentUserQuery>(CurrentUserDocument, {
    fetchPolicy: 'cache-first',
  });
  const { loginMutation, registerMutation } = useContext(AuthContext);
  const router = useRouter();
  const { register, handleSubmit } = useForm({
    mode: 'all',
  });

  const onSubmit = handleSubmit(
    async (data: { username: string; email: string; password: string }) => {
      try {
        const registerResult = await registerMutation({
          variables: {
            input: data,
          },
        });
        if (registerResult) {
          await loginMutation({
            variables: {
              input: {
                email: data.email,
                password: data.password,
              },
            },
          });
        }
      } catch (e) {
        alert(e.message);
      }
    },
  );

  useEffect(() => {
    if (data?.currentUser) {
      router.push('/');
    }
  }, [data?.currentUser]);

  if (data?.currentUser) {
    return <div>Redirecting...</div>;
  }

  return (
    <BasicLayout title={'Register Page'}>
      <Form onSubmit={onSubmit}>
        <Input type={'text'} name={'username'} ref={register} placeholder={'Username...'} />
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

export default Register;
