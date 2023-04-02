import { update } from '@/features/pageSlice';
import { useApiGet, useAppDispatch, useLocalStorageFavorites } from '@/hooks';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Image from 'next/image';

import CharactersTable from '@/components/CharactersTable';
import Paginator from '@/components/Paginator';
import FilterController from '@/components/FilterController';
import RickAndMortyImg from '../assets/rickAndMorty.png';
import BackgroundImg from '../assets/background.webp';

export default function Home() {

  const apiGet = useApiGet();
  const apiGetFavs = useApiGet();
  const storeDispatch = useAppDispatch();
  const favStorage = useLocalStorageFavorites();
  const router = useRouter();
  const { page, name, species, type, gender, status, fav } = router.query;

  const requestPage = async (query: string) => {
    await apiGet.request('/character/' + query);
  }

  const requestFavs = async () => {
    const favList = favStorage.getItems();
    const query = JSON.stringify(favList);

    await apiGetFavs.request(`/character/${query}`);
  }

  useEffect(() => {
    if (!fav) {
      console.log(fav);
      let query = '?';
      if (page) query += `page=${page}`;
      if (name) query += `&name=${name}`;
      if (species) query += `&species=${species}`;
      if (type) query += `&type=${type}`;
      if (status) query += `&status=${status}`;
      if (gender) query += `&gender=${gender}`;

      requestPage(String(query));

    } else requestFavs();

  }, [page, name, species, type, gender, status, fav]);

  useEffect(() => {
    if (apiGet.error) {
      storeDispatch(update({ results: null, info: null }));
    }
    else if (apiGet.loaded && apiGet.data && !fav) {
      // Colocando dados de uma página num estado global caso não haja erro
      storeDispatch(update(apiGet.data));

    }
  }, [apiGet.loaded]);

  useEffect(() => {
    if (apiGetFavs.error) {
      storeDispatch(update({ results: null, info: null }));
    }
    else if (apiGetFavs.loaded && apiGetFavs.data && fav) {
      storeDispatch(update({ results: apiGetFavs.data, info: null }));
    }

  }, [fav, apiGetFavs.loaded])

  return (
    <main className="MainPage" >
      <header>
        <Image id="main-background" src={BackgroundImg} alt="green portal" />
        <span>
          <h1>
            <b>Rick and Morty </b> Catalog
          </h1>
          <p>
            Complete list of characters
          </p>

          <Image id="decorate-img" src={RickAndMortyImg} alt="Rick And Morty" width={320} />
        </span>
      </header>
      <div id="Container">
        <FilterController />
        <CharactersTable />
        <Paginator />
      </div>
    </main>
  )
}