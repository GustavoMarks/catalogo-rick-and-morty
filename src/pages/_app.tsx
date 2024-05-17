import type { AppProps } from 'next/app';
import Head from 'next/head';

import { ThemeProvider } from '@mui/material/styles';
import themeConfig from '@/configs/themeConfig';
import Footer from '@/components/layout/Footer';

export default function App({ Component, pageProps }: AppProps) {
  return (
		<ThemeProvider theme={themeConfig}>
      <Head>
        <title>Rick and Morty Catalog</title>
        <meta name="description" content="Catalog with list of characters from the animated series Rick and Morty" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
		</ThemeProvider>
	)
}
