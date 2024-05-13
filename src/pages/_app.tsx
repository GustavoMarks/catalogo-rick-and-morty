import type { AppProps } from 'next/app';
import Head from 'next/head';

import { ThemeOptions, ThemeProvider } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#92DB25',
    },
    secondary: {
      main: '#B4E6FC',
    },
  },
  typography: {
    fontFamily: 'Alegreya Sans',
  },
};

export default function App({ Component, pageProps }: AppProps) {
  return (
		<ThemeProvider theme={themeOptions}>
      <Head>
        <title>Rick and Morty Catalog</title>
        <meta name="description" content="Catalog with list of characters from the animated series Rick and Morty" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Component {...pageProps} />
      </main>
      <footer>
        2023 • <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/GustavoMarks/catalogo-rick-and-morty">
          &nbsp;Visit on GitHub
        </a>
      </footer>
		</ThemeProvider>
	)
}
