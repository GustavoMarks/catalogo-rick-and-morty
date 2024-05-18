import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Alegreya_Sans_SC } from 'next/font/google'

import { ThemeProvider } from '@mui/material/styles';
import themeConfig from '@/configs/themeConfig';
import Footer from '@/components/layout/Footer';

import '@/styles/global.css';

const fontFamily = Alegreya_Sans_SC({
  weight: '400',
  subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
		<ThemeProvider theme={themeConfig}>
      <Head>
        <title>Rick and Morty Catalog</title>
        <meta name="description" content="Catalog with list of characters from the animated series Rick and Morty" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main style={{
        margin: 0,
        padding: 0,
        minHeight: '95vh',
      }}>
        <Component {...pageProps} />
      </main>
      <Footer className={fontFamily.className} />
		</ThemeProvider>
	)
}
