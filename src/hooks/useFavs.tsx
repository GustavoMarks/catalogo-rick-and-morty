import { useContext } from 'react';

import { FavsContext } from '@/context/FavsContext';

const useFavs = () => useContext(FavsContext);

export default useFavs;
