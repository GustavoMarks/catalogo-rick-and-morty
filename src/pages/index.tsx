import { update } from '@/features/pageSlice';
import { useApiGet, useAppDispatch } from '@/hooks';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import CharactersTable from '@/components/CharactersTable';
import Paginator from '@/components/Paginator';

export default function Home() {

  const apiGet = useApiGet();
  const storeDispatch = useAppDispatch();
  const router = useRouter();
  const { page } = router.query;

  const requestPage = async (query: string) => {
    await apiGet.request('/character/' + query);
  }

  useEffect(() => {
    let query = '';
    if (page) query = `?page=${page}`;

    requestPage(String(query));
  }, [page]);

  useEffect(() => {
    if (apiGet.loaded && apiGet.data && apiGet.error === '') {
      // Colocando dados de uma página num estado global caso não haja erro
      storeDispatch(update(apiGet.data));
    }
  }, [apiGet.loaded]);

  return (
    <main>
      <header>
        <h1>
          <b>Rick and Morty</b> Catalog
        </h1>
        <p>
          Complete list of characters
        </p>
      </header>
      <CharactersTable />
      <Paginator />
    </main>
  )
}