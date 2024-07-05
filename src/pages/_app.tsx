import type { AppProps } from 'next/app';
import Head from 'next/head';

import { ThemeProvider } from '@mui/material/styles';

import AppBar from '@/components/layout/AppBar';
import Footer from '@/components/layout/Footer';
import MainContainer from '@/components/layout/MainContainer';

import themeConfig from '@/configs/themeConfig';

import '@/styles/global.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={themeConfig}>
      <Head>
        <title>Rick and Morty Catalog</title>
        <meta name='description' content='Find everything about the series' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='apple-touch-icon' sizes='180x180' href='/images/icons/apple-touch-icon.png' />
        <link rel='shortcut icon' href='/images/icons/android-chrome-192x192.png' />
        <meta property='og:image' content='/images/home-background.webp' />
        <meta property='og:image:alt' content='Rick and Morty Catalog' />
        <meta property='og:image:type' content='image/webp' />
        <meta property='og:image:width' content='1920' />
        <meta property='og:image:height' content='1080' />
      </Head>
      <AppBar />
      <MainContainer>
        <Component {...pageProps} />
      </MainContainer>
      <Footer />
    </ThemeProvider>
  );
}
