import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '@/store';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return <Provider store={store} >
    <>
      <Head>
        <title>Rick and Morty Catalog</title>
        <meta name="description" content="Catalog with list of characters from the animated series Rick and Morty" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
      <footer>
        2023 • <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/GustavoMarks/catalogo-rick-and-morty">
          Visit on GitHub
        </a>
      </footer>
    </>
  </Provider>
}
