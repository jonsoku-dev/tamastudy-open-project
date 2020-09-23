import React from 'react';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'styled-components';
import { useApollo } from '../lib/apolloClient';
import { theme } from '../styles/theme';
import { CookiesProvider } from 'react-cookie';
import { AuthProvider } from '../shared/authHandler';
import { GlobalStyle } from '../components/shared.styled';
import { CurrentUserProvider } from '../shared/getCurrentUser';

const App: React.FC<any> = ({ Component, pageProps }: any) => {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.5.0/css/swiper.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;900&display=swap"
          rel="stylesheet"
        />
        <script src="https://kit.fontawesome.com/7d44111f77.js" crossOrigin="anonymous"></script>
        <title>Tamastudy</title>
      </Head>
      <CookiesProvider>
        <ApolloProvider client={apolloClient}>
          <AuthProvider>
            <CurrentUserProvider>
              <ThemeProvider theme={theme}>
                <GlobalStyle />
                <Component {...pageProps} />
              </ThemeProvider>
            </CurrentUserProvider>
          </AuthProvider>
        </ApolloProvider>
      </CookiesProvider>
    </>
  );
};

export default App;
