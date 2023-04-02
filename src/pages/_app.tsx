import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { Alegreya_Sans_SC } from 'next/font/google'
import store from '@/store';
import Head from 'next/head';

import '@/styles/globals.css';
import '@/styles/filterControllerStyles.css';

const font = Alegreya_Sans_SC({
  weight: '400',
  subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
  return <Provider store={store} >
    <>
      <Head>
        <title>Rick and Morty Catalog</title>
        <meta name="description" content="Catalog with list of characters from the animated series Rick and Morty" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={font.className}>
        <Component {...pageProps} />
      </main>
      <footer className={font.className}>
        2023 • <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/GustavoMarks/catalogo-rick-and-morty">
          &nbsp;Visit on GitHub
        </a>
      </footer>
    </>
  </Provider>
}
