import CharactersTable from '@/components/CharactersTable';
import { update } from '@/features/pageSlice';
import { useApiGet, useAppDispatch } from '@/hooks';
import { useEffect } from 'react';

export default function Home() {

  const apiGet = useApiGet();
  const storeDispatch = useAppDispatch();

  const requestPage = async () => {
    await apiGet.request('/character/');
  }

  useEffect(() => {
    requestPage();
  }, []);

  useEffect(() => {
    if (apiGet.data && apiGet.error === '') {
      // Colocando dados de uma página num estado global caso não haja erro
      console.log('renderizou')
      storeDispatch(update(apiGet.data));
    }
  }, [apiGet.loaded]);

  return (
    <main>
      <header>
        <h1>
          Catálago <b> Rick and Morty </b>
        </h1>
        <p>
          Lista completa de personagens
        </p>
      </header>

      <CharactersTable />

      <footer>
        2023 • <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/GustavoMarks/catalogo-rick-and-morty">
          Visite no GitHub
        </a>
      </footer>
    </main>
  )
}